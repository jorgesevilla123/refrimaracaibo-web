import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-automotriz-categories',
  templateUrl: './automotriz-categories.component.html',
  styleUrls: ['./automotriz-categories.component.scss']
})
export class AutomotrizCategoriesComponent implements OnInit {

  category: any

  constructor(
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.showRoute()
  }

  showRoute(){
    this.route.queryParams.subscribe( query => {
      this.category = query.categoria 
    })
  }

}
