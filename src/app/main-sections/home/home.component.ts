import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private service: ProductsService

  ) { }

  products: any = []

  ngOnInit(): void {
    
    this.service.getProducts().subscribe(
      val => {
        this.products = val
      }
    )


    this.countProducts()

    
    

  }


  countProducts(){
    console.log(this.products.length)
  }

  

}
