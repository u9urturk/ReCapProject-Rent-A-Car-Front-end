import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/services/material_services/alertify.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private alertify:AlertifyService) { }

  ngOnInit(): void {
    
  }
  

  test(){
    this.alertify.success("test başarılı");
  }
  login(){
    this.alertify.login();
  }
 
}
