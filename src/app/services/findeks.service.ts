import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FindeksModel } from '../models/findeksModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class FindeksService {
  apiUrl = "https://localhost:44378/api/customerfindeks/"
  constructor(private http:HttpClient) { }

  newCustomerFindeksPoint(findeks:FindeksModel):Observable<ResponseModel>{
    return this.http.post<ResponseModel>(this.apiUrl+"newcustomerfindekspoint",findeks)
  }

  updateCustomerFindeksPoint(findeks:FindeksModel):Observable<ResponseModel>{
    return this.http.post<ResponseModel>(this.apiUrl+"updatecustomerfindekspoint",findeks);
  }

  getCustomerFindeksPointByCustomerId(customerId:number):Observable<SingleResponseModel<FindeksModel>>{
    let newPath = this.apiUrl +"getcustomerfindekspoint?customerid="+customerId
    return this.http.get<SingleResponseModel<FindeksModel>>(newPath);

  }
}
