import { HttpClient, HttpErrorResponse, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  private apiUrl = 'https://localhost:44378/api/carImages/'
  constructor(private http:HttpClient) { }

 upload(file:File):Observable<HttpEvent<any>>{
  const formData:FormData = new FormData();

  formData.append('Image',file);
  const req = new HttpRequest('POST',`${this.apiUrl}imageadd`,formData,{
   reportProgress:true,
   responseType:'json'
    
  });

  return this.http.request(req)
 }
  
 getFiles():Observable<any>{
   return this.http.get(`${this.apiUrl}`)
 }
}
