import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,Validator, Validators} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { UploadFilesService } from 'src/app/services/material_services/upload-files.service';

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
  private apiUrl = 'https://localhost:44378/api/carImages/imageadd'
  
  constructor(private formsBuilder:FormBuilder,
    private carService:CarService,
    private carImageService:CarImageService,
    private toastrService:ToastrService,
    private uploadService:UploadFilesService) { }

  ngOnInit(): void {
    this.createCarForms();
    this.createImageForms();
    
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
  createImageForms(){
    
    this.imageAddForm = this.formsBuilder.group({
      carId:["",Validators.required],
      image:["",Validators.required] 
      
    })
    
  }
  selectFile(event:any):void{
    this.selectedFiles = event.target.files;
    if(this.selectedFiles) {
      const file:File | null = this.selectedFiles.item(0);
      if(file) {
        this.currentFile = file
        console.log(this.currentFile)
      }
    }
  }

  imageAdd(){
    const formData = new FormData();
    formData.append('image',this.imageAddForm.get('image')?.value);
     
    if(this.imageAddForm.valid) {
      let imageModel = Object.assign({},this.imageAddForm.value)
      console.log(this.imageAddForm)
      console.log(imageModel)
      // this.uploadService.upload(imageModel).subscribe(response=>{
      //   this.toastrService.success("Başarılı")
      // })
    }else if(this.imageAddForm.invalid) {
      this.toastrService.error('form valid değil')
    }
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
