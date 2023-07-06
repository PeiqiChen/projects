import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './COMPONENTS/CustomerSection/login/login.component';
import { RegisterComponent } from './COMPONENTS/CustomerSection/register/register.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from './COMPONENTS/AdminSection/category/category.component';
import { ProductComponent } from './COMPONENTS/AdminSection/product/product.component';
import { WelcomeComponent } from './COMPONENTS/CustomerSection/welcome/welcome.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegisterUser } from './MODELS/RegisterUser';
import { RegisterUserService } from './SERVICES/AccountService/register-user.service';
import { FormBuilder } from '@angular/forms';
import { CategoryServiceService } from './SERVICES/AdminService/category-service.service';
import { HttpInterceptorService } from './SERVICES/AccountService/http-interceptor.service';
import { PageNotFoundComponent } from './SHARED/Component/page-not-found/page-not-found.component';
import { HomePageComponent } from './COMPONENTS/CustomerSection/home-page/home-page.component';
import { CartComponent } from './COMPONENTS/CustomerSection/cart/cart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { SearchPipe } from './SHARED/search.pipe';
import { ProductsDisplayComponent } from './COMPONENTS/CustomerSection/products-display/products-display.component';
import { ViewProductInfoComponent } from './COMPONENTS/CustomerSection/view-product-info/view-product-info.component';
import { ProductsByCategoryComponent } from './COMPONENTS/CustomerSection/products-by-category/products-by-category.component';
import { CheckoutComponent } from './COMPONENTS/CustomerSection/checkout/checkout.component';
import { PaymentComponent } from './COMPONENTS/CustomerSection/payment/payment.component';
import { PlaceOrderComponent } from './COMPONENTS/CustomerSection/place-order/place-order.component';

import { ContactUsComponent } from './COMPONENTS/CustomerSection/contact-us/contact-us.component';
import { OrderDetailsComponent } from './COMPONENTS/CustomerSection/order-details/order-details.component';
import { AboutUsComponent } from './COMPONENTS/CustomerSection/about-us/about-us.component';
import { BuyNowComponent } from './COMPONENTS/CustomerSection/buy-now/buy-now.component';
import { PaymentDirectComponent } from './COMPONENTS/CustomerSection/payment-direct/payment-direct.component';
import { PlaceOrderDirectComponent } from './COMPONENTS/CustomerSection/place-order-direct/place-order-direct.component';
import { OrderDetailsDirectComponent } from './COMPONENTS/CustomerSection/order-details-direct/order-details-direct.component';
import { OrdersDisplayComponent} from './COMPONENTS/CustomerSection/orders-display/orders-display.component'
import {
  ProductsDisplayAdminComponent
} from "./COMPONENTS/AdminSection/admin-product-display/products-display.component";
import {
  AdminOrdersDisplayComponent
} from "./COMPONENTS/AdminSection/admin-order-display/admin-orders-display.component";
// import { ToastrModule, ToastrService } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CategoryComponent,
    ProductComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    HomePageComponent,
    CartComponent,
    SearchPipe,
    ProductsDisplayComponent,
    ViewProductInfoComponent,
    ProductsByCategoryComponent,
    CheckoutComponent,
    PaymentComponent,
    PlaceOrderComponent,
    ContactUsComponent,
    OrderDetailsComponent,
    AboutUsComponent,
    BuyNowComponent,
    PaymentDirectComponent,
    PlaceOrderDirectComponent,
    OrderDetailsDirectComponent,
    OrdersDisplayComponent,
    ProductsDisplayAdminComponent,
    AdminOrdersDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatButtonModule




  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
  },
    RegisterUserService, CategoryServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
