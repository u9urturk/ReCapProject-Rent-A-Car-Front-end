import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CarComponent } from './components/car/car.component';
import { TestComponent } from './components/car/test/test.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:"",pathMatch:"full",component:HomeComponent},
  {path:"cars",component:CarComponent},
  {path:"tester",component:TestComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
