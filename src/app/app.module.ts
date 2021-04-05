import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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

import {ToastrModule} from 'ngx-toastr'
 


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
    

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    GalleryModule,LightboxModule.withConfig({
      panelClass:'fullscreen'
    }),
    FormsModule,
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
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
