import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandOperationComponent } from './components/brand/brand-operation/brand-operation.component';
import { CarAddComponent } from './components/car/car-add/car-add.component';

import { CarComponent } from './components/car/car.component';
import { TestComponent } from './components/car/test/test.component';
import { ColorOperationComponent } from './components/color/color-operation/color-operation.component';
import { HomeComponent } from './components/home/home.component';
import { RentalComponent } from './components/rental/rental.component';
import { Test2Component } from './components/test2/test2.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:HomeComponent},
  {path:"cars",component:CarComponent},
  {path:"tester",component:TestComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"rentals/mycar",component:RentalComponent},
  {path:"car/operation",component:CarAddComponent},
  {path:"brand/operation",component:BrandOperationComponent},
  {path:"color/operation",component:ColorOperationComponent},
  //{path:"admin/test"}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
