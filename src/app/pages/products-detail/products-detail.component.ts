import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { DetailService } from './detail.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.scss']
})
export class ProductsDetailComponent implements OnInit {

  slug: string = this.routing.snapshot.params['slug'];
  name: string = "";
  price: number = 0;
  stock: number = 0;
  color: string = "";
  size: number = 0;
  description: string = "";
  rate: number = 0;
  img: string = "";
  galery: any = [];
  data: any = [];

  constructor(
    config: NgbRatingConfig,
    private detailService: DetailService,
    private routing: ActivatedRoute
  ) {
    config.max = 5;
    config.readonly = true;
  }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.detailService.getProducts().subscribe(
      result => {
        this.data = result;
        this.data = (this.slug) ?
          this.data.filter(p => {
            return p.slug === this.slug;
          }) : this.data;
        console.log(this.data);
        this.name = this.data[0].productName;
        this.price = this.data[0].price;
        this.stock = this.data[0].stock;
        this.color = this.data[0].color;
        this.size = this.data[0].size;
        this.description = this.data[0].description;
        this.rate = this.data[0].rate;
        this.img = this.data[0].image;
        this.galery = this.data[0].gallery;
      }
    );
  }

}
