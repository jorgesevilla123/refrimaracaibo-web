import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-aire-acondicionado',
  templateUrl: './main-aire-acondicionado.component.html',
  styleUrls: ['./main-aire-acondicionado.component.scss']
})
export class MainAireAcondicionadoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  route(routeName){
    console.log('showing route name')
  }

}
