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

  filterSizeValue: any = [];
  filterSearchValue: string = "";
  filterCategoryValue: string = "";

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

  filtersearch(event) {
    this.filterSearchValue = event.target.value;
    this.setQueryParams();
  }

  filterCategory(value) {
    this.filterCategoryValue = value;
    this.setQueryParams();
  }

  filterSize(value) {
    var check = this.filterSizeValue.includes(value);
    if (!check) {
      this.filterSizeValue.push(value);
    } else {
      var removeResult = this.filterSizeValue.filter(function (e) { return e !== value });
      this.filterSizeValue = removeResult;
    }
    this.setQueryParams();
  }

  setQueryParams() {
    var params = {}

    if (this.filterSearchValue) {
      params['search'] = this.filterSearchValue;
    }

    if (this.filterCategoryValue) {
      params['category'] = this.filterCategoryValue;
    }

    if (this.filterSizeValue.length > 0) {
      var sizeParams = this.filterSizeValue.join("-");
      params['size'] = sizeParams;
    }

    console.log(params)
    this.router.navigate([''], { queryParams: params });
    this.filterData();
  }

  filterData() {
    this.data = this.allData.filter(p => {
      var search = this.filterSearchValue ? p.productName.includes(this.filterSearchValue) : p.productName;
      var size = this.filterSizeValue.length > 0 ? this.filterSizeValue.indexOf(p.size) >= 0 : p.size;
      var category = this.filterCategoryValue ? p.category == this.filterCategoryValue : p.category;
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
