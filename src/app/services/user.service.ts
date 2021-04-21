import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserModel } from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = "https://localhost:44378/api/users/"
  constructor(private http:HttpClient) { }

  getUserByUserId(userId:number):Observable<SingleResponseModel<UserModel>>{
    let newPath = `${this.apiUrl}getuserbyuserid?userid=${userId}`;
    return this.http.get<SingleResponseModel<UserModel>>(newPath);
  }

  userUpdate(userModel:UserModel):Observable<ResponseModel>{
    return this.http.post<ResponseModel>(this.apiUrl+"userupdate",userModel);
  }
}
