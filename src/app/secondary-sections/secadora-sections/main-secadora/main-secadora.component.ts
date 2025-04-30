import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'
import { MaterialModule } from 'src/app/material/material.module';

@Component({
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  selector: 'app-main-secadora',
  templateUrl: './main-secadora.component.html',
  styleUrls: ['./main-secadora.component.scss']
})
export class MainSecadoraComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }



  route(category) {
    this.router.navigate(['secadora/categorias'], { queryParams: { q: category, categoria: 'SECADORA', page: 1 } })
  }


}
