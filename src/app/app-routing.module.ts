import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarAddComponent } from './components/car/car-add/car-add.component';

import { CarComponent } from './components/car/car.component';
import { TestComponent } from './components/car/test/test.component';
import { HomeComponent } from './components/home/home.component';
import { RentalComponent } from './components/rental/rental.component';
import { Test2Component } from './components/test2/test2.component';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:HomeComponent},
  {path:"cars",component:CarComponent},
  {path:"tester",component:TestComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"rentals/mycar",component:RentalComponent},
  {path:"cars/add",component:CarAddComponent},
  {path:"admin/test",component:Test2Component}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
