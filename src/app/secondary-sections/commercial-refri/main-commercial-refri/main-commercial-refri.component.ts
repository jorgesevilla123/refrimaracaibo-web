import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service' 

@Component({
  selector: 'app-main-commercial-refri',
  templateUrl: './main-commercial-refri.component.html',
  styleUrls: ['./main-commercial-refri.component.scss']
})
export class MainCommercialRefriComponent implements OnInit {


  products: any

  constructor(
    public productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.getSomeProducts()
  }

  route(routeName){
    console.log('name')

  }


  getSomeProducts(){
    this.productService.getSomeProducts().subscribe(
      products => {
        this.products = products
      }
    )
  }





  

}
