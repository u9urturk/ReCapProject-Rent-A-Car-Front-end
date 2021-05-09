import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Claim } from '../models/claim';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ClaimOperationService {
  apiUrl = "https://localhost:44378/api/operationclaim/";
  constructor(private http:HttpClient) { }

  claimAdd(claim:Claim):Observable<ResponseModel>{
    return this.http.post<ResponseModel>(this.apiUrl + "claimadd",claim);
  }

  claimDelete(claim:Claim):Observable<ResponseModel>{
    return this.http.post<ResponseModel>(this.apiUrl + "claimdelete",claim);
  }

  getAllClaims():Observable<ListResponseModel<Claim>>{
    let newPath = this.apiUrl + "getallclaims";
    return this.http.get<ListResponseModel<Claim>>(newPath);
  }
}
