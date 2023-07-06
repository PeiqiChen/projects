import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/SERVICES/AccountService/login.service';
import { ProductServiceService } from 'src/app/SERVICES/AdminService/product-service.service';
import { CartService } from 'src/app/SERVICES/CustomerService/cart.service';

@Component({
  selector: 'app-place-order-direct',
  templateUrl: './place-order-direct.component.html',
  styleUrls: ['./place-order-direct.component.css']
})
export class PlaceOrderDirectComponent implements OnInit {
  product:any;
  public totalItem: number = 0;
  constructor(public activatedRoute:ActivatedRoute,   public prodService:ProductServiceService, private cartService:CartService ,public loginService:LoginService, public router:Router) { }
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
