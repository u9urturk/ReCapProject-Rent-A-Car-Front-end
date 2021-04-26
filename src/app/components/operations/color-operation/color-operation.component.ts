import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-operation',
  templateUrl: './color-operation.component.html',
  styleUrls: ['./color-operation.component.css']
})
export class ColorOperationComponent implements OnInit {
  colorAddForm:FormGroup;
  colorUpdateForm:FormGroup;
  colors:Color[]=[];
  currentColor:Color;
  sltUpdate=false;
  sltAdd=false;

  constructor(private fb:FormBuilder,
    private toastr:ToastrService,
    private colorService:ColorService) { }

  ngOnInit(): void {
    
    this.createColorForms();
    this.getColors();
    this.createColorUpdateForms();
    
    
  }

  selectUpdate(){
    this.sltUpdate = true;
    this.sltAdd = false;
  }

  selectAdd(){
    this.sltUpdate = false;
    this.sltAdd = true;
  }
  reloadPage(){
    window.location.reload()
  }

  createColorForms(){
    this.colorAddForm = this.fb.group({
      colorName:["",Validators.required]
    })
    
   
  }



  createColorUpdateForms(){
    this.colorUpdateForm = this.fb.group({
     
      colorLogo:["",Validators.required]
    })
    //console.log(this.brandUpdateForm)
  }

 
  colorAdd(){
    if(this.colorAddForm.valid){
      let brandModel = Object.assign({},this.colorAddForm.value)
      //console.log(brandModel)
      this.colorService.colorAdd(brandModel).subscribe(response=>{
        this.toastr.success(response.message,"Başarılı")
        setTimeout(this.reloadPage,500)
      })
    }else{
      this.toastr.error("Geçersiz Kullanım","Dikkat ! ")
    }
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data
    })
  }

  colorDelete(){
    
      let brandDeleteModel = Object.assign({colorId:this.currentColor.colorId})
      console.log(brandDeleteModel)
      this.colorService.colorDelete(brandDeleteModel).subscribe(response=>{
      this.toastr.success(response.message,"Başarılı")
      setTimeout(this.reloadPage,500)

    })
  }

  colorUpdate(){
    if(this.colorUpdateForm.valid){
      let brandUpdateModel = Object.assign({colorId:this.currentColor.colorId},this.colorUpdateForm.value )
      //console.log(brandUpdateModel)
      this.colorService.colorUpdate(brandUpdateModel).subscribe(response=>{
        this.toastr.success(response.message,"Başarılı")
        setTimeout(this.reloadPage,500)
      })
    }else{
      this.toastr.error("İşlem Başarısız")
    }
  }

  setCurrentColor(color:Color){
    this.currentColor=color;
    console.log(this.currentColor.colorId)
  }

}
