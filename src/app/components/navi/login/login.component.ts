import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/material_services/auth.service';
import jwtDecode from"jwt-decode";
import { DecodedToken } from 'src/app/models/decodedToken';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  token:string=""
  decodedToken:DecodedToken;
  constructor(private fb:FormBuilder,
    private authService:AuthService,
    private toastr:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.createLoginForm();
    
   
  }

  createLoginForm(){
    this.loginForm = this.fb.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  goComponent(url:string){
    this.router.navigate([url])
  }

  login(){
    if(this.loginForm.valid){
      //console.log(this.loginForm.value)
      
      let loginModel = Object.assign({},this.loginForm.value)
      this.authService.login(loginModel).subscribe(response=>{
        this.toastr.info(response.message,"OK")
        localStorage.setItem("token",response.data.token)
        this.token = response.data.token
        //this.decodeToken();
        //console.log(this.token)
        setTimeout(()=>this.goComponent('cars'),1000)
        this.decodeToken();        
      },responseError=>{
        console.log(responseError.error)
        this.toastr.error(responseError.error)
      })
    }
  }

  decodeToken(){
    this.decodedToken = jwtDecode(this.token)
    localStorage.setItem("role",this.decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])
    localStorage.setItem("name",this.decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'])
    // console.log(localStorage.getItem("role"))
    // console.log(this.decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])
  }


}
