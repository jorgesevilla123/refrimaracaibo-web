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
   
    if(this.loginService.selectedUser[0].orders.length == 0){
      this.loginService.selectedUser[0].orders = []    
      let orderObject = {
        order_number: 1246,
        date: Date.now(),
        products: this.loginService.selectedUser[0].cart,
        state: 'pending',
        items: this.loginService.selectedUser[0].cart.length,
        total: 200
      }
  
      this.loginService.selectedUser[0].orders.push(orderObject);
     return this.http.post(`${this.API}/update-shipping`, this.loginService.selectedUser[0])

    }
    else {
      console.log('passed here')
      let orderObject = {
        order_number: 1246,
        date: Date.now(),
        products: this.loginService.selectedUser[0].cart,
        state: 'pending',
        items: this.loginService.selectedUser[0].cart.length,
        total: 200
      }
  
      this.loginService.selectedUser[0].orders.push(orderObject);
     return this.http.post(`${this.API}/update-shipping`, this.loginService.selectedUser[0])
      

    }

   
   
  }



  //this function 
  addOrder(){

  }






  

  haveShipping(){
    return this.loginService.selectedUser[0].shipping_addresses.length > 0
  }




  




}
