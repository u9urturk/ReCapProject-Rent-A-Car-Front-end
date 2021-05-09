import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Claim } from 'src/app/models/claim';

import { UserClaimInfo } from 'src/app/models/userClaimInfo';
import { ClaimOperationService } from 'src/app/services/claim-operation.service';
import { UserClaimOperationService } from 'src/app/services/user-claim-operation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-claim-operations',
  templateUrl: './claim-operations.component.html',
  styleUrls: ['./claim-operations.component.css']
})
export class ClaimOperationsComponent implements OnInit {
  users:UserClaimInfo[] = [];
  claims:Claim[] = [];
  claimForm:FormGroup;
  claimIdForm:FormGroup;
  currentClaim:Claim;
  currentUpdateClaim:Claim;
  currentUser:UserClaimInfo;
  

  constructor(private userService:UserService,
    private claimService:ClaimOperationService,
    private fb:FormBuilder,
    private toastr:ToastrService,
    private userClaimService:UserClaimOperationService) { }

  ngOnInit(): void {
    this.getUserInfo();
    this.getAllClaims();
    this.createClaimForm();
    
  }

  

  setCurrentUser(user:UserClaimInfo){
    this.currentUser = user;
    //console.log(this.currentUser.id);
    if(this.currentUser){
      this.updateUserClaim();
    }else{
      return;
    }
  }
  
  setCurrentClaim(claim:Claim){
    this.currentClaim = claim;
    console.log(this.currentClaim.id);
   
  }

  claimActive(claim:Claim){
    if(this.currentUpdateClaim){
      if(this.currentUpdateClaim.id == claim.id){
        return "table-dark" 
      }else{
        return "table-default" 
      }
    }else{
      return
    }
    
  }

  setCurrentUpdateClaim(claim:Claim){
    this.currentUpdateClaim = claim;
    this.toastr.info(`Güncelleme için ${this.currentUpdateClaim.name} isimli rol başarıyla seçildi.`)
  }

  deleteClaim(){
    let claimModel = Object.assign({id:this.currentClaim.id,name:this.currentClaim.name})
    if(claimModel != null){
      this.claimService.claimDelete(claimModel).subscribe(reponse=>{
        this.toastr.success(reponse.message);
        setTimeout(()=> window.location.reload(),1000)
  
      },responseError=>{
        this.toastr.warning(responseError.error);
      })
    }
  }

  addClaim(){
    let claimModel = Object.assign({},this.claimForm.value);
    if(this.claimForm.valid){
      this.claimService.claimAdd(claimModel).subscribe(response=>{
        this.toastr.success(response.message);
        setTimeout(()=> window.location.reload(),1000)
      },responseError=>{
        this.toastr.warning(responseError.error)
      })
    }else{
      this.toastr.error("Geçersiz kullanım","Dikkat")
    }
  }

  createClaimForm(){
    this.claimForm=this.fb.group({
      name:["",Validators.required]
    })
  }

  getUserInfo(){
    this.userService.getAllUserDetail().subscribe(response=>{
      this.users = response.data;
       //console.log(this.users);
    })
  }

  getAllClaims(){
    this.claimService.getAllClaims().subscribe(response=>{
      this.claims = response.data;
      
    })
  }

  
  updateUserClaim(){
    let updateModel = Object.assign({id:this.currentUser.id,userId:this.currentUser.userId,operationClaimId:this.currentUpdateClaim.id})
    //console.log(updateModel)
    if(updateModel){
      this.userClaimService.userClaimUpdate(updateModel).subscribe(response=>{
        this.toastr.success(response.message);
        setTimeout(()=> window.location.reload(),1000)
      },responseError=>{
        this.toastr.warning(responseError.error);
      })
    }else{
      this.toastr.error("Geçersiz kullanım","Dikkat");
    }
   
  }

}
