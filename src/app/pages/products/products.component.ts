import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { query } from '@angular/animations';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [NgbRatingConfig]
})
export class ProductsComponent implements OnInit {
  data: any = [];
  allData: any = [];
  p: number = 1;
  count: number = 9;
  size: number = 0;
  category: string = "";
  search: string = "";

  sizeFilterValue: any = [];
  searchFilterValue: string = "";
  categoryFitlerValue: string = "";

  constructor(
    private serviceProducts: ProductsService,
    config: NgbRatingConfig,
    private router: Router,
    private routing: ActivatedRoute
  ) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
    this.getProducts();
  }

  sizeFilter(value) {
    var check = this.sizeFilterValue.includes(value);
    if (!check) {
      this.sizeFilterValue.push(value);
    } else {
      var removeResult = this.sizeFilterValue.filter(function (e) { return e !== value });
      this.sizeFilterValue = removeResult;
    }
    this.setQueryParams();
  }

  searchFilter(event) {
    this.searchFilterValue = event.target.value;
    this.setQueryParams();
  }

  categoryFilter(value) {
    this.categoryFitlerValue = value;
    this.setQueryParams();
  }

  setQueryParams() {
    var params = {}

    if (this.searchFilterValue) {
      params['search'] = this.searchFilterValue;
    }

    if (this.categoryFitlerValue) {
      params['category'] = this.categoryFitlerValue;
    }

    if (this.sizeFilterValue.length > 0) {
      var sizeParams = this.sizeFilterValue.join("-");
      params['size'] = sizeParams;
    }

    console.log(params)
    this.router.navigate([''], { queryParams: params });
    this.filterData();
  }

  filterData() {
    this.data = this.allData.filter(p => {
      var search = this.searchFilterValue ? p.productName.includes(this.searchFilterValue) : p.productName;
      var size = this.sizeFilterValue.length > 0 ? this.sizeFilterValue.indexOf(p.size) >= 0 : p.size;
      var category = this.categoryFitlerValue ? p.category == this.categoryFitlerValue : p.category;
      return search && size && category;
    })
  }

  detail(slug) {
    this.router.navigate(['productsDetail/', slug]);
  }

  getProducts() {
    this.serviceProducts.getProducts().subscribe(
      result => {
        this.data = result;
        this.allData = result;
      },
      error => {
        alert("load data failed");
      }
    );
  }

}
