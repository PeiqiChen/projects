import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import jsPDF from 'jspdf';
import { LoginService } from 'src/app/SERVICES/AccountService/login.service';
import { ProductServiceService } from 'src/app/SERVICES/AdminService/product-service.service';
import { CartService } from 'src/app/SERVICES/CustomerService/cart.service';
import {OrderService} from "../../../SERVICES/CustomerService/order.service";
import {Product} from "../../../MODELS/Product.model";
import { Location } from '@angular/common';
@Component({
  selector: 'app-order-details-direct',
  templateUrl: './order-details-direct.component.html',
  styleUrls: ['./order-details-direct.component.css']
})
export class OrderDetailsDirectComponent implements OnInit {
  listProduct:any[]=[]; //for getting list
  order:any;
  private readonly canGoBack: boolean;
  constructor(public activatedRoute:ActivatedRoute,
              private orderService: OrderService,
              public loginService: LoginService,
              private cartService:CartService,
              public prodService:ProductServiceService,
              private readonly route: ActivatedRoute,
              private readonly location: Location,public router:Router) {
    this.canGoBack = !!(this.router.getCurrentNavigation()?.previousNavigation);
  }
id:any;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params=>{
      this.id=params.get('id');

      });
      this.getProductById( this.id);
  }
  goBack() {
    if (this.canGoBack) {
      this.location.back();
    } else {
      this.router.navigate(['..'], {relativeTo: this.route});
    }
  }
  getProductById(id:any){
    this.orderService.getOrderById(id).subscribe((res)=>{
      this.order=res.data;
      console.log(this.order)
    })
    this.orderService.getProductsByOrder(id).subscribe((res) => {
      console.log(res.data)
      this.listProduct = res.data
    })
  }

  @ViewChild('content', { static: false }) el!: ElementRef

  title = 'Angular CLI 14 & jsPDF';

  makePdf() {
    let pdf = new jsPDF('p', 'pt', 'a4');

    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save("receipt.pdf")
      }
    })

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
