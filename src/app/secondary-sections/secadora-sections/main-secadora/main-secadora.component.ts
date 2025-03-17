import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
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



  route(category){
    this.router.navigate(['secadora/categorias'], {queryParams: {q: category, categoria: 'SECADORA',page: 1}})
  }


}
