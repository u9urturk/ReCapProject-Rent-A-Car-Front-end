import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from 'src/app/models/loginModel';
import { RegisterModel } from 'src/app/models/registerModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { TokenModel } from 'src/app/models/tokenModel';
import {Moment} from 'moment'
import * as moment from 'moment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = "https://localhost:44378/api/auth/"
  constructor(private http:HttpClient,
    private router:Router,
    private toastr:ToastrService) { }

  login(user:LoginModel){
    let headers = new HttpHeaders();
    headers = headers.append("Content-Type","application/json");
    return this.http.post<SingleResponseModel<TokenModel>>(this.apiUrl+"login",user,{headers:headers});
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }else{
      return false;
    }
  }

  logOut(){
    localStorage.removeItem("token")
    localStorage.removeItem("role")
    localStorage.removeItem("name")
    localStorage.removeItem("userId")
    localStorage.removeItem("exp")
  }

  isLogened(){
    let date = moment.unix(Number(localStorage.getItem("exp")));
    let date2 =new Date()
    console.log(date.toDate())
    console.log(date2)
    if(date.toDate() > date2){
      return true;
    }else{
      this.toastr.warning("İşlem Yapabilmek İçin Giriş Yapmalısınız.")
      this.logOut();
      setTimeout(()=>this.router.navigate(["login"]),250)
      return false;

    }
  }

  
  getToken(){
    return localStorage.getItem("token")
  }


  register(user:RegisterModel){
    return this.http.post<SingleResponseModel<TokenModel>>(this.apiUrl+"register",user)
  }




}
