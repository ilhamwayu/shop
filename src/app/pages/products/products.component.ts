import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [NgbRatingConfig]
})
export class ProductsComponent implements OnInit {
  data: any = [];
  p: number = 1;
  count: number = 9;
  category: string = "";
  size: number = 0;
  search: string = "";

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
    this.filterProducts();
  }

  searchProducts(event, size) {
    this.router.navigate([''], { queryParams: { category: event, search: this.search, size: size } });

    this.routing.queryParams.subscribe(
        result => {
          this.category = result.category;
          this.size = result.size;
        }
      );

      this.filterProducts();
  }

  filterProducts() {

    // this.routing.queryParams.subscribe(
    //   result => {
    //     this.category = result.category;
    //   }
    // );

    this.serviceProducts.getProducts().subscribe(
      result => {
        this.data = result;
        this.data = (this.category) ? this.data.filter(p => { return p.category === this.category;}) : this.data;
        this.data = (this.search) ? this.data.filter(p => { return p.productName.includes(this.search);}) : this.data;
        this.data = (this.size) ? this.data.filter(p => { return p.size == this.size;}) : this.data;
        console.log(this.data);
      }
    );
  }

  detail(slug) {
    this.router.navigate(['productsDetail/', slug]);
  }

  getProducts() {
    this.serviceProducts.getProducts().subscribe(
      result => {
        this.data = result;
      },
      error => {
        alert("load data failed");
      }
    );
  }

}
