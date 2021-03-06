import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DetailService {

  constructor(
    private http:HttpClient
  ) { }

  getProducts() {
    // return this.http.get<any>("http://angushop.anurdin.net/assets/json/product.json");
    return this.http.get<any>("assets/products.js");

  }
}
