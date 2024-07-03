import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service' 
<<<<<<< HEAD
import { Router } from '@angular/router'
=======
import { Router } from '@angular/router';
>>>>>>> 413fc4da0141f68288c89579a17df7cde61c5cd5

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


<<<<<<< HEAD

=======
>>>>>>> 413fc4da0141f68288c89579a17df7cde61c5cd5
  route(category){
    this.router.navigate(['hogar/categorias'], {queryParams: {categoria: category, page: 1}})
  }



  getSomeProducts(){
    this.productService.getSomeProducts().subscribe(
      products => {
        this.products = products
      }
    )
  }

  




}
