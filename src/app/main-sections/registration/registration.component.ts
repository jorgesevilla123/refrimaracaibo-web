import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../../services/login.service'
import { AlertService } from 'src/app/shared/alert.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup = new FormGroup({
    name: new FormControl(''), 
    apellido: new FormControl(''),
    email: new FormControl(''),
    contact_phone: new FormControl(''),
    password: new FormControl(''),
    repeatPassword: new FormControl('')
  })

  loading: boolean = false

  constructor(
    public loginService: LoginService,
    public alert: AlertService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }


  register(){
    let name = this.registrationForm.get('name').value
    let apellido = this.registrationForm.get('apellido').value
    let email = this.registrationForm.get('email').value
    let contact_phone = this.registrationForm.get('contact_phone').value
    let password = this.registrationForm.get('password').value
    let repeatPassword = this.registrationForm.get('repeatPassword').value
    let newUser = {
      name: `${name} ${apellido}`,
      email: email,
      contact_phone: contact_phone,
      password: password,
      repeatPassword: repeatPassword
    }

    
    this.loginService.createUser(newUser).subscribe(
      val => {
        if(val.created){
          console.log(val)
          console.log(val.profile)
          this.loginService.setLogin(val.profile)
          this.alert.notifySuccess('Usuario creado!', 2000, 'top', 'center')
          this.loading = true
          setTimeout( () => {
            this.router.navigate(['/dashboard'])

          }, 2000)
        }
        else {
          this.alert.notifySuccess(val.message, 2000, 'top', 'center')
        }
      }
    )



  
    }




  }


