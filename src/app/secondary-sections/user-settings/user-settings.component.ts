import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service'
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '../../shared/confirmation-modal/confirmation-modal.component'
import { AlertService } from '../../shared/alert.service'

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  constructor(
    public loginService: LoginService,
    public modalService : NgbModal,
    public alert: AlertService

  ) { }

  ngOnInit(): void {
    this.loginService.populateAccountDetailsForm()
    console.log(this.loginService.selectedUser[0])

  }





  openConfirmationModal(){
    const modalRef = this.modalService.open(ConfirmationModalComponent, {centered: true})
    modalRef.componentInstance.text = 'Estas seguro que quieres editar los datos?'
    modalRef.closed.subscribe({
     next: (result) => {
       if(result == 'accepted'){
         this.updateAccountDetails()
         
       }
       else {
         return 
       }
     },
     error: (err) => {console.log('There was an error opening the modal')}
   })
  }






  openDeletAccountModal(){
    const modalRef = this.modalService.open(ConfirmationModalComponent, {centered: true})
    modalRef.componentInstance.text = 'Estas seguro que quieres eliminar la cuenta?'
    modalRef.closed.subscribe({
     next: (result) => {
       if(result == 'accepted'){
      
         
       }
       else {
         return 
       }
     },
     error: (err) => {console.log('There was an error opening the modal')}
   })

  }




  updateAccountDetails(){
    this.loginService.updateAccountDetails().subscribe({
      next: (value) => {
        console.log('account details updated')
      },
      complete: () => {this.alert.notifySuccess('Detalles de cuenta actualizados!', 2000, 'top', 'center')}
    })
    
  }

}
