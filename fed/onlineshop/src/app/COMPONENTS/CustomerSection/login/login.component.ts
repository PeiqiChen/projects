import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Login } from 'src/app/MODELS/Login.model';
import { LoginService } from 'src/app/SERVICES/AccountService/login.service';
import { FormControl, Validators } from '@angular/forms';
import { observable } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { RegisterUserService } from 'src/app/SERVICES/AccountService/register-user.service';
import { RegisterUser } from 'src/app/MODELS/RegisterUser';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  registerUser: RegisterUser = new RegisterUser();
  login: Login = new Login();

  // role = '';

  hide = true;
  responsedata: any;

  errormessage = '';

  constructor(public loginService: LoginService, public router: Router, public registerService: RegisterUserService) { }


  ngOnInit(): void {
  }


  loginForm = new FormGroup({
    username: new FormControl("", [Validators.required,
    Validators.minLength(3),
    Validators.maxLength(25),
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
    ]),
    role: new FormControl("", [
      Validators.required
    ]),

  });
  // isUserValid: boolean = false;
  loginSubmit() {

    // console.log(Login);

    // localStorage.setItem('user',this.loginForm.value.username);
    if (this.loginForm.valid) {
      this.loginService.loginUser(this.loginForm.value)
        .subscribe
        (
          {
            next: (res) => {
              if (res != null) {
                this.responsedata = res;
                this.responsedata.Status
                console.log(res.message)

                if(res.message.includes( "does not exist.") || res.message.includes( "Invalid password")) {
                  alert("Incorrect Credentials, Please enter valid details or Register to the site if you haven't already !");
                  return
                }

                let t = `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMSIsInBlcm1pc3Npb25zIjpbeyJhdXRob3JpdHkiOiJ1c2VyX3dyaXRlIn0seyJhdXRob3JpdHkiOiJ1c2VyX3VwZGF0ZSJ9LHsiYXV0aG9yaXR5IjoidXNlcl9yZWFkIn0seyJhdXRob3JpdHkiOiJ1c2VyX2RlbGV0ZSJ9XSwiaWQiOjF9.x-F6allDYUMWXDrVZ-PlCVHPZkI4lfOpBsjU08jWMmo`;


                localStorage.setItem('tk', t);

                //localStorage.setItem('id', JSON.stringify(this.loginForm.id));
                localStorage.setItem('role', JSON.stringify(this.loginForm.value.role));
                localStorage.setItem('username', JSON.stringify(this.loginForm.value.username));


                if (this.loginForm.value.role == 'Admin') {
                  this.router.navigate(['/category'])
                  alert("Admin Log in succesful  !!!!")
                }
                else if (this.loginForm.value.role == 'Customer') {
                  this.router.navigate(['home-page'])
                  alert("Customer Log in successful . Happy Shopping!!!!")
                }
                else {
                  this.router.navigate(['register'])
                }
              }
              // alert("Logged in Successfully !!!")
            },
            error: () => {
              alert("Incorrect Credentials, Please enter valid details or Register to the site if you haven't already !");
            }
          }
        )
    }
  }
//
 get Username():FormControl{
  return this.loginForm.get("username") as FormControl;
 }
 get Password():FormControl{
  return this.loginForm.get("password") as FormControl;
 }
 get Role():FormControl{
  return this.loginForm.get("role") as FormControl;
 }


}







