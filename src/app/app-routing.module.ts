import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandOperationComponent } from './components/operations/brand-operation/brand-operation.component';
import { CarDetailComponent } from './components/car/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { ColorOperationComponent } from './components/operations/color-operation/color-operation.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/navi/login/login.component';
import { CarOperationsComponent } from './components/operations/car-operations/car-operations.component';
import { RentalComponent } from './components/rental/rental.component';
import { AdminGuard } from './guards/admin.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"",pathMatch:"full",component:HomeComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cardetail/:carId",component:CarDetailComponent},
  {path:"rentals/mycar",component:RentalComponent},
  {path:"car/operation",component:CarOperationsComponent,canActivate:[LoginGuard,AdminGuard]},
  {path:"brand/operation",component:BrandOperationComponent,canActivate:[LoginGuard,AdminGuard]},
  {path:"color/operation",component:ColorOperationComponent,canActivate:[LoginGuard,AdminGuard]},
  {path:"login",component:LoginComponent}
 
  
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
