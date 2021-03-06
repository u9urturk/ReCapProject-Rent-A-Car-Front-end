import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/material_services/auth.service';
import { ProfileImageService } from 'src/app/services/profile-image.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:UserModel;
  userId:number
  updateFormName:FormGroup
  updateFormEmail:FormGroup
  claim:any = "";
  constructor(private userService:UserService,
    private fb:FormBuilder,
    private toastr:ToastrService,
    private authService:AuthService) { }

  ngOnInit(): void {
    this.getUserId();
    this.getUserByUserId();
    this.createUpdateNameForm();
    this.createUpdateFormEmail();
    this.getRole();
  }
  
  getRole(){
    this.claim = this.authService.getRole();
    //console.log(this.claim)
  }
  getUserId(){
    this.userId = Number(localStorage.getItem("userId"))
  }

  createUpdateNameForm(){
    this.updateFormName = this.fb.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required]
    })
  }

  createUpdateFormEmail(){
    this.updateFormEmail = this.fb.group({
      email:["",Validators.required]
    })
  }
  updateUserEmail(){
    let emailModel = Object.assign({id:this.userId},this.updateFormEmail.value)
    if(this.updateFormEmail.valid){
      this.userService.userUpdate(emailModel).subscribe(response=>{
        this.toastr.success(response.message);
        this.toastr.warning("Değişiklikler Bir Sonraki Girişte Uygulanacaktır","Dikkat")
      },responseError=>{
        console.log(responseError);
      })
    }else{
      this.toastr.error("Geçersiz Kullanım")
    }
  }

  

  updateUserName(){
    let nameModel = Object.assign({id:this.userId},this.updateFormName.value)
    if(this.updateFormName.valid){
      this.userService.userUpdate(nameModel).subscribe(response=>{
        this.toastr.success(response.message)
        this.toastr.warning("Değişiklikler Bir Sonraki Girişte Uygulanacaktır","Dikkat")
        this.reloadPage();
      },responseError=>{
        console.log(responseError);
      })
    }else{
      this.toastr.error("Geçersiz Kullanım")
    }
    
  }

  reloadPage(){
    setTimeout(()=>window.location.reload(),1500)
  }

  getUserByUserId(){
    this.userService.getUserByUserId(this.userId).subscribe(response=>{
      this.user = response.data
    })
  }

}
