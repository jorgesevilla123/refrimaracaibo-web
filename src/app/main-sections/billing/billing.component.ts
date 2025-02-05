import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, RequiredValidator, Validators} from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig} from '@angular/material/dialog';
import { LoginService } from '../../services/login.service'
import { ShippingModalComponent } from '../../secondary-sections/shipping-modal/shipping-modal.component'
import { ShippingService } from '../../services/shipping.service'
import { OrderStatusModalComponent } from '../../shared/order-status-modal/order-status-modal.component'
import { CartService } from '../../services/cart.service'
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/shared/alert.service';
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

  confirmationFormZelle = new FormGroup({
    numero_confirmacion_zelle: new FormControl('', [
      Validators.required
    ]),
  })

  confirmationFormPagomovil = new FormGroup({
    numero_confirmacion_pagomovil: new FormControl('', [
      Validators.required
    ])
  })





  selectedValue: string;
  selectedCar: string;
  selectedState: String
  selectedAddress: any
  selectedPayment: any = 'Efectivo'


  paymentProcessed:any = 'waitingCode'
  paymentMethod: any = 'efectivo'
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


  

  constructor(
    private _formBuilder: FormBuilder,
    public loginService: LoginService,
    public cartService: CartService,
    public dialog: MatDialog,
    public shippingService: ShippingService,
    public modalService : NgbModal,
    public alert: AlertService
    ) {}

 


  ngOnInit(): void {
    this.loginService.sessionChecker()
    
  
  } 

  get numero_confirmacion_pagomovil(){
    return this.confirmationFormPagomovil.get('numero_confirmacion_pagomovil');
  }

  get numero_confirmacion_zelle(){
    return this.confirmationFormZelle.get('numero_confirmacion_zelle');
  }


  openOrderSubmitModal(paymentMethod){
    if(typeof this.loginService.selectedUser[0].shipping_address == 'undefined'){
      this.alert.notifyWarn('Debes seleccionar una direccion de envio', 2000, 'top', 'center')
      return
    }
    else {
      const modalRef = this.modalService.open(ConfirmationModalComponent, {centered: true})
      modalRef.componentInstance.text = 'Quieres realizar la compra?'
      modalRef.closed.subscribe({
       next: (result) => {
         if(result == 'accepted'){
          console.log('the sale is accepted')
           this.submitOrder(paymentMethod);
         }
         else {
           return 
         }
       },
       error: (err) => {console.log('There was an error opening the modal')}
     })

    }
  

  }






  submitOrder(paymentMethod){

    let confirmation_number;
    let confirmation_form;

    if(paymentMethod === 'zelle'){
      confirmation_number = this.confirmationFormZelle.get('numero_confirmacion_zelle').value;
      confirmation_form = this.confirmationFormZelle.get('numero_confirmacion_zelle');
    }
    else if(paymentMethod === 'pagomovil'){
      confirmation_number = this.confirmationFormPagomovil.get('numero_confirmacion_pagomovil').value;
      confirmation_form = this.confirmationFormPagomovil.get('numero_confirmacion_pagomovil');
    }
    
   
 
   
      this.shippingService.submitOrder(this.paymentMethod, confirmation_number).subscribe(
        {
          next: (value) => { 
            console.log(this.loginService.selectedUser[0])
            this.cartService.updateCount()
            this.cartService.updateQuantity()
            this.cartService.total = 0
            confirmation_form.reset();
            
          },
          complete: () => {
            this.alert.notifySuccess('Pedido en proceso!', 2000, 'top', 'center')
          }
        }
      )
    
  
  }


  addShippingForm(){

    this.loginService.addShipping().subscribe({
      next: () => {console.log('Shipping adding in process')},
      complete: () => { console.log('Shipping added')}
    }
    )
 

  }
  

  setPayMethod(method){
    this.paymentMethod = method
    

  }

  selectAdress(event, address){
    if(event === 'on'){
      console.log(address)
      this.loginService.selectedUser[0].shipping_address = address
    }
   


  }


  


 




}
