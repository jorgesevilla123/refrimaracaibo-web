import { Injectable } from '@angular/core';
import {LoginService} from '../services/login.service'
import { HttpClient } from '@angular/common/http';
import { CartService } from '../services/cart.service'

@Injectable({
  providedIn: 'root'
})
export class ShippingService {

  API: string = 'http://localhost:4300/api/sessions';
  ORDER_API: string = 'http://localhost:4300/api/orders';
  current_order: any





  constructor(
    public loginService: LoginService,
    public cartService: CartService,
    private http: HttpClient
  ) { }





  submitOrder(paymethod){
    let hasOrders = 'orders' in this.loginService.selectedUser[0]
    console.log(hasOrders)
   

      // if the user doesnt have previous orders this code executes
    if(!hasOrders){
      this.loginService.selectedUser[0].orders = []    
      let orderObject = {
        order_number: 1246,
        date: Date.now(),
        products: [...this.loginService.selectedUser[0].cart],
        state: 'pending',
        items: this.loginService.selectedUser[0].cart.length,
        total: 200
      }
  
      this.loginService.selectedUser[0].orders.push(orderObject);
      this.loginService.selectedUser[0].cart.splice(0, this.loginService.selectedUser[0].cart.length);
      console.log( this.loginService.selectedUser[0])
     return this.http.post(`${this.API}/update-shipping`, this.loginService.selectedUser[0])

    }


    // if the user already have orders this code executes and creates order
    else {
      let idGenerator = Math.round(Math.random()*1000)
      let products = this.loginService.selectedUser[0].cart
      console.log(products)
      console.log('passed here')
      let orderObject = {
        order_id: idGenerator,
        pay_method: paymethod,
        date: Date.now(),
        products_cart: products,
        status: 'en proceso',
        items: this.loginService.selectedUser[0].cart.length,
        total: this.cartService.total,
      }
      console.log(orderObject)
     
      this.loginService.selectedUser[0].current_order = orderObject
      this.loginService.selectedUser[0].orders.push(orderObject);
      this.loginService.selectedUser[0].cart = []
      console.log(this.loginService.selectedUser[0])
     return this.http.post(`${this.ORDER_API}/submit-order`, this.loginService.selectedUser[0])
      

    }

   
   
  }


  updateUserProfile(){
    return this.http.post(`${this.API}/update-shipping`, this.loginService.selectedUser[0])

  }



  //this function 
  addOrder(){

  }






  

  haveShipping(){
    return this.loginService.selectedUser[0].shipping_addresses.length > 0
  }




  




}
