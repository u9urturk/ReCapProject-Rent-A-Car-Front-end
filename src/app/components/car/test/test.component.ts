import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { AlertifyService } from 'src/app/services/material_services/alertify.service';




@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
  
})
export class TestComponent implements OnInit {
  
  brands:Brand[]=[]

  constructor(private alertify:AlertifyService,private brand:BrandService) { }

  ngOnInit(): void {
    
  }
  

  test(){
    this.alertify.success("test başarılı");
  }
  login(){
    this.alertify.login();
  }

  getBrands(){
    this.brand.getBrands().subscribe(response=>{
      this.brands=response.data
    })
  }

  
 
}
