import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/MODELS/Product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  httpClient: any;

  constructor(private http:HttpClient) { }
  productbaseUrl:string='http://localhost:8080/products/all';
   listProduct:Product[]=[]; //for getting list

   productData:Product=new Product(); //for posting data

   insertProduct(product:Product):Observable<Product>{
     const url = 'http://localhost:8080/products/';
     let data = {
       "name": product.name,
       "description": product.description,
       "wholesalePrice":product.wholesalePrice,
       "retailPrice":product.retailPrice,
       "quantity":product.quantity
     }
     return this.http.post<Product>(url,data);
  }

  updateProduct(product:Product):Observable<Product>{
    const url = 'http://localhost:8080/products/' +product.id;

    let data = {
      "name": product.name,
      "description": product.description,
      "wholesalePrice":product.wholesalePrice,
      "retailPrice":product.retailPrice,
      "quantity":product.quantity
    }
    console.log(data)
    return this.http.patch<Product>(url,data);
  }


  getProducts():Observable<any>{
  return this.http.get<any>(this.productbaseUrl);
  }


  deleteProduct(id:number):Observable<Product>{
    const url = 'http://localhost:8080/products';
    return this.http.delete<Product>(url +'/' +id);

  }

  getProductById(id:any):Observable<any>{
    const  baseUrl="http://localhost:8080/products/" +id;
    return this.http.get<any>(baseUrl);
  }


  addToWatchList(product:any) {
    const  baseUrl="http://localhost:8080/watchlist/product/" +product.id;
    return this.http.post<any>(baseUrl,{});
  }




  getProductsByCategoryId(categoryId: any):Observable<Product[]>{

   const  baseUrl="https://localhost:7143/api/Product?categoryId=" +categoryId;
   console.log(categoryId);
    return this.http.get<Product[]>(baseUrl);
  }
  productDetails(){
    return this.http.get(this.productbaseUrl);
  }
}
