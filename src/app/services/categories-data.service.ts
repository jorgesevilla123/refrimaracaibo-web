import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})





export class CategoriesDataService {

  
aceitesMakeFilter = [
  { category_name: 'CARK', checked: false },
  { category_name: 'EMKARATE', checked: false },
  { category_name: 'EMKAROIL', checked: false },
  { category_name: 'GENETRON', checked: false },
  { category_name: 'RBV OIL', checked: false },  
]


capacitorsMakeFilter = [
  { category_name: 'CSC', checked: false },  
  { category_name: 'DEGAR', checked: false },  
  { category_name: 'GENERICO', checked: false },  
  { category_name: 'HARTLAND', checked: false },  
  { category_name: 'QE QUALITY', checked: false },  
  { category_name: 'RGC', checked: false },  
  { category_name: 'SMART ELECTRIC', checked: false },  
  { category_name: 'TGM', checked: false },  
  { category_name: 'EDISSON', checked: false },  
]

accompressorsMakeFilter = [
  { category_name: 'COPELAND', checked: false },  
  { category_name: 'DANFOSS', checked: false },  
  { category_name: 'INVOTECH', checked: false },  
  { category_name: 'LG', checked: false },  
  { category_name: 'PANASONIC', checked: false },  
  { category_name: 'SAMSUNG', checked: false },  
  { category_name: 'SANYO', checked: false },  
  { category_name: 'TOSHIBA', checked: false },  
]


  constructor() { }
}
