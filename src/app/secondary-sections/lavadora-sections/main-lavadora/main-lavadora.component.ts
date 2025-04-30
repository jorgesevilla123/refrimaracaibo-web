import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'
import { MainSearchBarComponent } from 'src/app/main-sections/main-search-bar/main-search-bar.component';
import { MaterialModule } from 'src/app/material/material.module';
import { PaginationComponent } from '../../pagination/pagination.component';

@Component({
  selector: 'app-main-lavadora',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterModule, ReactiveFormsModule, FormsModule, PaginationComponent, MainSearchBarComponent],
  templateUrl: './main-lavadora.component.html',
  styleUrls: ['./main-lavadora.component.scss']
})
export class MainLavadoraComponent implements OnInit {

  constructor(
    public router: Router

  ) { }

  ngOnInit(): void {
  }


  route(category){
    this.router.navigate(['lavadora/categorias'], {queryParams: {q: category, categoria: 'LAVADORA', page: 1}})
  }
 




}
