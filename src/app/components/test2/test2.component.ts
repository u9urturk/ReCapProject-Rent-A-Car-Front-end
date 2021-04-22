import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/rental';
import { CarImageService } from 'src/app/services/car-image.service';
import { AlertifyService } from 'src/app/services/material_services/alertify.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.css']
})
export class Test2Component implements OnInit {
 form:FormGroup;
 apiUrl="https://localhost:44378/api/carImages/imageadd"
 imgFile:string;
  constructor(public fb:FormBuilder, public http:HttpClient,
   private toastrService:ToastrService,
   private carImageService:CarImageService,
   private alertify:AlertifyService,
   private rental:RentalService) { }
    firstCarId:number = 1057;
    dizitest:any[] = [];
    rentDate:number = 1618336800000
    returnDate:number = 1618509600000
    islemGerceklesemez = false;
    
    firstRentInfo:Rental[]=[]
  ngOnInit(): void {
    
  }
  addDays(date:Date, days:number) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
   }

  getRentalInfo(){
    this.rental.getRentalsByCarId(this.firstCarId).subscribe(response=>{
      this.firstRentInfo = response.data
      console.log(this.firstRentInfo)
    })
  }

  test(){
    if(this.firstRentInfo[0].rentDate < this.firstRentInfo[0].returnDate){
      // console.log(this.firstRentInfo[0].rentDate)
      //    let x = this.addDays(this.firstRentInfo[0].rentDate,1).toJSON()

      //    console.log(x)

      let x = (new Date(this.firstRentInfo[0].rentDate)).getTime()
      let y = (new Date(this.firstRentInfo[0].returnDate)).getTime()
      x = (new Date(this.addDays(this.firstRentInfo[0].rentDate,10))).getTime()
      //let y = this.firstRentInfo[0].returnDate.getTime()
      if(x<y){
        console.log("OK")
      }else{
        console.log("NO");
      }
      
    }
  }

  dongu(index:number){
    let start:Date = this.firstRentInfo[index].rentDate
    let end:Date = this.firstRentInfo[index].returnDate
    x:for (let i =  start; (new Date(i)).getTime() <= (new Date(end)).getTime(); i = this.addDays(i,1)) {
      
      //console.log((new Date(i).getTime()));
      // this.dizitest.push({
      //   x: (new Date(i).getTime())
      // });

      if((new Date(this.rentDate)).getTime() == (new Date(i)).getTime() || (new Date(this.returnDate)).getTime() == (new Date(i)).getTime())
      {
        console.log("Tarihler Çakışıyor")
        this.islemGerceklesemez = true
        break x;
      }else{
        console.log("Tarihler Çakışmıyor")
      }

      
      
    }
    
    console.log("---------------------------------------------------")
    
  }

  control(){
    console.log(this.islemGerceklesemez)
  }

  donguArray(){
    y:for (let i = 0; i < this.firstRentInfo.length; i++) {
      this.dongu(i);
      
    }
    console.log(this.dizitest);
  }

  dogruMu(){
    
    x:for (let i = 0; i < this.dizitest.length; i++) {
      const a:any [] =[]
      let test = this.dizitest[i].x
      this.dizitest.forEach(element => {
        
        a.push({
          y:test == element.x
        })
        
      });
     console.log(a);
    }

    // this.dizitest.forEach(element => {
    //   console.log(element.x);
    //   for (let index = element; index < this.dizitest.length; index++) {
    //     if(element.x == this.dizitest[index].x){
    //       console.log("Çakışan Tarih Var ")
    //       break;
    //     }else{
    //       console.log("Çakışan Tarih Yok")
    //     }
        
        
    //   }
    //   // this.dizitest.forEach(element2 => {
    //   //   if(element.x == element2.x){
    //   //     console.log("Operasyon Tamam");
    //   //   }else{
    //   //     console.log("Kiralanabilir")
    //   //   }
    //   // });
    // });
  }
 
}
