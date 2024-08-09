import { Injectable } from '@angular/core';
import {LoginService} from '../services/login.service'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  API: string = 'http://localhost:4300/api/sessions'





  constructor(
    public loginService: LoginService,
    private http: HttpClient
  ) { }





  submitOrder(){
    this.loginService.selectedUser[0].orders = []      
  }






  

  haveShipping(){
    return this.loginService.selectedUser[0].shipping_addresses.length > 0
  }




  




}
