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
  constructor(private fb:FormBuilder,
    private colorService:ColorService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getColors();
    this.createColorAddForm();
    this.createColorUpdateForm();
    
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data;
    })
  }

  setCurrentColor(color:Color){
    this.currentColor=color;
    //console.log(this.currentColor.colorName)
  }

  reloadPage(){
    window.location.reload();
  }

  createColorAddForm(){
    this.colorAddForm=this.fb.group({
      colorName:["",Validators.required]
    })
    //console.log(this.colorAddForm);
  }

  colorAdd(){
    if(this.colorAddForm.valid){
      let colorAddModel = Object.assign({},this.colorAddForm.value)
    //console.log(colorAddModel)
    this.colorService.colorAdd(colorAddModel).subscribe(response=>{
      this.toastr.success(response.message,'Başarılı')
      setTimeout(this.reloadPage,500)
    })
    }else{
      this.toastr.error("İşlem Başarısız")
    }
    
  }

  colorDelete(){
    let colorModel = Object.assign({colorId:this.currentColor.colorId})
    //console.log(colorModel)
    this.colorService.colorDelete(colorModel).subscribe(response=>{
      this.toastr.success(response.message,"Başarılı")
      setTimeout(this.reloadPage,500)
    })
  }

  createColorUpdateForm(){
    this.colorUpdateForm = this.fb.group({
      colorLogo:[null,Validators.required]
    })
    //console.log(this.colorUpdateForm)
  }

  colorUpdate(){
    if(this.colorUpdateForm){
      let colorModel = Object.assign({colorId:this.currentColor.colorId},this.colorUpdateForm.value)
      console.log(colorModel)
      this.colorService.colorUpdate(colorModel).subscribe(response=>{
        this.toastr.success(response.message,"Başarılı")
        setTimeout(this.reloadPage,500)
      })
    }else{
      this.toastr.error("İşlem Başarısız")
    }
    
  }



}
