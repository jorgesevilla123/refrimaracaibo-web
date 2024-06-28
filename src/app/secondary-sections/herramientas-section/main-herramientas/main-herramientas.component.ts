import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service' 

@Component({
  selector: 'app-main-herramientas',
  templateUrl: './main-herramientas.component.html',
  styleUrls: ['./main-herramientas.component.scss']
})
export class MainHerramientasComponent implements OnInit {

  public products: any

  constructor(
    public productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.getSomeProducts()
  }


  route(routeName){
    console.log('showing route')

  }

  
  getSomeProducts(){
    this.productService.getSomeProducts().subscribe(
      products => {
        this.products = products
      }
    )
  }




}
