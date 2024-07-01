import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-main-lavadora',
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
    this.router.navigate(['lavadora/categorias'], {queryParams: {categoria: category, page: 1}})
  }





}
