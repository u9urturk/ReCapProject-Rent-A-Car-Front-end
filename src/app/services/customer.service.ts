import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { CustomerAddModel } from '../models/customerAddModel';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl = "https://localhost:44378/api/customers/"
  constructor(private httpClient:HttpClient) { }

  getCustomers():Observable<ListResponseModel<Customer>> {
    return this.httpClient.get<ListResponseModel<Customer>>(this.apiUrl+"getcustomerinfo");
  }

  getCustomerByUserId(userId:number):Observable<SingleResponseModel<CustomerAddModel>>{
    let newPath = this.apiUrl +"getcustomerbyuserid?id="+userId
    return this.httpClient.get<SingleResponseModel<CustomerAddModel>>(newPath)
  }

  customerAdd(customer:CustomerAddModel):Observable<ResponseModel>{
    return  this.httpClient.post<ResponseModel>(this.apiUrl+"addcustomer",customer)
  }

  customerDelete(customer:CustomerAddModel):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"deletecustomer",customer)
  }

  customerUpdate(customer:CustomerAddModel):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"updatecustomer",customer)
  }
}
