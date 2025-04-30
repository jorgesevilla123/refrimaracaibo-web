import { Component, OnInit, Input } from '@angular/core';
import { PaginationService } from '../../services/pagination.service';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';







@Component({
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {


  @Input() isMobile: boolean
  @Input() pageName: any
  @Input() currentPage: any
  @Input() query: any



  pages: any





  page: number







  constructor(
    public paginationService: PaginationService,
    public router: Router,
    public productService: ProductsService,
    public routing: ActivatedRoute
  ) { }

  ngOnInit(): void {

  }



}
