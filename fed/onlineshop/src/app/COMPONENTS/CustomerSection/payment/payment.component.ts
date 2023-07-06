import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/MODELS/order.model';
import { Product } from 'src/app/MODELS/Product.model';
import { LoginService } from 'src/app/SERVICES/AccountService/login.service';
import { ProductServiceService } from 'src/app/SERVICES/AdminService/product-service.service';
import { CartService } from 'src/app/SERVICES/CustomerService/cart.service';
import { OrderService } from 'src/app/SERVICES/CustomerService/order.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  public totalItem: number = 0;
  public amount: any;
  listOrder = this.cartService.getProducts();
  isSelected: boolean = true;
  paymentMode: string = '';

  product:any;
  constructor(public activatedRoute:ActivatedRoute, public prodService:ProductServiceService, private cartService: CartService, public router: Router, public loginService: LoginService, public orderService: OrderService) { }
id:any
  ngOnInit(): void {
    this.cartService.getProducts()
      .subscribe(res => {
        this.totalItem = res.length;
      })
      this.activatedRoute.paramMap.subscribe(params=>{
        this.id=params.get('id');
  
        });
        this.getProductById( this.id);

    this.amount = this.cartService.getTotalPrice();

  }
  getProductById(id:any){
    this.prodService.getProductById(id).subscribe((res)=>{
      this.product=res;
    })
  }

  paymentForm = new FormGroup({
    ownerName: new FormControl("", [Validators.required,

    ]),
    cardNumber: new FormControl("", [
      Validators.required,
      Validators.minLength(16),
      Validators.maxLength(16),
      Validators.pattern("^4[0-9]{0,}$")

    ]),
    expiryDate: new FormControl("", [
      Validators.required
    ]),
    cvv: new FormControl("", [
      Validators.minLength(3),
      Validators.maxLength(3),
      Validators.required,
      Validators.pattern('^[0-9]{3,4}$')
    ]),

  });

  // onPayOnDelivery() {
  //   this.isSelected = true;
  //   alert("Are you sure you want to place your order?")
  //   this.router.navigate(['/place-order'])

  // }
  // onCard() {
  //   this.isSelected = false;
  //   alert("Are you sure you want to place your order?")
  //   this.router.navigate(['/place-order'])

  // }

  get ownerName(): FormControl {
    return this.paymentForm.get("ownerName") as FormControl;
  }
  get cardNumber(): FormControl {
    return this.paymentForm.get("cardNumber") as FormControl;
  }
  get expiryDate(): FormControl {
    return this.paymentForm.get("expiryDate") as FormControl;
  }
  get cvv(): FormControl {
    return this.paymentForm.get("cvv") as FormControl;
  }


  

  placeOrderByCashOnDelivery() {
    let obj: Order = {} as Order;
    this.listOrder.forEach(data => {
      obj = {
        billAmount: this.cartService.getTotalPrice(), dateOfOrder: new Date(),
        modeOfPayment: "Cash On Delivery", usersId: 16
      }
      return obj;
    })
    if(this.cartService.getTotalPrice() == 0){
      alert("Cannot make a payment of Rs 0.");
    }
    else{
    this.orderService.insertOrder(obj).subscribe(res => {
      console.log(res);
      alert("Are You sure you want to place your order?");
      this.router.navigate(['/place-order'])
    })
  }

    

  }

  placeOrderByCard() {
    let obj: Order = {} as Order;
    this.listOrder.forEach(data => {
      obj = {
        billAmount: this.cartService.getTotalPrice(), dateOfOrder: new Date(),
        modeOfPayment: "By Debit Card", usersId: 16
      }
      
      return obj;
    })
    if(this.cartService.getTotalPrice() == 0){
      alert("Cannot make a payment. Please enter card details and please order something.");
    }
    else {
    this.orderService.insertOrder(obj).subscribe(res => {
      console.log(res);
      alert("Are you sure you want to place your order?");
      this.router.navigate(['/place-order'])
    })

    

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
