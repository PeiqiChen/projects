import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/MODELS/order.model';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }
  orderbaseUrl:string='http://localhost:8080/orders/all';
  orderDetailbaseUrl:string='http://localhost:8080/orders/';

  getOrders():Observable<any>{
    return this.http.get<any>(this.orderbaseUrl);
  }

  getOrderById(id:any):Observable<any>{
    return this.http.get<any>(this.orderDetailbaseUrl+id);
  }

  getProductsByOrder(id:any):Observable<any>{
    const  baseUrl="http://localhost:8080/orderItems/" +id;
    return this.http.get<any>(baseUrl);
  }


  insertOrder(id:any):Observable<any>{
    const baseUrl = "http://localhost:8080/orders"
    let data = {
      "productId": id,
      "quantity": 1
    }
    return this.http.post<Order>(baseUrl,data);
  }

  patchOrderStatus(id:any, status: any) {
    const url = "http://localhost:8080/orders/"
    return this.http.patch<any>(url+id+'/'+status,{});
  }



}
