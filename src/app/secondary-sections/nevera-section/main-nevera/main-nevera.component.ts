import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-nevera',
  templateUrl: './main-nevera.component.html',
  styleUrls: ['./main-nevera.component.scss']
})
export class MainNeveraComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  route(routeName){
    console.log(routeName)

  }

}
