import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '../models/product.model';
import { ProductGetComponent } from '../product-get/product-get.component';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( public http : HttpClient) { }

  selectedproduct : Product;
  products : Product[];
  
  readonly baseURL = 'http://localhost:3000/productitems';

  postProduct(product: Product) {
    return this.http.post(this.baseURL, product);
  }
  

  getEmployeeById(id:string) {
    return this.http.get(this.baseURL + `/${id}`);
    }

  getProductList() {
    return this.http.get(this.baseURL);
  }

  putProduct(id:string,product:Product) {
    return this.http.put(this.baseURL + `/${id}`  , product);
  }

  deleteProduct(id:string) {
    return this.http.delete(this.baseURL + `/${id}`);
  }
}
