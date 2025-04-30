import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginService } from '../../services/login.service'
import { Router, RouterModule } from '@angular/router'
import { CartService } from 'src/app/services/cart.service';
import { MatLegacyDialog as MatDialog, MatLegacyDialogConfig as MatDialogConfig } from "@angular/material/legacy-dialog";
import { UpdateModalComponent } from '../../shared/update-modal/update-modal.component'
import { ShippingService } from 'src/app/services/shipping.service';
import { SessionService } from 'src/app/services/session.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';






@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {


  constructor(
    public loginService: LoginService,
    public router: Router,
    public cartService: CartService,
    public dialog: MatDialog,
    public shippingService: ShippingService,
    public sessionService: SessionService
  ) { }

  ngOnInit(): void {

  }


  refreshOrders() {
    this.sessionService.getProfile().subscribe({
      next: (val) => {
        this.loginService.selectedUser = val.parsedProfile
        console.log(this.loginService.selectedUser)
      }
    })

  }



  removeOrder(clientOrder) {
    let index = this.loginService.selectedUser[0].orders.findIndex((order) => order.order_id === clientOrder.order_id)
    this.loginService.selectedUser[0].orders.splice(index, 1)
    this.shippingService.updateUserProfile().subscribe(
      {
        next: value => {
          console.log('order removed')
        }
      }
    )
  }




  orderDetails(order_id) {

    this.router.navigate(['/dashboard/detalles-pedido'], { queryParams: { section: 'orders', order: order_id } })
  }



  logout() {

    if (this.loginService.setLogout()) {
      console.log('logged')
      this.cartService.updateCount()
      this.router.navigate(['/home'])
    }
  }


  openUpdateModal(title, value) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '400px'
    dialogConfig.data = { form: value, title: title }

    let dialogRef = this.dialog.open(UpdateModalComponent, dialogConfig)

    dialogRef.afterClosed().subscribe(
      val => {
        console.log(val)
      }
    )



  }

}
