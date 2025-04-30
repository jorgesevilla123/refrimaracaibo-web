import { Component, OnInit} from '@angular/core';
import { ProductsService } from './services/products.service';
import { ActivatedRoute, RouterModule } from '@angular/router'
import { LoginService } from './services/login.service';
import { MainToolbarComponent } from './main-sections/main-toolbar/main-toolbar.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { RegisterToolbarComponent } from './register-toolbar/register-toolbar.component';


@Component({
  standalone: true,
  imports: [MainToolbarComponent, CommonModule, RouterModule, MaterialModule, RegisterToolbarComponent],
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
