import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { UserClaim } from '../models/userClaim';
import { UserClaimInfo } from '../models/userClaimInfo';

@Injectable({
  providedIn: 'root'
})
export class UserClaimOperationService {
  apiUrl = "https://localhost:44378/api/useroperationsclaim/";
  constructor(private http:HttpClient) { }

  userClaimAdd(userClaim:UserClaim):Observable<ResponseModel>{
    return this.http.post<ResponseModel>(this.apiUrl + "userclaimadd",userClaim);
  }

  userClaimDelete(userClaim:UserClaim):Observable<ResponseModel>{
    return this.http.post<ResponseModel>(this.apiUrl + "userclaimdelete",userClaim);
  }

  userClaimUpdate(userClaim:UserClaim):Observable<ResponseModel>{
    return this.http.post<ResponseModel>(this.apiUrl + "userclaimupdate",userClaim);
  }

  getUserClaimByUserId(userId:number):Observable<ListResponseModel<UserClaimInfo>>{
    let newPath = this.apiUrl + "getuserclaimbyuserid?userid="+userId;
    return this.http.get<ListResponseModel<UserClaimInfo>>(newPath);
  }
}
