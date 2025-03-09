


// 





import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { tns } from 'tiny-slider/src/tiny-slider';




import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import {tns} from 'tiny-slider/src/tiny-slider';


@Component({
  selector: 'app-main-section-templates',
  templateUrl: './main-section-templates.component.html',
  styleUrls: ['./main-section-templates.component.scss']
})



export class MainSectionTemplatesComponent implements OnInit, AfterViewInit {
export class MainSectionTemplatesComponent implements OnInit, AfterViewInit {

  products: any


  // implement the logic for templating the sections here



  constructor(
    public productService: ProductsService
  ) { 

  
    
  }

  ngOnInit(): void {
    this.getSomeProducts()
  }

  ngAfterViewInit(): void {
    var slider = tns({
      container: '.my-slider',
      items: 3,
      slideBy: 'page',
      autoplay: true
    });
  }


  getSomeProducts(){
    this.productService.getSomeProducts().subscribe(
      products => {
        this.products = products
      }
    )
  }

}
