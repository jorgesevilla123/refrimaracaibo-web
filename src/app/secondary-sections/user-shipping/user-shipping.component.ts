import { Component, OnInit } from '@angular/core';
import { ShippingModalComponent } from '../shipping-modal/shipping-modal.component'
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog'
import { LoginService } from '../../services/login.service'
import { ShippingService } from '../../services/shipping.service'





@Component({
  selector: 'app-user-shipping',
  templateUrl: './user-shipping.component.html',
  styleUrls: ['./user-shipping.component.scss']
})
export class UserShippingComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public loginService: LoginService,
    public shippingService: ShippingService

  ) { }

  ngOnInit(): void {
    
  }


  resetForm(){
    this.loginService.shippingAddressForm.reset()
  }



  populateAddress(address){
    this.loginService.populateForm(address)

  }



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



  deleteShippingAddress(address_name){
    console.log('clicked')
    let index = this.loginService.selectedUser[0].shipping_addresses.findIndex( address => address.descripcion === address_name)
    this.loginService.selectedUser[0].shipping_addresses.splice(index, 1)
    this.loginService.deleteShippingAddress(this.loginService.selectedUser[0]).subscribe(
      val => {
        console.log('shipping deleted')
      }
    )
  }


  updateShippingAddress(address){

    let index = this.loginService.selectedUser[0].findIndex( userAddress => userAddress.descripcion === address.descripcion)
    this.loginService.selectedUser[0].shipping_addresses[index]



  }


  openShippingUpdateDialog(address){
    this.loginService.selectedUser[0]
    let dialogConfig = new MatDialogConfig
    dialogConfig.data = {update: true, address}
    this.loginService.populateForm(address)
    this.dialog.open(ShippingModalComponent, dialogConfig)
    
  }



  
  submitForm(){
    this.loginService.addShipping().subscribe({
      next: () => {console.log('Shipping adding in process')},
      complete: () => { console.log('Shipping added')}
    }
    )
 

  }


  



}
