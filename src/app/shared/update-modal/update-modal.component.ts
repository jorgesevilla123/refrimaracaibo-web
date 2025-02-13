import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'






@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss']
})
export class UpdateModalComponent implements OnInit {

  formToUpdate = 'value'
  modalName = ''
  formsModal: any



  
  emailUpdateForm = new FormGroup({
    email: new FormControl('')
  })

  
  numberUpdateForm = new FormGroup({
    number: new FormControl('')
  })

  
  passwordUpdateForm = new FormGroup({
    newPassword: new FormControl(''),
    repeatPassword: new FormControl('')
  })









  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    public dialogRef: MatDialogRef<UpdateModalComponent>
  ) { 

    this.formsModal = data
   
  }

  ngOnInit(): void {
  this.formToUpdate = this.formsModal.form
    this.modalName = this.formsModal.title
  
  }


  submitDialog(){
    this.dialogRef.close({data: 'dialog confirmed'})
  }













}
