import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AlertService } from '../../shared/alert.service'
import { LoginService } from '../../services/login.service'
import { CartOverviewComponent } from '../../main-sections/cart-overview/cart-overview.component'
import { WebsocketService } from '../../services/websocket.service'
import { ProductsService } from '../../services/products.service'
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';




@Component({
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  selector: 'app-products-description',
  templateUrl: './products-description.component.html',
  styleUrls: ['./products-description.component.scss']
})
export class ProductsDescriptionComponent implements OnInit {
  @ViewChild(CartOverviewComponent) cartDrawer: CartOverviewComponent
  @ViewChild('scrollFrame', { static: false }) scrollFrame: ElementRef;
  @ViewChild('chatForm') chatForm: ElementRef;
  @ViewChildren('message') messages: QueryList<any>;



  formQuantity: number = 1




  loaded: boolean = false
  product: any;
  currentRate = 5;

  selectedQuantity: any
  price: number = 19
  inCart: boolean
  openMessage = false
  container: HTMLElement




  constructor(
    public route: ActivatedRoute,
    public cartService: CartService,
    public alert: AlertService,
    public loginService: LoginService,
    public websocket: WebsocketService,
    public productService: ProductsService

  ) { }



  // ngAfterViewInit(): void {


  //   this.messages.changes.subscribe( () => {
  //     this.scrollContainer = this.scrollFrame.nativeElement


  //     console.log('A message was sent')
  //     this.onMessagesChange()})
  // }


  // private onMessagesChange(): void {
  //   if(this.isNearBottom){
  //     this.scrollToBottom()

  //   }
  // }

  // private scrollToBottom(): void {
  //   this.scrollContainer.scroll({
  //     top: this.scrollContainer.scrollHeight,
  //     left: 0,
  //     behavior: 'smooth'
  //   });
  // }



  // private isUserNearBottom(): boolean {
  //   const threshold = 150
  //   const position = this.scrollContainer.scrollTop + this.scrollContainer.offsetHeight;
  //   const height = this.scrollContainer.scrollHeight;
  //   console.log('position', position)
  //   console.log('height', height)
  //   return position > height - threshold
  // }


  // scrolled(event: any): void {
  //   console.log('scrolled')
  //   this.isNearBottom = this.isUserNearBottom()
  // }


  increaseFormQuantity() {
    this.formQuantity += 1
  }


  decreaseFormQuantity() {
    this.formQuantity -= 1
  }







  ngOnInit(): void {
    console.log(this.route.snapshot.url.map(segment => segment.path).join('/'))

    this.getParams()
    console.log(this.product)
  }



  checkCart(product) {
    return this.loginService.selectedUser.cart.some(cartProduct => cartProduct._id == product._id)

  }


  getParams() {
    this.route.queryParams.subscribe({
      next: (query) => { this.getOneProduct(query.id) }
    })
  }


  getOneProduct(id) {
    this.productService.getOneProduct(id).subscribe({
      next: (res) => {
        console.log(res.product[0])
        this.inCart = this.checkCart(res.product[0])
        console.log(this.inCart)
        if (this.inCart) {
          let productCart = this.loginService.selectedUser.cart.filter(product => product._id == id)
          this.product = productCart[0]
          console.log(this.product)

        }
        else {
          this.product = res.product[0]
          console.log(this.product)

        }


      },
      error: (err) => { console.log(err) },
      complete: () => { setTimeout(() => { this.loaded = true }, 2000) }
    })

  }

  increaseQuantity(product) {
    let quantity = Number(product.quantity + 1)
    let index = this.loginService.selectedUser.cart.findIndex(val => val.title === product.title)
    this.loginService.selectedUser.cart[index].quantity = quantity
    this.cartService.updateQuantity().subscribe(
      val => {
        console.log(val)
        // product.selected ? this.total = this.cartService.IncreaseTotal() : this.total

      }
    )
  }



  decreaseQuantity(product) {
    let quantity = Number(product.quantity - 1)
    let index = this.loginService.selectedUser.cart.findIndex(val => val.title === product.title)
    this.loginService.selectedUser.cart[index].quantity = quantity
    this.cartService.updateQuantity().subscribe(
      val => {
        console.log(val)
        // product.selected ? this.total = this.cartService.decreaseTotal() : this.total
      }
    )
  }







  openChat() {

    this.websocket.connect()
    this.openMessage = true

  }

  closeChat() {
    this.openMessage = false
    this.websocket.close()
  }


  sendMessage(val) {
    let message = {
      type: 'NEW_MESSAGE',
      payload: {
        author: this.loginService.selectedUser.email,
        message: `${val}`
      }
    }

    this.websocket.sendMessage(message)
    this.chatForm.nativeElement.reset()




  }















  removeFromCart() {
    this.cartService.deleteById(this.product).subscribe(
      val => {
        this.inCart = val.inCart
      },
      err => { console.log(err) },
      () => {
        this.cartService.updateCount()
        this.alert.notifySuccess('Producto eliminado del carrito', 800, 'top', 'center')
      }
    )
  }








  addToCart(quantity) {
    console.log('this is the quantity: ', quantity)

    this.product.quantity = quantity
    this.inCart = true

    if (this.loginService.selectedUser === '') {
      console.log('user sekected for adding products')
      this.cartService.addProductsNotLoggedUserCart(this.product)
    }
    else {
      console.log('adding product')
      this.cartService.addProductsToLoggedUserCart(this.product).subscribe(
        val => {
          console.log(val)
        }
      )
    }
    this.cartService.updateCount();
    this.cartDrawer.open()



  }




  selectQuantity(quantity) {
    console.log('cliecked')
    let quantityValue = Number(quantity)
    let index = this.loginService.selectedUser.cart.findIndex(val => val.title === this.product.title)
    if (index === -1) {
      this.addToCart(quantityValue)
    }
    else {
      this.loginService.selectedUser.cart[index].quantity = quantityValue
      this.cartService.updateQuantity().subscribe(
        val => {
          console.log(val)
        }
      )
    }




  }

  hey() {
    console.log('hello')
  }







}
