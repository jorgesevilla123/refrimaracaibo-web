



import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterModule } from '@angular/router';


@Component({
  standalone: true,
  imports: [MaterialModule, RouterModule],
  selector: 'app-main-section-templates',
  templateUrl: './main-section-templates.component.html',
  styleUrls: ['./main-section-templates.component.scss']
})



export class MainSectionTemplatesComponent implements OnInit {


  products: any


  // implement the logic for templating the sections here



  constructor(
    public productService: ProductsService
  ) { 

  
    
  }

  ngOnInit(): void {
    this.getSomeProducts()
  }



  getSomeProducts(){
    this.productService.getSomeProducts().subscribe(
      products => {
        this.products = products
      }
    )
  }

}
