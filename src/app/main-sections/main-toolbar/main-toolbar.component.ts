import { Component, OnInit, NgZone } from '@angular/core';
import { map } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { LoginService } from '../../services/login.service';
import { SessionService } from 'src/app/services/session.service';
import { MaterialModule } from 'src/app/material/material.module';







@Component({
  standalone: true,
  imports: [MaterialModule],
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.scss']
})
export class MainToolbarComponent implements OnInit {

  public products: any
  public productCount: any

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
