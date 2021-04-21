import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaymentCardModule } from 'ngx-payment-card'; 





import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { NaviComponent } from './components/navi/navi.component';
import { HomeComponent } from './components/home/home.component';
import { CarCardComponent } from './components/car/car-card/car-card.component';
import { TestComponent } from './components/car/test/test.component';
import { LoginComponent } from './components/navi/login/login.component';
import {AlertifyService} from './services/material_services/alertify.service';
import { GalleryModule } from 'ng-gallery';
import { GALLERY_CONFIG } from 'ng-gallery';
import { LightboxModule } from  'ng-gallery/lightbox';
import { LiraPipe } from './pipes/lira.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';

import {ToastrModule} from 'ngx-toastr';
import { RentSummaryComponent } from './components/rent-summary/rent-summary.component';
import { RentalCarCardComponent } from './components/rental/rental-car-card/rental-car-card.component';
import { CarAddComponent } from './components/car/car-add/car-add.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { FooterComponent } from './components/footer/footer.component';


import { Test2Component } from './components/test2/test2.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { BrandOperationComponent } from './components/brand/brand-operation/brand-operation.component';
import { ColorOperationComponent } from './components/color/color-operation/color-operation.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './components/navi/register/register.component';
import { CarDetailComponent } from './components/car/car-detail/car-detail.component';
import { PaymentComponent } from './components/car/payment/payment.component';
import { ProfileComponent } from './components/navi/profile/profile.component';
import { ProfileImageComponent } from './components/operations/profileImage/profile-image/profile-image.component';





 


@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    NaviComponent,
    HomeComponent,
    CarCardComponent,
    TestComponent,
    LoginComponent,
    LiraPipe,
    FilterPipe,
    RentSummaryComponent,
    RentalCarCardComponent,
    CarAddComponent,
    AdminPanelComponent,
    FooterComponent,
    Test2Component,
    ImageUploadComponent,
    BrandOperationComponent,
    ColorOperationComponent,
    RegisterComponent,
    CarDetailComponent,
    PaymentComponent,
    ProfileComponent,
    ProfileImageComponent,


      
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    NgxPaymentCardModule,
  
    

    GalleryModule,LightboxModule.withConfig({
      panelClass:'fullscreen'
    }),
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
    
    
    
  ],
  providers: [AlertifyService,{
    provide:GALLERY_CONFIG,
    useValue:{
      dots:true,
      imageSize:'cover',
      thumbPosition:'left',
      loadingStrategy:'preload'
     
    }
  },{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
