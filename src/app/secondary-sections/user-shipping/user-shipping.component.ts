import { Component, OnInit } from '@angular/core';
import { ShippingModalComponent } from '../shipping-modal/shipping-modal.component'
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog'
import { LoginService } from '../../services/login.service'
import { ShippingService } from '../../services/shipping.service'
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '../../shared/confirmation-modal/confirmation-modal.component'
import { v4 as uuidv4 } from 'uuid';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  selector: 'app-user-shipping',
  templateUrl: './user-shipping.component.html',
  styleUrls: ['./user-shipping.component.scss']
})
export class UserShippingComponent implements OnInit {



  currentAddress: any

  constructor(
    public dialog: MatDialog,
    public loginService: LoginService,
    public shippingService: ShippingService,
    public modalService : NgbModal

  ) { }

  ngOnInit(): void {

    console.log(this.loginService.selectedUser[0])
    
  }


  resetForm(){
    this.loginService.shippingAddressForm.reset()
  }





  //THIS MODAL IS MADE USING NG-BOOTSTRAP FRAMEWORK
  openDeleteAddressModal(address){
    const modalRef = this.modalService.open(ConfirmationModalComponent, {centered: true})
     modalRef.componentInstance.text = 'Estas seguro que quieres eliminar esta direccion?'
     modalRef.closed.subscribe({
      next: (result) => {
        if(result == 'accepted'){
          this.deleteShippingAddress(address.shipping_id)
        }
        else {
          return 
        }
      },
      error: (err) => {console.log('There was an error opening the modal')}
    })

  }





  //THIS MODAL IS MADE USING NG-BOOTSTRAP FRAMEWORK
  openSetDefaultAddressModal(address){
    const modalRef = this.modalService.open(ConfirmationModalComponent, {centered: true})
    modalRef.componentInstance.text = 'Estas seguro que quieres esta direccion como principal?'
    modalRef.closed.subscribe({
      next: (result) => {
        if(result == 'accepted'){
          this.setDefaultAddress(address)
        }
        else {
          return 
        }
      },
      error: (err) => {console.log('There was an error opening the modal')}
    })
  }







  populateAddress(address){
    this.loginService.populateForm(address)
    this.currentAddress = address

  }


  setDefaultAddress(address){
    this.loginService.selectDefaultAddress(address).subscribe(
      {
        next: (res) => {
          console.log('default address changed', res)
        }
      }
    )
  }





  //THIS MODAL IS MADE USING ANGULAR MATERIAL MODAL (DIALOG)
  addShipping(){
    let dialogConfig = new MatDialogConfig()
    dialogConfig.width = '25%'
    dialogConfig.data = {update: false}
    let dialogRef = this.dialog.open(ShippingModalComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(
      val => {
        console.log('shipping added')
   
      }
    )
  }



  deleteShippingAddress(address_id){
    console.log('clicked')
    let index = this.loginService.selectedUser.shipping_addresses.findIndex( address => address.shipping_id === address_id)
    this.loginService.selectedUser.shipping_addresses.splice(index, 1)
    this.loginService.deleteShippingAddress(this.loginService.selectedUser, address_id).subscribe(
      val => {
        console.log('shipping deleted')
      }
    )
  }


  updateShippingAddress(){

    this.loginService.updateShippingAddress(this.currentAddress).subscribe(
      {
        next: (value) => {console.log('address updated', value)}
      }
    )
    // let index = this.loginService.selectedUser[0].findIndex( userAddress => userAddress.descripcion === address.descripcion)
    // this.loginService.selectedUser[0].shipping_addresses[index]
  }

  
  submitForm(){
    this.loginService.addShipping().subscribe({
      next: () => {console.log('Shipping adding in process')},
      complete: () => { console.log('Shipping added')}
    }
    )
  }


  



}
