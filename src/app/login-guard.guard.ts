import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../app/services/login.service'
import { AlertService } from '../app/shared/alert.service'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(
    public loginService: LoginService,
    public alert: AlertService,
    public router: Router
  ){

  }



  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.loginService.isLogged()){
        console.log('logged in')
        return true
        
      }
      else {
        this.router.navigate(['/login'])
        return false
      }
    
  }
  



}
