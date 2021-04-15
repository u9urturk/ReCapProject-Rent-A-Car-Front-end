import { Injectable } from '@angular/core';

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

  adminGuard(){
    alertify.alert().set({transition:'zoom',message:'Henüz böyle bir yolculuğa hazır değilsin','closable':false}).setHeader('Sistem Mesajı').show()
  }

  login(){
    alertify.alert().set({transition:'zoom'}).setHeader('Kategoriler').show(); 
  }

  
 

  

}
