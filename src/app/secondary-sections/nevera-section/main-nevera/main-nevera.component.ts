import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service' 

@Component({
  selector: 'app-main-nevera',
  templateUrl: './main-nevera.component.html',
  styleUrls: ['./main-nevera.component.scss']
})
export class MainNeveraComponent implements OnInit {
  products: any

  constructor(
    public productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.getSomeProducts()

  }


  route(routeName){
    console.log(routeName)

  }

  getSomeProducts(){
    this.productService.getSomeProducts().subscribe(
      products => {
        this.products = products
      }
    )
  }




}
