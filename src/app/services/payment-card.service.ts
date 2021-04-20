import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCardModule } from '../models/creditCardModule';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentCardService {
  apiUrl = "https://localhost:44378/api/creditcards/"
  constructor(private http:HttpClient) { }

  creditCardAdd(creditCard:CreditCardModule):Observable<ResponseModel>{
    return this.http.post<ResponseModel>(this.apiUrl+"addcreditcard",creditCard);
  }

  creditCardDelete(creditCard:CreditCardModule):Observable<ResponseModel>{
    return this.http.post<ResponseModel>(this.apiUrl+"deletecreditcard",creditCard);
  }

  creditCardUpdate(creditCard:CreditCardModule):Observable<ResponseModel>{
    return this.http.post<ResponseModel>(this.apiUrl+"updatecreditcard",creditCard);
  }

  getCreditCardByCusyomerId(customerId:number):Observable<ListResponseModel<CreditCardModule>>{
    let newPath =this.apiUrl +"getcreditcardbycustomerid?customerid="+customerId;
    return this.http.get<ListResponseModel<CreditCardModule>>(newPath);
  }

}
