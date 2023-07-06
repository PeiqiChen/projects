import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/MODELS/Category.model';
import { Product } from 'src/app/MODELS/Product.model';
import { LoginService } from 'src/app/SERVICES/AccountService/login.service';
import { CategoryServiceService } from 'src/app/SERVICES/AdminService/category-service.service';
import { CartService } from 'src/app/SERVICES/CustomerService/cart.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  categories: Category[] = [];
  category: Category= {
    id:0,
    categoryName:'',
    categoryImage:''
  }
  categoryList:Category[]=[];
  public totalItem: number = 0;
  productList:Product={
    id:0,
    name:'',
    description:'',
    wholesalePrice:0,
    retailPrice:0,
    quantity:0
  };
  constructor(public catservice:CategoryServiceService,private cartService:CartService,public router:Router,public loginService:LoginService) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.cartService.getProducts()
      .subscribe(res => {
        this.totalItem = res.length;
      })
  }

  getAllCategories(){
    this.catservice.getCategories()
    .subscribe(
      res=>{
       this.categoryList=res;

      console.log(res);


    })
  }
  getCategoryByname(){
    this.catservice.getCategoryByName().subscribe(
      res=>
      {
        this.category;
        console.log(this.category);

      })
  }

  searchCategory='';



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
