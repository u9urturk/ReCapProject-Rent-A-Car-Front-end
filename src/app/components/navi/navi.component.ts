import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  currentBrand:Brand;

  constructor() { }

  ngOnInit(): void {
  }

  getAllCarClass(){
    if(!this.currentBrand){
      return "list-group-item active"
    }
    else{
      return "list-group-item"
    }
  }

}
