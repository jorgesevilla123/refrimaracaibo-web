import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service' 
import { Router, RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { PaginationComponent } from '../../pagination/pagination.component';
@Component({
  selector: 'app-main-commercial-refri',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterModule, ReactiveFormsModule, FormsModule, PaginationComponent],
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
    this.router.navigate(['refrigeracion-comercial/categorias'], {queryParams: {q: category, categoria: 'REFRIGERACION COMERCIAL',page: 1}})
  }




  getSomeProducts(){
    this.productService.getSomeProducts().subscribe(
      products => {
        this.products = products
      }
    )
  }





  

}
