import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Category } from 'src/app/MODELS/Category.model';
import { Product } from 'src/app/MODELS/Product.model';
import { LoginService } from 'src/app/SERVICES/AccountService/login.service';
import { ProductServiceService } from 'src/app/SERVICES/AdminService/product-service.service';
import { CartService } from 'src/app/SERVICES/CustomerService/cart.service';


@Component({
  selector: 'app-products-display',
  templateUrl: './products-display.component.html',
  styleUrls: ['./products-display.component.css']
})
export class ProductsDisplayAdminComponent implements OnInit {

  productList: Product[] = [];
  products: Product[] = [];
  selectedProduct: Product[] = [];

  public totalItem: number = 0;
  constructor(public prodService: ProductServiceService, private activatedRoute: ActivatedRoute, private cartService: CartService,
    public router:Router,public loginService:LoginService) { }

  ngOnInit(): void {
    this.getAllProducts();

    this.productList.forEach((a: any) => {
      console.log(a)
      Object.assign(a,{ quantity:1, price: a.price });
    });
    this.cartService.getProducts()
      .subscribe(res => {
        this.totalItem = res.length;
      })

  }

  addToWatchList(product: any) {
    this.prodService.addToWatchList(product).subscribe();
    console.log(product);
  }
  getAllProducts() {
    this.prodService.getProducts()
      .subscribe(
        res => {
          this.productList = res.data;
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


