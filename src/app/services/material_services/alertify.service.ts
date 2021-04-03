import { Injectable } from '@angular/core';
import { BrandService } from '../brand.service';

declare let alertify:any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  success(message:string) {
    alertify.success(message);
  }

  warning(message:string) {
    alertify.warning(message);
  }

  error(message:string) {
    alertify.error(message);
  }

  test(){
    alertify.alert()
  }

  login(){
    alertify.alert().set({transition:'zoom'}).setHeader('Kategoriler').show(); 
  }

  
 

  

}
