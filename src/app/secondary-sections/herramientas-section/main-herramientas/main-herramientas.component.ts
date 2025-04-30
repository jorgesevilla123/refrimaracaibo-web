import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/products.service' 
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { PaginationComponent } from '../../pagination/pagination.component';

@Component({
  selector: 'app-main-herramientas',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterModule, ReactiveFormsModule, FormsModule, PaginationComponent],
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
