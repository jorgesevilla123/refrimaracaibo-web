import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav'
import { CartService } from '../../services/cart.service'
import { LoginService } from 'src/app/services/login.service';




@Component({
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
          this.loginService.selectedUser.push(profile.parsedProfile)
          console.log(this.loginService.selectedUser[0])
          if(this.loginService.selectedUser[0].cart.length === 0){
            this.cartProducts = []
          }
          else {
            this.cartProducts = this.loginService.selectedUser[0].cart.filter(product => product.selected)
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
    let index = this.loginService.selectedUser[0].cart.findIndex(val => val.title === product.title)
    this.loginService.selectedUser[0].cart[index].quantity = quantity
    this.cartService.updateQuantity().subscribe(
      val => {
        console.log(val)
        this.total = this.cartService.IncreaseTotal()
    

      }
    )
   
 
  }

  decreaseQuantity(product){
    let quantity = Number(product.quantity - 1)
    let index = this.loginService.selectedUser[0].cart.findIndex(val => val.title === product.title)
    this.loginService.selectedUser[0].cart[index].quantity = quantity
    this.cartService.updateQuantity().subscribe(
      val => {
        console.log(val)
        this.total = this.cartService.decreaseTotal()

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
