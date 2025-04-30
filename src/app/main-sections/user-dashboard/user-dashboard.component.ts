import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from '../../services/login.service';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LogoutConfirmationComponent } from 'src/app/shared/logout-confirmation/logout-confirmation.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  currentChildPath: any
  currentPath: string



  

  constructor(
    public loginService: LoginService,
    public cartService: CartService,
    public route: ActivatedRoute,
    public router: Router,
    public modalService : NgbModal,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (query) => {
        this.currentPath = query.section
        console.log(this.currentPath)
      })

    this.getRouteInfo()




    console.log('Home component')
    this.loginService.checkSession().subscribe(
      val => {
        console.log(val)
      }
    )
  }



  getRouteInfo(){
    this.currentChildPath = this.route.children[0].snapshot.routeConfig.path
    console.log(this.currentChildPath)
  }


  fromChild(event){
    console.log(event)

  }

  





  logout(){
    this.loginService.setLogout().subscribe(
      {
        next: (val) => {
          console.log('user log out')
          this.loginService.selectedUser = ''
          console.log(this.loginService.selectedUser)
          this.loginService.logged = false
          this.router.navigate(['/home'])
          return true
        }
      }
    )
  }


  confirmLogout(){
    const modalRef = this.modalService.open(LogoutConfirmationComponent, {centered: true, size: 'sm'})
    modalRef.closed.subscribe({
      next: (val) => {
        if(val === 'cancel'){
          return
        }
        else {
          this.logout()
        }
        console.log(val, 'the modal is closed')
      }
    })
  }






  
}
