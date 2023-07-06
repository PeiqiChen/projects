import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/MODELS/Category.model';
import { Product } from 'src/app/MODELS/Product.model';
import { LoginService } from 'src/app/SERVICES/AccountService/login.service';
import { CategoryServiceService } from 'src/app/SERVICES/AdminService/category-service.service';
import { ProductServiceService } from 'src/app/SERVICES/AdminService/product-service.service';
import { CartService } from 'src/app/SERVICES/CustomerService/cart.service';

@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.component.html',
  styleUrls: ['./products-by-category.component.css']
})
export class ProductsByCategoryComponent implements OnInit {
  public totalItem: number = 0;

  constructor(private activatedRoute: ActivatedRoute,
    private prodService: ProductServiceService, private cartService: CartService, private catService:CategoryServiceService
    , public router:Router,public loginService:LoginService) { }
  searchCategory!: Category;
  public filterCategory: any;
  productList: Product[]=[];
  categoryId: any;
  product:any;
  id:any;
  ngOnInit(): void {
    // this.activatedRoute.queryParams.subscribe(data => {
    //   this.searchCategory = data['id'];
    //  });

    //  this.prodService.getProductsByCategoryId(this.searchCategory).subscribe(categoryData=>{
    //   this.productList=categoryData
    //  })
    this.activatedRoute.paramMap.subscribe(params=>{
      this.id=params.get('id');

      });
      this.getProductsByCategoryId( this.id);
    // this.getAllProducts();

    // this.activatedRoute.paramMap.subscribe(params => {
    //   this.categoryId = params.get('id');
    //   console.log(this.categoryId);

    // });
    // this.getProductsByCategoryId(this.categoryId);
   
    this.cartService.getProducts()
      .subscribe(res => {
        this.totalItem = res.length;
      })

      // this.activatedRoute.paramMap.subscribe(params=>{
      //   this.id=params.get('id');
  
      //   });
      //   this.getProductById( this.id);
      //   this.cartService.getProducts()
      //   .subscribe(res => {
      //     this.totalItem = res.length;
      //   })
  
  }

  getProductById(id:any){
    this.prodService.getProductById(id).subscribe((res)=>{
      this.product=res;
    })
  }

  getProductsByCategoryId(id: any) {
    this.prodService.getProducts().subscribe((res) => {
      this.productList = res;
    })
  }

  getAllProducts() {
    this.prodService.getProducts()
      .subscribe(
        res => {
          this.productList = res;
          this.filterCategory = res;
          console.log(res);


        })
  }

//   filter(categoryName: any) {
//     this.filterCategory = this.productList.search((a: any) => {
//       if (a.categoryId == categoryName || categoryName == '') {
//         return a;
//       }
//     })

// }
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
  
  addToCart(productList: any) {
    this.cartService.addToCart(productList);
  }
  

}
