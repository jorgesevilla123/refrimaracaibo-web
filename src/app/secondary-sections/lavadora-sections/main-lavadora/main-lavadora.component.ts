import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-lavadora',
  templateUrl: './main-lavadora.component.html',
  styleUrls: ['./main-lavadora.component.scss']
})
export class MainLavadoraComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  route(routeLink){
    console.log('you are clicking moderfoke')
  }





}
