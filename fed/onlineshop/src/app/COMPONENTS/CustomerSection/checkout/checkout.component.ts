import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Checkout } from 'src/app/MODELS/checkout.model';
import { User } from 'src/app/MODELS/checkoutUser.model';
import { RegisterUser } from 'src/app/MODELS/RegisterUser';
import { LoginService } from 'src/app/SERVICES/AccountService/login.service';
import { CartService } from 'src/app/SERVICES/CustomerService/cart.service';
import { OrderService } from 'src/app/SERVICES/CustomerService/order.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  userDetails: User = {
    id: 0,
    name: '',
    phoneNo: 0,
    address: ''
  };
  public totalItem: number = 0;
  public amount:any;
  public products: any=[]

  checkout:Checkout=new Checkout();

  constructor(private cartService: CartService, public orderService: OrderService, public loginService:LoginService,public router:Router) { }

  ngOnInit(): void {

    this.cartService.getProducts()
      .subscribe(res => {
        this.totalItem = res.length;
        this.products = res
      })
    this.amount=  this.cartService.getTotalPrice();
    // this.amount=this.checkoutService.getPrice();




}
checkoutForm = new FormGroup({
  fullname: new FormControl("", [Validators.required,
  Validators.minLength(3),
  Validators.maxLength(25),
  Validators.pattern("[a-zA-Z ]*")
  ]),
  phoneNo: new FormControl("", [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(10),
    Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")
  ]),
  address: new FormControl("", [
    Validators.required
  ]),

});
get fullname():FormControl{
  return this.checkoutForm.get("fullname") as FormControl;
 }
 get phoneNo():FormControl{
  return this.checkoutForm.get("phoneNo") as FormControl;
 }
 get address():FormControl{
  return this.checkoutForm.get("address") as FormControl;
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
checkAmount(){
  if(this.amount == 0){
    alert("Payment unsuccessful , Please Order something.");

  }
  else{
    for (const product in this.products) {
      this.orderService.insertOrder(product).subscribe()
      console.log("purchase for "+product);
    }
  }
}

}
