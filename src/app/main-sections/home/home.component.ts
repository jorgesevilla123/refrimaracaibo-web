import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service'
import { MainSectionTemplatesComponent } from '../main-section-templates/main-section-templates.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterModule, ReactiveFormsModule, FormsModule, MainSectionTemplatesComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private service: ProductsService

  ) { }

  products: any = []

  ngOnInit(): void {
    
  
    
    

  }


}
