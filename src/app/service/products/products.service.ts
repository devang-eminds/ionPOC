import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductGetOptionsSchema, ProductSchema } from 'src/app/types/product.types';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public apiUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) { }

  objectToQueryString(obj: ProductGetOptionsSchema): string {
    return (Object.keys(obj) as Array<keyof ProductGetOptionsSchema>)
    .map(key => {
      const value = obj[key];
      if (value !== undefined) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(value);
      } else {
        return ''; 
      }
    })
    .filter(Boolean)
    .join('&');
  }

  getProducts(options:ProductGetOptionsSchema): Observable<ProductSchema[]> {
    return this.http.get<ProductSchema[]>(this.apiUrl+ '?' + this.objectToQueryString(options));
  }
}
