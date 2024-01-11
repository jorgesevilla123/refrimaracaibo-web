import { Component, OnInit, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../../services/login.service'
import { CartService } from 'src/app/services/cart.service';
import { AlertService } from 'src/app/shared/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  
  loginForm: FormGroup = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
  })




  constructor(
    public loginService: LoginService,
    private cartService: CartService,
    private alert: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }




  submitLogin(){
    let email = this.loginForm.get('login').value
    let secret = this.loginForm.get('password').value
    console.log(email)
    console.log(secret)
    let userData = {
      email: email,
      password: secret
    }


      this.loginService.setLogin(userData).subscribe(
        {
         next:  (val: any) => {
           if(val.login){
            this.loginService.logged = true
            this.loginService.selectedUser.push(val.user)
            this.router.navigate(['/home'])
           }
           else {
            this.alert.notifySuccess('Algunos datos son incorrectos', 2000, 'top', 'center')

           }
        
         }
        }
       ) 
  






  }

}