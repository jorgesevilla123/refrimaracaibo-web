import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service' 
import { Router } from '@angular/router'
@Component({
  selector: 'app-main-commercial-refri',
  templateUrl: './main-commercial-refri.component.html',
  styleUrls: ['./main-commercial-refri.component.scss']
})
export class MainCommercialRefriComponent implements OnInit {


  products: any

  constructor(
    public productService: ProductsService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getSomeProducts()
  }


  route(category){
    this.router.navigate(['refrigeracion-comercial/categorias'], {queryParams: {categoria: category, page: 1}})
  }




  getSomeProducts(){
    this.productService.getSomeProducts().subscribe(
      products => {
        this.products = products
      }
    )
  }





  

}
