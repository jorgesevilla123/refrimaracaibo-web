import { Component, OnInit, inject } from '@angular/core';
import { map } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { LoginService } from '../../services/login.service';
import { SessionService } from 'src/app/services/session.service';
import { MaterialModule } from 'src/app/material/material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MainSearchBarComponent } from '../main-search-bar/main-search-bar.component';
import { ResponsiveLayoutService } from '../../services/responsive-layout.service'






@Component({
  selector: 'app-main-toolbar',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterModule, ReactiveFormsModule, FormsModule, MainSearchBarComponent],
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.scss']
})
export class MainToolbarComponent implements OnInit {

  public products: any
  public productCount: any

  public responsiveService = inject(ResponsiveLayoutService)

  constructor(
    private productService: ProductsService,
    public cartService: CartService,
    public loginService: LoginService,
    private sessionService: SessionService
  
  
  ) { }

  ngOnInit(): void {
    this.loginService.sessionChecker()
    this.sessionService.getProfile().subscribe(
      	{
          next: (profile) => {console.log(profile),  this.loginService.selectedUser = profile.parsedProfile
          
          
          },
          error: (err) => {console.log(err)},
          complete: () => {console.log('updating count'), this.cartService.updateCount(), this.cartService.calculateTotal()}
        }
    )

    
    
    console.log('main toolbar init')
    
  }




  someFunction(){
    
  }





  



}
