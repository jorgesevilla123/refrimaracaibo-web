import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service' 
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-aire-acondicionado',
  templateUrl: './main-aire-acondicionado.component.html',
  styleUrls: ['./main-aire-acondicionado.component.scss']
})
export class MainAireAcondicionadoComponent implements OnInit {

  products: any

  constructor(
    public productService: ProductsService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getSomeProducts()
  }


  route(category){
    this.router.navigate(['aire-acondicionado/categorias'], {queryParams: {q: category, categoria: 'AIRE ACONDICIONADO',page: 1}})
  }



  getSomeProducts(){
    this.productService.getSomeProducts().subscribe(
      products => {
        this.products = products
      }
    )
  }



}
