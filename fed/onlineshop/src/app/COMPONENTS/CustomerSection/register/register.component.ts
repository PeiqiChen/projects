import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl,  NgForm, NG_ASYNC_VALIDATORS, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { RegisterUser } from 'src/app/MODELS/RegisterUser';
import { RegisterUserService } from 'src/app/SERVICES/AccountService/register-user.service';
import { ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';



import { AsyncValidator } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { FilterPipe } from 'src/app/SHARED/Pipe/filter.pipe';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[{provide:NG_ASYNC_VALIDATORS, useExisting:RegisterComponent,multi:true}]
})
export class RegisterComponent implements OnInit {



  constructor(public service:RegisterUserService,private router:Router ) { }

  ngOnInit():void {

  }
  userList:any=[];
  registerform=new FormGroup({

      name:new FormControl("",[Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),

      ]),

       username:new FormControl("",[Validators.required,
       Validators.minLength(3),
       Validators.maxLength(15),

      ]),

      phoneNo:new FormControl("",[Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
       Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")
    ]),
    password:new FormControl("",[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(15),
    ]),
    // ConfirmPass:new FormControl("",[
    //   Validators.required,
    //   Validators.minLength(3),
    //   Validators.maxLength(15),

    // ]),

  })



  onSubmit(form:NgForm){

    // let isUserValid=this.userList.filter((data:any)=>{
    //   return this.service.formData.Username == data.username;
    // }
    // )
    // if(isUserValid.Length>0){
    //   alert("User already exist");
    // }
    // else{
    this.service.UserRegistration().subscribe(
    res=>{

      alert('Your account has been created successfully');
      // this.registerform.reset();
      this.router.navigate(['login']);
    },
    err =>{
      console.log(err)
    }
    );
  }

  get Username():FormControl{
    return this.registerform.get("username") as FormControl;
   }
   get PhoneNo():FormControl{
    return this.registerform.get("phoneNo") as FormControl;
   }
   get Password():FormControl{
    return this.registerform.get("password") as FormControl;
   }




}








