import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service' 

@Component({
  selector: 'app-main-hogar',
  templateUrl: './main-hogar.component.html',
  styleUrls: ['./main-hogar.component.scss']
})
export class MainHogarComponent implements OnInit {

  products: any

  constructor(
    public productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.getSomeProducts()
  }


  route(routeName){
    console.log('Showing route name')

  }


  getSomeProducts(){
    this.productService.getSomeProducts().subscribe(
      products => {
        this.products = products
      }
    )
  }


}
