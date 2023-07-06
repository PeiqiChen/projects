import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Product } from 'src/app/MODELS/Product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList:any=[];
  public productList=new BehaviorSubject([]);
  constructor(private http:HttpClient) { }


  //GETTER
  getProducts(){
    return this.productList.asObservable();
  }

//SETTER
  setProduct(product:any){
    this.cartItemList.push(...product);      //PUSHING PRODUCT TO CART
    this.productList.next(product);          //DATA WILL PASS WHERE IT WAS SUBSCRIBED

  }

  addToCart(product:any){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList);
  }


  getTotalPrice():number{
    let grandTotal=0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.wholesalePrice;
    })
    return grandTotal;
  }


  removeCartItem(product:any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id==a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);

  }

  removeAllCart(){
    this.cartItemList=[]
    this.productList.next(this.cartItemList);
  }
}
