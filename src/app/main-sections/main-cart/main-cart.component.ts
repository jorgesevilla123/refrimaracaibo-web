import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service'
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../shared/alert.service'
import { LoginService } from '../../services/login.service'
import { MatCheckboxChange } from '@angular/material/checkbox';
import { SessionService } from 'src/app/services/session.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-cart',
  templateUrl: './main-cart.component.html',
  styleUrls: ['./main-cart.component.scss']
})
export class MainCartComponent implements OnInit {

  total: number

  deselected: boolean = false

  constructor(
    public cartService: CartService,
    public route: ActivatedRoute,
    public router: Router,
    public alert: AlertService,
    public loginService: LoginService,
    private sessionService: SessionService

  ) { }

  cartProducts: any

  currentRate = 8;

  sections = [
    {
      section_name: 'Productos en el carrito', route: "/categories", query: 'iluminacion', all_button: 'Ver toda la iluminacion', cols: 4, rowHeight: '220px'
    }

  ]




  ngOnInit(): void {
    this.sessionService.getProfile().subscribe(
      {
        next: (profile) => { 
          console.log(profile)
          this.loginService.selectedUser.push(profile.parsedProfile) 
        },
        error: (err) => { },
        complete: () => { console.log('updating count'), this.getCartProducts(), this.total = this.cartService.calculateTotal() }
      }
    )




  }

  isLoggedIn() {

  }





  increaseQuantity(product) {
    let quantity = Number(product.quantity + 1)
    let index = this.loginService.selectedUser[0].cart.findIndex(val => val.title === product.title)
    this.loginService.selectedUser[0].cart[index].quantity = quantity
    this.cartService.updateQuantity().subscribe(
      val => {
        console.log(val)
        product.selected ? this.total = this.cartService.IncreaseTotal() : this.total

      }
    )
  }

  

  decreaseQuantity(product) {
    let quantity = Number(product.quantity - 1)
    let index = this.loginService.selectedUser[0].cart.findIndex(val => val.title === product.title)
    this.loginService.selectedUser[0].cart[index].quantity = quantity
    this.cartService.updateQuantity().subscribe(
      val => {
        console.log(val)
        product.selected ? this.total = this.cartService.decreaseTotal() : this.total
      }
    )
  }


  
  productDescription(id){
    console.log(id)
    this.router.navigate(['/product-details'], {queryParams: {id: id}})
  }










  getCartProducts() {
    this.cartService.getCartProducts().subscribe(
      val => {
        this.cartProducts = val
        console.log(val)
      }
    )

  }



  removeProduct(product) {
    product.inCart = false
    this.cartService.deleteProductFromCart(product).subscribe(
      val => {
        console.log(val)
        this.getCartProducts()
        this.alert.notifySuccess('Producto eliminado del carrito', 800, 'top', 'center')
        this.cartService.updateCount()
        this.total = this.cartService.calculateTotal()


      })

  }




  updateQuantity(product) {
    console.log(product)
    let route_data = JSON.stringify(product)
    let route = `/product-details/${product.title}?d=${route_data}`
    this.router.navigateByUrl(route)

  }




  selectionUpdate(products): Observable<any> {
    return this.cartService.updateSelectedProducts(products)
  }




















}
