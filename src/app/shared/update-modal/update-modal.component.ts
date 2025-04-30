import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef} from '@angular/material/legacy-dialog'
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';






@Component({
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterModule, ReactiveFormsModule],
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
