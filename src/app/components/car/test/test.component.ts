import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarImageService } from 'src/app/services/car-image.service';




@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
  
})
export class TestComponent implements OnInit {
  
  nestedReactiveForm:any = FormGroup;
  constructor(private fb:FormBuilder,
    private carImageService:CarImageService,
    private toastrService:ToastrService) { 
    
  }
  
  
  ngOnInit(): void {
    this.createReactiveForm();
  }
  
  createReactiveForm(){
    this.nestedReactiveForm = this.fb.group({
      carForms : this.fb.array([this.carForm()])
    });
  }

  carForm():FormGroup{
    return this.fb.group({
      carId:[null,Validators.required],
      images:this.fb.array([])
    })
  }

  addNewForm():void{
    const control = this.nestedReactiveForm.controls.carForms;
    control.push(this.carForm());
  }

  removeSelectedForm(index:number):void{
    const control = this.nestedReactiveForm.controls.carForms;
    control.removeAt(index);
  }
  
  fileupload(evt:any,index:any){
    const files = evt.target.files;
    const control = <FormArray>this.nestedReactiveForm.controls.carForms['controls'][index].controls['images'].controls;
    for(let i=0; i < files.length; i++){
      const reader = new FileReader();
      reader.onload = (e)=>{
        const base64 = reader.result + '';
        control.push(this.fb.control(base64));
      };
      reader.readAsDataURL(files[i]);
    }
    evt.srcElement.value = null;
  }
  removeImage(formIndex:number,imageIndex:number){
   const control = <FormArray>this.nestedReactiveForm.controls.carForms['controls'][formIndex].controls['images'];
   control.removeAt(imageIndex);
  }

  save(carsForm:any){
    for(let i = 0; i < carsForm.carForms.length;i++) {
      carsForm.carForms[i].images = this.nestedReactiveForm.controls.carForms['controls'][i].controls['images'].controls;
     
    } 
    console.log(carsForm);
    
    // this.carImageService.imageAdd(carsForm).subscribe(data=>{
    //   this.toastrService.success(data.message,'Başarılı')
    // })
  }
 
}
