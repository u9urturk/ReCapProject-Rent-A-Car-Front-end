import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { CarDetail } from 'src/app/models/carDetail';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { AuthService } from 'src/app/services/material_services/auth.service';

@Component({
  selector: 'app-car-operations',
  templateUrl: './car-operations.component.html',
  styleUrls: ['./car-operations.component.css']
})
export class CarOperationsComponent implements OnInit {
  cars: CarDetail[] = [];
  carAddForm: FormGroup;
  brands: Brand[] = [];
  colors: Color[] = [];
  currentColor:Color;
  currentBrand:Brand;
  currentCar:CarDetail;
  sltColor = false;
  sltBrand = false;
  sltAdd=false;
  sltUpdate=false;

  constructor(private carService: CarService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private colorService:ColorService,
    private brandService:BrandService,
    private auth:AuthService) { }

  ngOnInit(): void {
    this.getCars();
    this.createCarForms();
  }

  setCurrentCar(car:CarDetail){
    this.currentCar = car;
    //console.log(car.carId);
    
  }


//  Modalları tekrar tekrar yazmamak ve yazılan modalları 
//  uygun parametrelere yönlendirebilmek için tasarlanan boolean sorgular
  selectAdd(){
    this.sltAdd = true;
    this.sltUpdate = false;
  }

  selectUpdate(){
    this.sltUpdate = true;
    this.sltAdd = false;
  }

  selectColor(){
    this.sltColor = true;
    this.sltBrand = false;
    this.getColors();
  }



  selectBrand(){
    this.sltBrand = true;
    this.sltColor = false;
    this.getBrands();
  }

  //---------------------------------------------------------

  reloadPage(ms:number){
    setTimeout(() =>window.location.reload() , ms);
  }

  setCurrentColor(color:Color){
    this.currentColor = color;
    this.toastr.info(`${this.currentColor.colorName}`," Renk Seçildi")
  }

  setCurrentBrand(brand:Brand){
    this.currentBrand = brand;
    this.toastr.info(`${this.currentBrand.brandName}`," Marka Seçildi")
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data;
    })
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
    })
  }
  createCarForms() {
    this.carAddForm = this.fb.group({
      carName: ["", Validators.required],
      modelYear: [null, Validators.required],
      dailyPrice: ["", Validators.required],
      description: ["", Validators.required],
      carFindeksPoint:[null,Validators.required]
    })

    //console.log(this.carAddForm);
  }

  carDelete(){
    if(this.currentCar && this.auth.isLogened()==true){
      let carModel = Object.assign({carId:this.currentCar.carId})
      this.carService.carDelete(carModel).subscribe(response=>{
        this.toastr.success(response.message)
        this.reloadPage(1500);
      },responseError=>{
        this.toastr.warning(responseError.error)
      })
    }else{
      this.toastr.error("Geçersiz Kullanım","Dikkat")
    }
  }

  carUpdate(){
    // console.log(this.currentCar.carId)
    // console.log(this.currentBrand.brandId)
    // console.log(this.currentColor.colorId)
    // console.log(this.carAddForm)
    if(this.currentCar && this.auth.isLogened()==true && this.carAddForm){
      let carModel = Object.assign({
        carId:this.currentCar.carId,
        brandId:this.currentBrand.brandId,
        colorId:this.currentColor.colorId},
        this.carAddForm.value)
        console.log(carModel);
      this.carService.carUpdate(carModel).subscribe(response=>{
        this.toastr.success(response.message)
        this.reloadPage(1500);
      },responseError=>{
        this.toastr.warning(responseError.error)
      })
    }else{
      this.toastr.error("Geçersiz Kullanım","Dikkat")
    }
  }

  carAdd() {
    if (this.carAddForm.valid && this.auth.isLogened() == true) {
      let carModel = Object.assign({brandId:this.currentBrand.brandId,colorId:this.currentColor.colorId}, this.carAddForm.value)
      this.carService.carAdd(carModel).subscribe(response => {
        this.toastr.success(response.message, "Başarılı")
        this.reloadPage(1500);
      }, responseError => {
        if (responseError.error.Errors.length > 0) {

          for (let i = 0; i < responseError.error.Errors.length; i++) {

            this.toastr.error(responseError.error.Errors[i].ErrorMessage, "Doğrulama Hatası")
          }

        }

      })
      //console.log(carModel);
    } else {
      this.toastr.error("Geçersiz Kullanım", "Dikkat ! ")
    }

  }

  getCars() {
    this.carService.getCars().subscribe(response => {
      this.cars = response.data;
    })
  }

}
