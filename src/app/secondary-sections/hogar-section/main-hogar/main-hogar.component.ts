import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service' 
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-hogar',
  templateUrl: './main-hogar.component.html',
  styleUrls: ['./main-hogar.component.scss']
})
export class MainHogarComponent implements OnInit {
  

  products: any

  constructor(
    public productService: ProductsService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getSomeProducts()
  }


  route(category){
    this.router.navigate(['hogar/categorias'], {queryParams: {q: category, categoria: 'HOGAR',page: 1}})
  }



  getSomeProducts(){
    this.productService.getSomeProducts().subscribe(
      products => {
        this.products = products
      }
    )
  }

  




}
