import { Component, OnInit} from '@angular/core';
import { ProductsService } from './services/products.service';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{



  showRegisterToolbar: boolean

 

  constructor(
    private productService: ProductsService,
    public route: ActivatedRoute
  ){ }


  
  title = 'web';
  products: any = []




  ngOnInit(){
    this.route.queryParamMap.subscribe({
      next: (queryParams: any) => {
        if(queryParams.params.section === 'register'){

          this.showRegisterToolbar = true

        }

      }
    })
    console.log('main app init')


  }




}
