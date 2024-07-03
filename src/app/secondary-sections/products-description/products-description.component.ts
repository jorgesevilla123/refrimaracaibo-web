import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AlertService } from '../../shared/alert.service'
import { LoginService } from '../../services/login.service'
import { CartOverviewComponent } from '../../main-sections/cart-overview/cart-overview.component'
import { WebsocketService } from '../../services/websocket.service'





@Component({
  selector: 'app-products-description',
  templateUrl: './products-description.component.html',
  styleUrls: ['./products-description.component.scss']
})
export class ProductsDescriptionComponent implements OnInit, AfterViewInit {
  @ViewChild(CartOverviewComponent) cartDrawer: CartOverviewComponent
  @ViewChild('scrollFrame', {static: false}) scrollFrame: ElementRef;
  @ViewChild('chatForm') chatForm: ElementRef;
  @ViewChildren('message') messages: QueryList<any>;
  




  private scrollContainer: any
  private isNearBottom = true
  product: any;
  currentRate = 5;
  quantities = [
    {name: 'cantidad', value: 1},
    {name: 'cantidad', value: 2},
    {name: 'cantidad', value: 3},
    {name: 'cantidad', value: 4},
    {name: 'cantidad', value: 5},
    {name: 'cantidad', value: 6},
    {name: 'cantidad', value: 7},
    {name: 'cantidad', value: 8},
    {name: 'cantidad', value: 9},
    {name: 'cantidad', value: 10},
    {name: 'cantidad', value: 11},
    {name: 'cantidad', value: 12},
    {name: 'cantidad', value: 13},
    {name: 'cantidad', value: 14},
    {name: 'cantidad', value: 15},
    {name: 'cantidad', value: 16},
    {name: 'cantidad', value: 17},
    {name: 'cantidad', value: 18},
    {name: 'cantidad', value: 19},
    {name: 'cantidad', value: 20},
    {name: 'cantidad', value: 21},
    {name: 'cantidad', value: 22},
    {name: 'cantidad', value: 23},
    {name: 'cantidad', value: 24},
    {name: 'cantidad', value: 25},
  ];
  selectedQuantity: any
  price: number = 19
  inCart: any
  openMessage = false
  container: HTMLElement




  constructor(
    public route: ActivatedRoute,
    public cartService: CartService,
    public  alert: AlertService,
    public loginService: LoginService,
    public websocket: WebsocketService

  ) { }



  ngAfterViewInit(): void {
   
 
    this.messages.changes.subscribe( () => {
      this.scrollContainer = this.scrollFrame.nativeElement
     
     
      console.log('A message was sent')
      this.onMessagesChange()})
  }


  private onMessagesChange(): void {
    if(this.isNearBottom){
      this.scrollToBottom()

    }
  }

  private scrollToBottom(): void {
    this.scrollContainer.scroll({
      top: this.scrollContainer.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }



  private isUserNearBottom(): boolean {
    const threshold = 150
    const position = this.scrollContainer.scrollTop + this.scrollContainer.offsetHeight;
    const height = this.scrollContainer.scrollHeight;
    console.log('position', position)
    console.log('height', height)
    return position > height - threshold
  }


  scrolled(event: any): void {
    console.log('scrolled')
    this.isNearBottom = this.isUserNearBottom()
  }







  ngOnInit(): void {
    console.log(this.loginService.selectedUser)

    

    this.route.queryParams.subscribe(
      val => {
        let product = JSON.parse(val.product)
       this.product = product
       console.log('passsed here')
       this.product.hasOwnProperty('quantity') ? this.selectedQuantity = this.product.quantity : this.selectedQuantity = 1
      }
    )

  }





  openChat(){
   
    this.websocket.connect()
    this.openMessage = true
    
  }

  closeChat(){
    this.openMessage = false
    this.websocket.close()
  }


  sendMessage(val){
    let message = {
      type: 'NEW_MESSAGE',
      payload: {
        author: this.loginService.selectedUser[0].email,
        message: `${val}`
      }
    }
   
    this.websocket.sendMessage(message)
    this.chatForm.nativeElement.reset()
  
  
    

  


  }









  





  removeFromCart(){
    this.cartService.deleteById(this.product).subscribe(
      val => {
        this.inCart = val.inCart
      },
      err => {console.log(err)},
      () => 
      {this.cartService.updateCount()
        this.alert.notifySuccess('Producto eliminado del carrito', 800, 'top', 'center')
      }
    )
  }








  addToCart(quantity){
    let productExists = this.loginService.selectedUser[0].cart.some(productFound => productFound.title === this.product.title)
    if(productExists){
      console.log("incart")
      this.alert.notifySuccess('Ya agregaste este producto al carrito', 2000, 'top', 'center') 
    }
    else{
      this.product.quantity = quantity
    
      if(this.loginService.selectedUser.length === 0){
        console.log('user sekected for adding products')
        this.cartService.addProductsNotLoggedUserCart(this.product)
      }
      else {
        this.cartService.addProductsToLoggedUserCart(this.product).subscribe(
          val => {
            console.log(val)
          }
        )
      }
      this.cartService.updateCount();
      this.cartDrawer.open()

    }

  }




  selectQuantity(quantity){
    console.log('cliecked')
    let quantityValue = Number(quantity)
    let index = this.loginService.selectedUser[0].cart.findIndex(val => val.title === this.product.title)
   if(index === -1){
    this.addToCart(quantityValue)
   }
   else {
    this.loginService.selectedUser[0].cart[index].quantity = quantityValue
    this.cartService.updateQuantity().subscribe(
      val => {
        console.log(val)
      }
    )
   }

   
    
    
  }

  hey(){
    console.log('hello')
  }

  





}
