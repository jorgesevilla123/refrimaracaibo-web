import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service'
import { SessionService } from 'src/app/services/session.service';
import { LoginService } from '../../services/login.service'


@Component({
  selector: 'app-products-modal',
  templateUrl: './products-modal.component.html',
  styleUrls: ['./products-modal.component.scss']
})
export class ProductsModalComponent implements OnInit {

  cartProducts: any = []
  total

  constructor(
    public cartService: CartService,
    private sessionService: SessionService,
    public loginService: LoginService,

  ) { }

  ngOnInit(): void {
    console.log('Component init')
    this.getCartProducts()
  }





  getCartProducts(){
    console.log('getting cart products')

    this.sessionService.getProfile().subscribe(
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
        error: (err) => {console.log(err)},
        complete: () => {console.log('Completed getting cart products')}
      }
  )

  }

  // increaseQuantity(product){
  //   let quantity = Number(product.quantity + 1)
  //   this.cartService.updateQuantity(product, quantity)
  //   this.total = this.cartService.IncreaseTotal()
    
  // }



  // decreaseQuantity(product){
  //   let quantity = Number(product.quantity -1)
  //   this.cartService.updateQuantity(product, quantity)
  //   this.total = this.cartService.decreaseTotal()

  // }


  removeProduct(product){
    this.cartService.deleteProductFromCart(product)
    this.total = this.cartService.calculateTotal()

  }



}
