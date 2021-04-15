import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from 'src/app/models/loginModel';
import { RegisterModel } from 'src/app/models/registerModel';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { TokenModel } from 'src/app/models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = "https://localhost:44378/api/auth/"
  constructor(private http:HttpClient) { }

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
  }

  
  getToken(){
    return localStorage.getItem("token")
  }


  register(user:RegisterModel){
    return this.http.post<SingleResponseModel<TokenModel>>(this.apiUrl+"register",user)
  }




}
