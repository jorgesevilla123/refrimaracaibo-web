import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, RequiredValidator} from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig} from '@angular/material/dialog';
import { LoginService } from '../../services/login.service'
import { ShippingModalComponent } from '../../secondary-sections/shipping-modal/shipping-modal.component'
import { ShippingService } from '../../services/shipping.service'
import { OrderStatusModalComponent } from '../../shared/order-status-modal/order-status-modal.component'
import { CartService } from '../../services/cart.service'
interface Food {
  value: string;
  viewValue: string;
}

interface Car {
  value: string;
  viewValue: string;
}



@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  confirmationForm = new FormGroup({
    numero_confirmacion: new FormControl('')
  })


  selectedValue: string;
  selectedCar: string;
  selectedState: String
  selectedAddress: any
  selectedPayment
  paymentProcessed:any = 'waitingCode'
  paymentMethod: any = ''
  total: any


  shippingMethods: any = [
    {method: 'Retirar en tienda', precio: 'Sin costo', cost: 'free'},
    {method: 'Envio propio', precio: 'Gratis', cost: 'free'},
    {method: 'Envio con domi', precio: 3, cost: 'not-free'},
    {method: 'Envio con quik', precio: 2, cost: 'not-free'}
  ]






  foods: Food[] = [
    {value: 'Zelle', viewValue: 'Zelle'},
    {value: 'Pago movil', viewValue: 'Pago movil'},
    {value: 'Transferencia', viewValue: 'Transferencia'},
    {value: 'Efectivo en divisas', viewValue: 'Efectivo en divisas'},
  ];

  states = [
    {value: 'Zulia', viewValue: 'Zulia'},
    {value: 'Falcon', viewValue: 'Falcon'},
    {value: 'Aragua', viewValue: 'Aragua'},
  ];



  

  constructor(
    private _formBuilder: FormBuilder,
    public loginService: LoginService,
    public cartService: CartService,
    public dialog: MatDialog,
    public shippingService: ShippingService
    ) {}

 


  ngOnInit(): void {
    this.loginService.sessionChecker()
    
  
  } 



  submitOrder(){
    this.shippingService.submitOrder()
    console.log(this.loginService.selectedUser[0])
    // this.shippingService.submitOrder().subscribe(
    //   {
    //     next: (value) => { this.loginService.selectedUser[0].cart.splice(0, this.loginService.selectedUser[0].cart.length);}
    //   }
    // )
  }


  submitForm(){
    this.loginService.addShipping().subscribe({
      next: () => {console.log('Shipping adding in process')},
      complete: () => { console.log('Shipping added')}
    }
    )
 

  }






 




}
