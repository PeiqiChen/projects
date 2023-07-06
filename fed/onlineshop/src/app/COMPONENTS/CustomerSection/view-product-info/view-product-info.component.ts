import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/MODELS/Category.model';
import { Product } from 'src/app/MODELS/Product.model';
import { LoginService } from 'src/app/SERVICES/AccountService/login.service';
import { RegisterUserService } from 'src/app/SERVICES/AccountService/register-user.service';
import { ProductServiceService } from 'src/app/SERVICES/AdminService/product-service.service';
import { CartService } from 'src/app/SERVICES/CustomerService/cart.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-product-info',
  templateUrl: './view-product-info.component.html',
  styleUrls: ['./view-product-info.component.css']
})
export class ViewProductInfoComponent implements OnInit {
  products: Product[] = [];


  product:any;

  public totalItem: number = 0;
  private readonly canGoBack: boolean;
  constructor(private activatedRoute:ActivatedRoute,
              private prodService:ProductServiceService,
              private cartService:CartService,
              private readonly route: ActivatedRoute,
              private readonly location: Location,
    public loginService:LoginService, public router:Router,public registerService:RegisterUserService) {
    this.canGoBack = !!(this.router.getCurrentNavigation()?.previousNavigation);

  }
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


  }
  goBack() {
    if (this.canGoBack) {
      this.location.back();
    } else {
      this.router.navigate(['..'], {relativeTo: this.route});
    }
  }
  addToWatchList(product: any) {
    this.prodService.addToWatchList(product).subscribe();
    console.log(product);
  }
  getProductById(id:any){
    this.prodService.getProductById(id).subscribe((res)=>{
      console.log(res.data);
      this.product=res.data;
    })
  }

  addToCart(product:any){
    this.cartService.addToCart(product);
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
