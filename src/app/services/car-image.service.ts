import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { CarImageAdd } from '../models/carImageAdd';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {
  apiUrl = "https://localhost:44378/api/carimages/";
  
  constructor(private httpClient:HttpClient) { }

  getAllCarImage():Observable<ListResponseModel<CarImage>>{
    let newPath = this.apiUrl+"getall"
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath)

  }

  getCarImagesByCarId(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath = `${this.apiUrl}getimagebycarid?carid=${carId}`;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  getFileById(id:number):Observable<string>{
    return this.httpClient.get<string>(
     `${this.apiUrl}getfilebyid?id=${id}`
    );
  }

  getCarImageUrl(id:number):string{
    return `${this.apiUrl}getfilebyid?id=${id}`;
  }

  imageAdd(image:CarImageAdd):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"imageadd",image)
  }

  imageDelete(imageDelete:any):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"imagedelete",imageDelete)
  }

  imageUpdate(imageUpdate:any):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"imageupdate",imageUpdate)
  }
}
