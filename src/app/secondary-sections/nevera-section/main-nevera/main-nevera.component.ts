import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service' 
import { Router, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';

@Component({
  selector: 'app-main-nevera',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterModule],
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
    this.router.navigate(['nevera/categorias'], {queryParams: {q: category, categoria: 'NEVERA', page: 1}})
  }



  getSomeProducts(){
    this.productService.getSomeProducts().subscribe(
      products => {
        this.products = products
      }
    )
  }




}
