import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { DecodedToken } from 'src/app/models/decodedToken';
import { AuthService } from 'src/app/services/material_services/auth.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  currentBrand:Brand;
  token:string=""
  decodedToken:DecodedToken;
  admin:string="Admin"
  name:any=""
  

  constructor( private authService:AuthService,
    private toastr:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.getItem();
    
  }

  logOut(){
    this.authService.logOut();
    //console.log("Ok")
    this.toastr.info(" Anasayfaya yönlendiriliyorsunuz...","Çıkış işlemi gerçekleşti")
    setTimeout(()=>this.goHome('login'),1000);
    
  }
  
  getItem(){
    
    return this.authService.getToken()
    
  }

  getRole(role:string){
    return  localStorage.getItem("role") === role;
  }

  getName(){
    //console.log(localStorage.getItem("name"))
    this.name = localStorage.getItem("name")
    
  }


  goHome(url:string){
    this.router.navigate([url])
  }


}
