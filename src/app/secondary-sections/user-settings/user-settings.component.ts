import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service'

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  constructor(
    public loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.loginService.populateAccountDetailsForm()
    console.log(this.loginService.selectedUser[0])

  }




  updateAccountDetails(){
    
  }

}
