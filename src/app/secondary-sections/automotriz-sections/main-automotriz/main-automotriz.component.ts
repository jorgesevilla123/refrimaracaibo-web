import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'
import { MaterialModule } from 'src/app/material/material.module';

@Component({
  selector: 'app-main-automotriz',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './main-automotriz.component.html',
  styleUrls: ['./main-automotriz.component.scss']
})
export class MainAutomotrizComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }


  route(category){

    this.router.navigate(['automotriz/categorias'], {queryParams: {q: category, categoria: 'AUTOMOTRIZ',page: 1}})
   


  }

}
