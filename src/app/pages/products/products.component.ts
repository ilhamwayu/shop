import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [NgbRatingConfig]
})
export class ProductsComponent implements OnInit {
  data: any = [];
  p: Number = 1;
  count: Number = 9;
  constructor(
    private serviceProducts: ProductsService,
    config: NgbRatingConfig
  ) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
    this.getProducts();
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
