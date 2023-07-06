import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Category } from 'src/app/MODELS/Category.model';
import { Product } from 'src/app/MODELS/Product.model';
import { LoginService } from 'src/app/SERVICES/AccountService/login.service';
import { CategoryServiceService } from 'src/app/SERVICES/AdminService/category-service.service';
import { CartService } from 'src/app/SERVICES/CustomerService/cart.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  title = 'categories';
  categories: Category[] = [];
  category: Category= {
    id:0,
    categoryName:'',
    categoryImage:''
  }
  public profits: any = [];
  public popular: any = [];
  public allSold: any = []

  constructor(public catservice:CategoryServiceService, public loginService:LoginService, public router:Router, public cartService:CartService) { }



  ngOnInit(): void {


    this.getAllCategories();
  }

  // addClick(){
  //   this.category={
  //     Id:0,
  //     CategoryName:""
  //   }
  //   this.ModalTitle="Add Category";
  //   this.ActivateAddEditCategoryComp=true;

  // }

  // closeClick(){
  //   this.ActivateAddEditCategoryComp=false;
  //   this.getCategories();
  // }

  categoryForm= new FormGroup({

    categoryName:new FormControl("",[Validators.required

     ])
  })

  getAllCategories(){

    this.catservice.getMostProfit(3).subscribe((res) => {
      this.profits = res.data;
      // console.log(this.profits)
    })

    this.catservice.getMostPopular(3).subscribe((res) => {
      this.popular = res.data;
      // console.log(this.popular)

    })

    this.catservice.getMostPopular(0).subscribe((res) => {
      this.allSold = res.data;
      // console.log(this.popular)

    })
  }

  onSubmit(){
    if(this.category.id == 0){
      this.catservice.insertCategory(this.category)
    .subscribe(
      res =>{

        this.getAllCategories();
        // console.log(res);
        this.category={
          id:0,
          categoryName:'',
          categoryImage:''
        };
      }
    );

    }
    else{
     this. updateCategory(this.category);

    }
  }




// console.log(this.category);

  deleteCategory(id:number){
this.catservice.deleteCategory(id)
.subscribe(
  res =>{
    alert("Category Deleted !")
    this.getAllCategories();
  }
)
  }

  populateForm(category:Category){
    this.category=category;
  }

  updateCategory(category:Category)
  {
    this.catservice.updateCategory(category)
    .subscribe(
      res =>{
        alert("Category has been updated successfully")
       this.getAllCategories();
      }

    );

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
