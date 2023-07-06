import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from 'src/app/MODELS/Login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  email:any;
  password:any;
  role:any;
  login:Login=new Login();
  constructor(private http:HttpClient) { }

  baseUrl='http://localhost:8080/login'

   loginUser(login:any){

     console.log(login);


     let data = {
       "username": login.username,
       "password": login.password,
       "role":login.role
     }

     // let headers = new HttpHeaders();
     // headers = headers.set('Content-Type', 'application/json; charset=utf-8')
     // // headers = headers.set('Authorization', `Bearer' ${localStorage.getItem('token')}`);
     // let t = `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMSIsInBlcm1pc3Npb25zIjpbeyJhdXRob3JpdHkiOiJ1c2VyX3dyaXRlIn0seyJhdXRob3JpdHkiOiJ1c2VyX3VwZGF0ZSJ9LHsiYXV0aG9yaXR5IjoidXNlcl9yZWFkIn0seyJhdXRob3JpdHkiOiJ1c2VyX2RlbGV0ZSJ9XSwiaWQiOjF9.x-F6allDYUMWXDrVZ-PlCVHPZkI4lfOpBsjU08jWMmo`;
     // headers = headers.set('Authorization','Bearer ' +t)       // {
     //
     //
     // console.log(headers.get("Authorization"));
     // console.log({headers: headers});
     console.log(data);
     return this.http.post<any>(
       this.baseUrl, data);
    }

    isLoggedin():boolean{
      return localStorage.getItem("tk")?true:false ;

    }
   GetToken(){
     let t = `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMSIsInBlcm1pc3Npb25zIjpbeyJhdXRob3JpdHkiOiJ1c2VyX3dyaXRlIn0seyJhdXRob3JpdHkiOiJ1c2VyX3VwZGF0ZSJ9LHsiYXV0aG9yaXR5IjoidXNlcl9yZWFkIn0seyJhdXRob3JpdHkiOiJ1c2VyX2RlbGV0ZSJ9XSwiaWQiOjF9.x-F6allDYUMWXDrVZ-PlCVHPZkI4lfOpBsjU08jWMmo`;
     // console.log(localStorage.getItem('tk'))
     return localStorage.getItem('tk')||t
    // return localStorage.getItem('tk')||''
  }
  removeToken(){
    return localStorage.removeItem('tk');
  }
}
