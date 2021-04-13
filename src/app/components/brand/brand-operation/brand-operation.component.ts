import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-operation',
  templateUrl: './brand-operation.component.html',
  styleUrls: ['./brand-operation.component.css']
})
export class BrandOperationComponent implements OnInit {

  brandAddForm:FormGroup;
  brandUpdateForm:FormGroup;
  brands:Brand[]=[];
  currentBrand:Brand;

  constructor(private fb:FormBuilder,
    private toastr:ToastrService,
    private brandService:BrandService) { }

  ngOnInit(): void {
    
    this.createBrandForms();
    this.getBrands();
    this.createBrandUpdateForms();
    
    
  }

  reloadPage(){
    window.location.reload()
  }

  createBrandForms(){
    this.brandAddForm = this.fb.group({
      brandName:["",Validators.required]
    })
    
   
  }



  createBrandUpdateForms(){
    this.brandUpdateForm = this.fb.group({
     
      brandLogo:["",Validators.required]
    })
    //console.log(this.brandUpdateForm)
  }

 
  brandAdd(){
    if(this.brandAddForm.valid){
      let brandModel = Object.assign({},this.brandAddForm.value)
      //console.log(brandModel)
      this.brandService.addBrand(brandModel).subscribe(response=>{
        this.toastr.success(response.message,"Başarılı")
        setTimeout(this.reloadPage,500)
      })
    }else{
      this.toastr.error("Geçersiz Kullanım","Dikkat ! ")
    }
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data
    })
  }

  brandDelete(){
    
      let brandDeleteModel = Object.assign({brandId:this.currentBrand.brandId})
      console.log(brandDeleteModel)
      this.brandService.deleteBrand(brandDeleteModel).subscribe(response=>{
      this.toastr.success(response.message,"Başarılı")
      setTimeout(this.reloadPage,500)

    })
  }

  brandUpdate(){
    if(this.brandUpdateForm.valid){
      let brandUpdateModel = Object.assign({brandId:this.currentBrand.brandId},this.brandUpdateForm.value )
      //console.log(brandUpdateModel)
      this.brandService.updateBrand(brandUpdateModel).subscribe(response=>{
        this.toastr.success(response.message,"Başarılı")
        setTimeout(this.reloadPage,500)
      })
    }else{
      this.toastr.error("İşlem Başarısız")
    }
  }

  setCurrentBrand(brand:Brand){
    this.currentBrand=brand;
    //console.log(this.currentBrand.brandId)
  }

 

}
