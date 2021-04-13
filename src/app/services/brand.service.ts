import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class BrandService {
  apiUrl = "https://localhost:44378/api/brands/"
  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>> {
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl+"getallbrands");
  }

  addBrand(brand:Brand):Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl+"addbrand",brand);
  }

  deleteBrand(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"deletebrand",brand);
  }
  
  updateBrand(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"updatebrand",brand);
  }

}
