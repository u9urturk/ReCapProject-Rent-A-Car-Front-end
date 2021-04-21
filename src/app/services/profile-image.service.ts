import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ProfileImage } from '../models/ProfileImage';
import { ProfileImageAdd } from '../models/profileImageAdd';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ProfileImageService {

  apiUrl = "https://localhost:44378/api/profileimages/";
  
  constructor(private httpClient:HttpClient) { }

  

  getProfileImagesByUserId(userId:number):Observable<ListResponseModel<ProfileImage>>{
    let newPath = `${this.apiUrl}getimagebyuserid?userid=${userId}`;
    return this.httpClient.get<ListResponseModel<ProfileImage>>(newPath);
  }

  getFileById(id:number):Observable<string>{
    return this.httpClient.get<string>(
     `${this.apiUrl}getfilebyid?id=${id}`
    );
  }

  getProfileImageUrl(id:number):string{
    return `${this.apiUrl}getfilebyid?id=${id}`;
  }

  imageAdd(image:ProfileImageAdd):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"imageadd",image)
  }

  imageDelete(image:any):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"imagedelete",image)
  }

  imageUpdate(image:ProfileImageAdd):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"imageupdate",image)
  }

  getAllProfileImage():Observable<ListResponseModel<ProfileImage>>{
    let newPath = this.apiUrl+"getall"
    return this.httpClient.get<ListResponseModel<ProfileImage>>(newPath)

  }
}
