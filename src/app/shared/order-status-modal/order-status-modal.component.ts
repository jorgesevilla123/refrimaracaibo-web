import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog'
import { CartService } from '../../services/cart.service'

@Component({
  selector: 'app-order-status-modal',
  templateUrl: './order-status-modal.component.html',
  styleUrls: ['./order-status-modal.component.scss']
})
export class OrderStatusModalComponent implements OnInit {
  
  confirmationForm = new FormGroup({
    numero_confirmacion: new FormControl('')
  })



  method: any

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public cartService: CartService

  ) { 

    this.method = data.method



  }

  ngOnInit(): void {
    

    this.changingStatus()
  
  }


  onClose(){
    console.log(this.method)
  }


  changingStatus(){

    setTimeout(() =>{
      this.cartService.orderStatus = 'waitingCode'
      setTimeout(() => {
        this.cartService.orderStatus = 'processing'
  
        setTimeout( () => {
          this.cartService.orderStatus = 'processed'
          setTimeout( () => {
            this.cartService.orderStatus = 'onWay'
    
          }, 10000)
  
        }, 12000)
     
      }, 6000)
    }, 4000)
    
  }








  changingStatusCash(){
      this.cartService.orderStatus = 'processed'

      setTimeout( () => {
        this.cartService.orderStatus = 'onWay'

      }, 3000)
    
  }

}
