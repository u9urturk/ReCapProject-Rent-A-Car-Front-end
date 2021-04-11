import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,Validator, Validators} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {
  selectedFiles?: FileList;
  currentFile?: File;
  carAddForm:FormGroup;
  imageAddForm:FormGroup;
  progress:number = 0;
  brandId:5;
  colorId:3;
  
  
  constructor(private formsBuilder:FormBuilder,
    private carService:CarService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createCarForms();
    
    
  }

  

  createCarForms(){
    this.carAddForm = this.formsBuilder.group({
     brandId:["",Validators.required],
     colorId:["",Validators.required],
     carName:["",Validators.required],
     modelYear:["",Validators.required],
     dailyPrice:["",Validators.required],
     description:["",Validators.required]
    })
  }
 
 

  

  carAdd(){
    if(this.carAddForm.valid){
      let carModel = Object.assign({},this.carAddForm.value)
      this.carService.carAdd(carModel).subscribe(response=>{
        
        this.toastrService.success(response.message,"Başarılı")
      },responseError=>{
        if(responseError.error.Errors.length>0){
          
          for (let i = 0; i < responseError.error.Errors.length; i++) {
           
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Doğrulama Hatası")
          }
          
        }
        
      })
    //console.log(carModel);
    }else{
      this.toastrService.error("Geçersiz Kullanım", "Dikkat ! ")
    }

  }
}
