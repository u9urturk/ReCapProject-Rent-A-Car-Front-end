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
        setTimeout(()=> this.authService.decodeToken(localStorage.getItem("token")))
        //this.decodeToken();
        //console.log(this.token)
        setTimeout(()=>this.goComponent('cars'),1500)
        
              
      },responseError=>{
        console.log(responseError.error)
        this.toastr.error(responseError.error)
      })
    }
  }

  


}
