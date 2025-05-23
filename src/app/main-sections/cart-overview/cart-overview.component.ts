import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav'
import { CartService } from '../../services/cart.service'
import { LoginService } from 'src/app/services/login.service';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';




@Component({
  standalone: true,
  imports: [MaterialModule, RouterModule, ReactiveFormsModule, CommonModule],
  selector: 'app-cart-overview',
  templateUrl: './cart-overview.component.html',
  styleUrls: ['./cart-overview.component.scss']
})
export class CartOverviewComponent implements OnInit {

  cartProducts: any = []
  total

  constructor(
    public cartService: CartService,
    public loginService: LoginService

  ) { }

  ngOnInit(): void {
    this.total = this.cartService.calculateTotal()
  }


  open() {
 
    this.cartService.getCartProducts().subscribe(
      {
        next: (profile) => {
          this.loginService.selectedUser = profile.parsedProfile
          console.log(this.loginService.selectedUser)
          if(this.loginService.selectedUser.cart.length === 0){
            this.cartProducts = []
          }
          else {
            this.cartProducts = this.loginService.selectedUser.cart.filter(product => product.selected)
            this.total = this.cartService.calculateTotal()
          }
     
        },
        error: (err) => { console.log(err) }
      }
    )

  }


  
  getCartProducts() {
    this.cartService.getCartProducts().subscribe(
      val => {
        this.cartProducts = val
        console.log(val)
      }
    )

  }



  increaseQuantity(product){
    let quantity = Number(product.quantity + 1)
    let index = this.loginService.selectedUser.cart.findIndex(val => val.title === product.title)
    this.loginService.selectedUser.cart[index].quantity = quantity
    this.cartService.updateQuantity().subscribe(
      val => {
        console.log(val)
        this.total = this.cartService.updateTotal()
    

      }
    )
   
 
  }

  decreaseQuantity(product){
    let quantity = Number(product.quantity - 1)
    let index = this.loginService.selectedUser.cart.findIndex(val => val.title === product.title)
    this.loginService.selectedUser.cart[index].quantity = quantity
    this.cartService.updateQuantity().subscribe(
      val => {
        console.log(val)
        this.total = this.cartService.updateTotal()

      }
    )

  }


  

  removeProduct(product){
    product.inCart = false
    this.cartService.deleteProductFromCart(product).subscribe(
      val => {
        console.log(val)
        this.getCartProducts()
        this.cartService.updateCount()
        this.total = this.cartService.calculateTotal()


      })

  }





}
