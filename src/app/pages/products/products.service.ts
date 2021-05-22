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
    // return this.http.get<any>("http://angushop.anurdin.net/assets/json/product.json");
    return this.http.get<any>("assets/products.js");
  }

}
