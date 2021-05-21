import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http:HttpClient
  ) { }

  getProducts() {
    return this.http.get<any>("http://angushop.anurdin.net/assets/json/product.json");
  }

  filterProducts(data) {
    let params1 = new HttpParams().set('category', data.category);
    return this.http.get<any>("http://angushop.anurdin.net/assets/json/product.json/", {params:params1});
  }
}
