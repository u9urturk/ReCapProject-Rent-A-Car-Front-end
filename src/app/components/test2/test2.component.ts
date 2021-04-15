import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarImageService } from 'src/app/services/car-image.service';
import { AlertifyService } from 'src/app/services/material_services/alertify.service';

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
   private alertify:AlertifyService) { }

  ngOnInit(): void {
    
  }
 
  test(){
    this.alertify.adminGuard();
  }
}
