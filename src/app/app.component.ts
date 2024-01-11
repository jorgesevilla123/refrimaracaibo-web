import { Component, OnInit} from '@angular/core';
import { ProductsService } from './services/products.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

 

  constructor(
    private productService: ProductsService
  ){ }


  
  title = 'web';
  products: any = []




  ngOnInit(){
    console.log('main app init')


  }




}
