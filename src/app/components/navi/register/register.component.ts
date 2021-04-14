import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/material_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm:FormGroup;
  registerUser:any={};
  dataLoaded=false;
  constructor(private authService:AuthService,
    private fb:FormBuilder,
    private toastr:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
   this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm = this.fb.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
      password:["",[Validators.required,
      Validators.minLength(5),
      Validators.maxLength(10)]],
      confirmPassword:["",Validators.required]

    },
    {validator:this.passwordMatchValidator}
    )
  }

  passwordMatchValidator(g:FormGroup){
    return g.get('password')?.value === 
    g.get('confirmPassword')?.value?null:{misMatch:true}
  }

  goComponent(url:string){
    this.router.navigate([url])
  }
  reloadPage(){
    window.location.reload();
  }

  register(){
    if(this.registerForm.valid){
      let registerModel = Object.assign({},this.registerForm.value)
      console.log(registerModel)
      this.authService.register(registerModel).subscribe(response=>{
        this.toastr.success(response.message,"OK")
        localStorage.setItem("token",response.data.token)
        setTimeout(()=>this.goComponent('cars'),1000)
      },responseError=>{
        console.log(responseError)
      })
    }
  }

}
