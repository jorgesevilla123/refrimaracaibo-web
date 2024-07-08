import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from '../../services/login.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'

@Component({
  selector: 'app-user-dashboard',
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
    public router: Router
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
    
    if(this.loginService.setLogout()){
   
    }

  }

}
