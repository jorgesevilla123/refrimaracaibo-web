import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { LoginService } from '../../../services/login.service'
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  order: any

  constructor(
    public router: ActivatedRoute,
    public loginService: LoginService,
    public cartService: CartService
  ) { }

  ngOnInit(): void {
   this.orderDetails()

   console.log(this.order)
  }



  orderDetails(){
    return this.router.queryParams.subscribe(
      {
        next: query => {
          this.getOrder(query.order)
        }
      }
    )
  }


  getOrder(orderId){
    console.log(orderId)
    this.order = this.loginService.selectedUser.orders.find( orderFound => orderFound.order_id === orderId)
    console.log(this.order)

  }
}
