import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service' 

@Component({
  selector: 'app-main-aire-acondicionado',
  templateUrl: './main-aire-acondicionado.component.html',
  styleUrls: ['./main-aire-acondicionado.component.scss']
})
export class MainAireAcondicionadoComponent implements OnInit {

  products: any

  constructor(
    public productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.getSomeProducts()
  }


  route(routeName){
    console.log('showing route name')
  }

  getSomeProducts(){
    this.productService.getSomeProducts().subscribe(
      products => {
        this.products = products
      }
    )
  }



}
