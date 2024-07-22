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
    
    this.total = this.getCartTotal()
  } 



  getCartTotal(){
    return this.cartService.calculateTotal()

  }



  selectAddress(radio, shipping){
    console.log(radio, shipping)
    radio.checked ? (this.selectedAddress = shipping) : (radio.checked = true, this.selectedAddress = shipping)
    
  }



  openCart(){
    console.log('hello')

  }


  openDialog(){
    let dialogConfig = new MatDialogConfig()
    dialogConfig.width = '25%'
    dialogConfig.data = {update: false}
    let dialogRef = this.dialog.open(ShippingModalComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(
      val => {
        console.log(val)
          this.loginService.shippingAddressForm.reset()
        
      }
    )
  }



  selectShipping(radio, payment){
  
    radio.checked ? (this.paymentMethod = payment) : (radio.checked = true, this.paymentMethod = payment)
    console.log(this.paymentMethod)

  }

  


  paymentMethodSelected(event){
    this.selectedPayment = event.value
    

  }


  validate(){
    this.paymentProcessed = 'processing'
    this.validated()
  }



  validated(){
    setTimeout(() => {
      this.paymentProcessed = 'processed'
    }, 4000)
  }


  openShippingUpdateDialog(address){
    this.loginService.selectedUser[0]
    let dialogConfig = new MatDialogConfig
    dialogConfig.data = {update: true, address}
    this.loginService.populateForm(address)
    this.dialog.open(ShippingModalComponent, dialogConfig)
    
  }





  openOrderStatusModal(paymentMethod){
    let dialogConfig = new MatDialogConfig
    dialogConfig.data = { method: paymentMethod }
    dialogConfig.width = '400px'
    dialogConfig.height = '200px'

    this.dialog.open(OrderStatusModalComponent, dialogConfig)
  }

  

}
