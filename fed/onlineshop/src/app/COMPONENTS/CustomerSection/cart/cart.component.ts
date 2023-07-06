import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/SERVICES/AccountService/login.service';
import { ProductServiceService } from 'src/app/SERVICES/AdminService/product-service.service';
import { CartService } from 'src/app/SERVICES/CustomerService/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

public products:any=[];
public grandTotal!:number;
public totalItem: number = 0;
  constructor(private cartService:CartService ,public router:Router,public loginService:LoginService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products=res;
      this.grandTotal=this.cartService.getTotalPrice();
    });
    this.cartService.getProducts()
      .subscribe(res => {
        this.totalItem = res.length;
      });
  }
  removeItem(product:any){
this.cartService.removeCartItem(product);
  }
  emptycart(){
    this.cartService.removeAllCart();
  }

  checkout(){
    this.cartService.getTotalPrice();
    this.router.navigate(['/checkout']);

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

  check(){
    if(this.loginService.isLoggedin()){
      this.router.navigate(['/checkout'])
    }
    else{
      this.router.navigate(['/login'])
    }
  }
  

}
