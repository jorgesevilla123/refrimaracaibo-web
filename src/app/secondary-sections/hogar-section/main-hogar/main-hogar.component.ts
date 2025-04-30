import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service' 
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { PaginationComponent } from '../../pagination/pagination.component';

@Component({
  selector: 'app-main-hogar',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterModule, ReactiveFormsModule, FormsModule, PaginationComponent],
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
