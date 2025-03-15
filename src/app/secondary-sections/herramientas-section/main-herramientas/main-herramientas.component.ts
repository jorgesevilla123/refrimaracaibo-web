import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service' 
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-herramientas',
  templateUrl: './main-herramientas.component.html',
  styleUrls: ['./main-herramientas.component.scss']
})
export class MainHerramientasComponent implements OnInit {

  public products: any

  constructor( 
    public productService: ProductsService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getSomeProducts()
  }


  route(category){
    this.router.navigate(['herramientas/categorias'], {queryParams: {q: category, categoria:'HERRAMIENTAS',page: 1}})
  }


  
  getSomeProducts(){
    this.productService.getSomeProducts().subscribe(
      products => {
        this.products = products
      }
    )
  }




}
