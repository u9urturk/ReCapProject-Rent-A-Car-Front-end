import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  form:FormGroup;
  apiUrl="https://localhost:44378/api/carImages/imageadd"
  imgFile:string;
   constructor(public fb:FormBuilder, public http:HttpClient,
    private toastrService:ToastrService,
    private carImageService:CarImageService) { }
 
   ngOnInit(): void {
     this.createForm();
   }
  
   createForm(){
     this.form = this.fb.group({
       carId:[null,Validators.required],
       image:[null,Validators.required],
       imgSrc: new FormControl('',[Validators.required])
 
     })
   }
 
 
   uploadFile(event:any){
     const reader = new FileReader();
     if(event.target.files && event.target.files.length){
       const [file] = event.target.files;
       reader.readAsDataURL(file);
 
       reader.onload = () =>{
         this.imgFile = reader.result as string;
         this.form.patchValue({
           imgSrc:reader.result
         })
       }
     }
     const file = (event.target as HTMLInputElement).files![0];
     this.form.patchValue({
       image:file
     });
     this.form.get('image')?.updateValueAndValidity()
   }
 
   submitForm(){
     console.log(this.form.value)
     var formData:any = new FormData();
 
     formData.append("carId",this.form.get('carId')?.value);
     formData.append("image",this.form.get('image')?.value);
 
     this.carImageService.imageAdd(formData).subscribe(response=>{
       this.toastrService.success(response.message)
     })
     
   }
}
