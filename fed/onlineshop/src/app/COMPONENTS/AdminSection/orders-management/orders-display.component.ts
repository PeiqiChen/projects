import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Product } from 'src/app/MODELS/Product.model';
import { LoginService } from 'src/app/SERVICES/AccountService/login.service';
import { ProductServiceService } from 'src/app/SERVICES/AdminService/product-service.service';
import { CartService } from 'src/app/SERVICES/CustomerService/cart.service';
import {Order} from "../../../MODELS/order.model";
import {OrderService} from "../../../SERVICES/CustomerService/order.service";


@Component({
  selector: 'app-orders-display',
  templateUrl: './orders-display.component.html',
  styleUrls: ['./orders-display.component.css']
})
export class OrdersDisplayComponent implements OnInit {

  orderList: Order[] = [];
  orders: Order[] = [];
  selectedOrder: Order[] = [];

  public totalItem: number = 0;
  constructor(public orderService: OrderService, private activatedRoute: ActivatedRoute, private cartService: CartService,
    public router:Router,public loginService:LoginService) { }

  ngOnInit(): void {
    this.getAllProducts();

    this.orderList.forEach((a: any) => {
      console.log(a)
      Object.assign(a,{ quantity:1, price: a.price });
    });
    this.cartService.getProducts()
      .subscribe(res => {
        this.totalItem = res.length;
      })

  }



  getAllProducts() {
    this.orderService.getOrders()
      .subscribe(
        res => {
          this.orderList = res.data;
          console.log(res.data);
        })
  }



  searchProducts = '';

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
  check(){
    if(this.loginService.isLoggedin()){
      this.router.navigate(['/buy-now'])
    }
    else{
      this.router.navigate(['/login'])
    }
  }


  logout(){
    if(this.loginService.isLoggedin()){
      this.loginService.removeToken();
      console.log("Log out initiated");
       this.cartService.removeAllCart();
      alert('Are you sure you want to log out ?');
      this.router.navigate(['']);
    }
    else{
      alert("You are not logged in . PLease Login First")
      this.router.navigate(['/login'])
    }
  }
}


