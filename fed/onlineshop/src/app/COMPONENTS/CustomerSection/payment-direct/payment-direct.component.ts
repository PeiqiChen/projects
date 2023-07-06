import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/MODELS/order.model';
import { LoginService } from 'src/app/SERVICES/AccountService/login.service';
import { ProductServiceService } from 'src/app/SERVICES/AdminService/product-service.service';
import { CartService } from 'src/app/SERVICES/CustomerService/cart.service';
import { OrderService } from 'src/app/SERVICES/CustomerService/order.service';

@Component({
  selector: 'app-payment-direct',
  templateUrl: './payment-direct.component.html',
  styleUrls: ['./payment-direct.component.css']
})
export class PaymentDirectComponent implements OnInit {

  public totalItem: number = 0;
  public amount: any;
  listOrder = this.cartService.getProducts();
  isSelected: boolean = true;
  paymentMode: string = '';

  product:any;
  constructor(public activatedRoute:ActivatedRoute, public prodService:ProductServiceService, private cartService: CartService, public router: Router, public loginService: LoginService, public orderService: OrderService) { }
id:any;
  ngOnInit(): void {
    this.cartService.getProducts()
      .subscribe(res => {
        this.totalItem = res.length;
      })
      this.activatedRoute.paramMap.subscribe(params=>{
        this.id=params.get('id');
  
        });
        this.getProductById( this.id);
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



  placeOrderByCashOnDeliveryDirect() {
    let obj: Order = {} as Order;
    this.listOrder.forEach(data => {
      obj = {
        billAmount: this.product.price, dateOfOrder: new Date(),
        modeOfPayment: "Cash On Delivery", usersId: 16
      }
      return obj;
    })
    
    this.orderService.insertOrder(obj).subscribe(res => {
      console.log(res);
       alert("We hope you have enjoyed. Thank you for Shopping with us !!!");
      //  this.router.navigate(['/place-order-direct/:'])
    })
  
  
    
  
  }
  placeOrderByCardDirect() {
    let obj: Order = {} as Order;
    this.listOrder.forEach(data => {
      obj = {
        billAmount: this.product.price, dateOfOrder: new Date(),
        modeOfPayment: "By Debit Card", usersId: 16
      }
      
      return obj;
    })
    
    this.orderService.insertOrder(obj).subscribe(res => {
      console.log(res);
      alert("We hope you have enjoyed. Thank you for Shopping with us !!!");
      // this.router.navigate(['/place-order-direct'])
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
