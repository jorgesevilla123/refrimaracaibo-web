import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from '../../services/login.service'

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  constructor(
    public loginService: LoginService,
    public cartService: CartService
  ) { }

  ngOnInit(): void {
  }

  





  logout(){
    
    if(this.loginService.setLogout()){
   
    }

  }

}
