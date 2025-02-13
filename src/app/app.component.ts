import { Component, OnInit} from '@angular/core';
import { ProductsService } from './services/products.service';
import { ActivatedRoute } from '@angular/router'
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{



  showRegisterToolbar: boolean

 

  constructor(
    private productService: ProductsService,
    public route: ActivatedRoute,
    public loginService: LoginService
  ){ }


  
  title = 'web';
  products: any = []




  ngOnInit(){
    console.log(this.loginService.selectedUser)
    this.route.queryParamMap.subscribe({
      next: (queryParams: any) => {
        if(queryParams.params.section === 'register'){

          this.showRegisterToolbar = true

        }
        else {
          this.showRegisterToolbar = false
        }

      }
    })
    console.log('main app init')


  }




}
