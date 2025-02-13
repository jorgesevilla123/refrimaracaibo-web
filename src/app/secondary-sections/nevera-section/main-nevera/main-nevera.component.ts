import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service' 
import { Router } from '@angular/router'

@Component({
  selector: 'app-main-nevera',
  templateUrl: './main-nevera.component.html',
  styleUrls: ['./main-nevera.component.scss']
})
export class MainNeveraComponent implements OnInit {
  products: any

  constructor(
    public productService: ProductsService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getSomeProducts()

  }



  route(category){
    this.router.navigate(['nevera/categorias'], {queryParams: {categoria: category, page: 1}})
  }



  getSomeProducts(){
    this.productService.getSomeProducts().subscribe(
      products => {
        this.products = products
      }
    )
  }




}
