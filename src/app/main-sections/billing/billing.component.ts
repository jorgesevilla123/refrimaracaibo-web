import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, RequiredValidator} from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig} from '@angular/material/dialog';
import { LoginService } from '../../services/login.service'
import { ShippingModalComponent } from '../../secondary-sections/shipping-modal/shipping-modal.component'
import { ShippingService } from '../../services/shipping.service'
import { OrderStatusModalComponent } from '../../shared/order-status-modal/order-status-modal.component'
import { CartService } from '../../services/cart.service'
import { ConfirmationModalComponent } from 'src/app/shared/confirmation-modal/confirmation-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
    public modalService : NgbModal
    ) {}

 


  ngOnInit(): void {
    this.loginService.sessionChecker()
    
  
  } 


  openOrderSubmitModal(){
    const modalRef = this.modalService.open(ConfirmationModalComponent, {centered: true})
    modalRef.componentInstance.text = 'Quieres realizar la compra?'
    modalRef.closed.subscribe({
     next: (result) => {
       if(result == 'accepted'){
         this.submitOrder()
       }
       else {
         return 
       }
     },
     error: (err) => {console.log('There was an error opening the modal')}
   })

  }






  submitOrder(){
    this.shippingService.submitOrder(this.paymentMethod).subscribe(
      {
        next: (value) => { 
          this.cartService.updateCount()
          this.cartService.updateQuantity()
          this.cartService.total = 0
        }
      }
    )
  }


  submitForm(){
    this.loginService.addShipping().subscribe({
      next: () => {console.log('Shipping adding in process')},
      complete: () => { console.log('Shipping added')}
    }
    )
 

  }
  

  setPayMethod(method){
    this.paymentMethod = method
    

  }





 




}
