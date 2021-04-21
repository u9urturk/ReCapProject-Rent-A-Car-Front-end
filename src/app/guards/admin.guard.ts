import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AlertifyService } from '../services/material_services/alertify.service';
import { AuthService } from '../services/material_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  role:string="Admin"
  constructor(private authService:AuthService,
    private toastr:ToastrService,
    private router:Router,
    private alertify:AlertifyService){}

    getRole(){
      return  localStorage.getItem("role") === this.role;
    }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.getRole()){
      return true;
    }else{
      this.router.navigate([""])
      this.alertify.adminGuard();
      this.toastr.info("Yetkisiz Giriş","Dikkat ! ");
      return false;
    }
  }
  
}
