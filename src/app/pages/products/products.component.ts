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
  p: Number = 1;
  count: Number = 9;

  category:string = "";
  size:number = 0;

  constructor(
    private serviceProducts: ProductsService,
    config: NgbRatingConfig,
    private routerActive:ActivatedRoute,
    private router:Router
  ) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
    this.getProducts();
  }

  goProducts(party) {
    this.router.navigate([''], { queryParams: { category: party } });

    this.routerActive.queryParams.subscribe(result => {
        this.category = result.category
      }
    );

    let data = {
      category:this.category
    }

    this.serviceProducts.filterProducts(data).subscribe(
      data => {
        this.data = data
        alert("success");
      },
      error => {
        alert("error");
      }
    );
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
