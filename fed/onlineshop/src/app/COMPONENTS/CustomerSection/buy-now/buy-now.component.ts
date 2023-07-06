import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Checkout } from 'src/app/MODELS/checkout.model';
import { Product } from 'src/app/MODELS/Product.model';
import { LoginService } from 'src/app/SERVICES/AccountService/login.service';
import { ProductServiceService } from 'src/app/SERVICES/AdminService/product-service.service';
import { CartService } from 'src/app/SERVICES/CustomerService/cart.service';

@Component({
  selector: 'app-buy-now',
  templateUrl: './buy-now.component.html',
  styleUrls: ['./buy-now.component.css']
})
export class BuyNowComponent implements OnInit {
  products: Product[] = [];
  
 
  product:any;
  public totalItem: number = 0;
  public amount:any;
  
  checkout:Checkout=new Checkout();
  constructor(private activatedRoute:ActivatedRoute,private cartService: CartService,public loginService:LoginService,public router:Router, public prodService:ProductServiceService) { }
  id:any;
  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params=>{
      this.id=params.get('id');

      });
      this.getProductById( this.id);
    this.cartService.getProducts()
    .subscribe(res => {
      this.totalItem = res.length;
      
    })
    // this.amount=  this.cartService.getTotalPrice();
  }
  getProductById(id:any){
    this.prodService.getProductById(id).subscribe((res)=>{
      this.product=res;
    })
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
      this.router.navigate(['/payment']);
    }
  }
  check(){
    if(this.loginService.isLoggedin()){
      // this.router.navigate(['/payment-direct'])
    }
    else{
      this.router.navigate(['/login'])
    }
  }
  

}
