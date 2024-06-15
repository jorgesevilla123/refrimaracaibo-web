import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-secadora',
  templateUrl: './main-secadora.component.html',
  styleUrls: ['./main-secadora.component.scss']
})
export class MainSecadoraComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  route(routeDirection){
    console.log(routeDirection)

  }

}
