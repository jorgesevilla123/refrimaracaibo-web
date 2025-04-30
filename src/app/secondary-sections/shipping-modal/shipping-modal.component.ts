import { Component, Inject, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { AlertService } from 'src/app/shared/alert.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';


@Component({
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  selector: 'app-shipping-modal',
  templateUrl: './shipping-modal.component.html',
  styleUrls: ['./shipping-modal.component.scss']
})
export class ShippingModalComponent implements OnInit {



  state: any

  constructor(
    public loginService: LoginService,
    public dialog: MatDialog,
    public alert: AlertService,
    public dialogRef: MatDialogRef<ShippingModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.state = this.data
  }

  ngOnInit(


  ): void {
  }



  states = [
    { value: 'Zulia', viewValue: 'Zulia' },
    { value: 'Falcon', viewValue: 'Falcon' },
    { value: 'Aragua', viewValue: 'Aragua' },
  ];


  addShipping() {
    if (this.state.update) {
      console.log('for update')
      this.loginService.updateShippingAddress(this.state.address).subscribe(
        (val: any) => {

          console.log('Shipping updated')
          this.loginService.shippingAddressForm.reset()

        }
      )
    }
    else {
      // this.loginService.addShipping().subscribe(
      //   val => {
      //     console.log('Shipping added')
      //     this.dialogRef.close({added: true})

      //   }
      // )

    }


  }


  onClose() {
    this.loginService.shippingAddressForm.reset()
  }









}
