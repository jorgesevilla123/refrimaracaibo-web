import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-main-automotriz',
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

    this.router.navigate(['automotriz/categorias'], {queryParams: {categoria: category, page: 1}})
   


  }

}
