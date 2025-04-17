import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { ProductsService } from './products.service';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  //this property defines if the search is regular or for category
  pagerSearch: string
  pager: any
  query: any
  pageName: any
  currentPage: any
  parentRouteName: string //name of the parent route coming from the categories components
  parentCategory: string //name of the main category 
  paginatorRoutePath: string //this is the path that is going to be used when routing 
  paginatorQueryParams: any

  categoryValues: any = [
    { category_name: 'AIRE ACONDICIONADO', checked: false },
    { category_name: 'AUTOMOTRIZ', checked: false },
    { category_name: 'HERRAMIENTAS', checked: false },
    { category_name: 'HOGAR', checked: false },
    { category_name: 'LAVADORA', checked: false },
    { category_name: 'NEVERA', checked: false },
    { category_name: 'SECADORA', checked: false },
  ]

  
    makeValues = [
      { category_name: '3M', checked: false },
      { category_name: '3W', checked: false },
      { category_name: 'AMERICOLD', checked: false },
      { category_name: 'ANENG', checked: false },
      { category_name: 'APPLI PARTS', checked: false },
      { category_name: 'BLACKDIAMOND', checked: false },
      { category_name: 'BLUE REFRIGERATION', checked: false },
      { category_name: 'BREAKERMATIC', checked: false },
      { category_name: 'BRISTOL', checked: false },
      { category_name: 'BULL', checked: false },
      { category_name: 'CARK', checked: false },
      { category_name: 'CASTEL', checked: false },
      { category_name: 'CHEMOURS DUPONT', checked: false },
      { category_name: 'COPELAND', checked: false },
      { category_name: 'COWPLANDT', checked: false },
      { category_name: 'CSC', checked: false },
      { category_name: 'CUBIGEL', checked: false },
      { category_name: 'DAEWOO', checked: false },
      { category_name: 'DANFOSS', checked: false },
      { category_name: 'DHEK', checked: false },
      { category_name: 'DONPER', checked: false },
      { category_name: 'DUPONT', checked: false },
      { category_name: 'DURACELL', checked: false },
      { category_name: 'EDISSON', checked: false },
      { category_name: 'ELECTROLUX', checked: false },
      { category_name: 'ELITECH', checked: false },
      { category_name: 'EMBRACO', checked: false },
      { category_name: 'EMICOL', checked: false },
      { category_name: 'EMKARATE', checked: false },
      { category_name: 'EXCELINE', checked: false },
      { category_name: 'FASCO', checked: false },
      { category_name: 'FRIGIDAIRE', checked: false },
      { category_name: 'FRIGOREX', checked: false },
      { category_name: 'FUJITSU', checked: false },
      { category_name: 'FULL GAUGE', checked: false },
      { category_name: 'GE', checked: false },
      { category_name: 'GENERICO', checked: false },
      { category_name: 'GENETRON', checked: false },
      { category_name: 'GLOBAL AC WIND', checked: false },
      { category_name: 'GLOBAL AIR', checked: false },
      { category_name: 'HAIER', checked: false },
      { category_name: 'HARRIS', checked: false },
      { category_name: 'HARTLAND', checked: false },
      { category_name: 'HC PRO', checked: false },
      { category_name: 'HONEYWELL', checked: false },
      { category_name: 'HONGSEN', checked: false },
      { category_name: 'HYPER TOUGH', checked: false },
      { category_name: 'INGCO', checked: false },
      { category_name: 'INVOTECH', checked: false },
      { category_name: "JOHNSEN'S", checked: false },
      { category_name: 'KODIAK', checked: false },
      { category_name: 'LG', checked: false },
      { category_name: 'MASI', checked: false },
      { category_name: 'MAXEL', checked: false },
      { category_name: 'MOTORVENCA', checked: false },
      { category_name: 'OSTER', checked: false },
      { category_name: 'PANASONIC', checked: false },
      { category_name: 'PARAGON', checked: false },
      { category_name: 'PEDROLLO', checked: false },
      { category_name: 'PENN', checked: false },
      { category_name: 'QE QUALITY', checked: false },
      { category_name: 'RANCO', checked: false },
      { category_name: 'RGC', checked: false },
      { category_name: 'ROBERTSHAW', checked: false },
      { category_name: 'RUN', checked: false },
      { category_name: 'SAMSUNG', checked: false },
      { category_name: 'SANDEN', checked: false },
      { category_name: 'SECOP', checked: false },
      { category_name: 'SHURTAPE', checked: false },
      { category_name: 'SIEMENS', checked: false },
      { category_name: 'STEINMANN', checked: false },
      { category_name: 'TOPFLO', checked: false },
      { category_name: 'TOSHIBA', checked: false },
      { category_name: 'UNIWELD', checked: false },
      { category_name: 'US MOTORS', checked: false },
      { category_name: 'VOLTATIC', checked: false },
      { category_name: 'WHIRLPOOL', checked: false },
      { category_name: 'WIPCOOL', checked: false },
  
    ]
  
  

  categoriesSelected: Array<any> = []





  constructor(
    private productService: ProductsService,
    private router: Router,
    public routeState: ActivatedRoute
  ) { }




  setPager(pager) {
    this.pager = pager

  }


  getPager() {
    return from([this.pager])
  }





  //we need to add dynamic url path and passing queryParams dynamically
  route(page) {
    console.log(this.query)
    console.log(this.paginatorRoutePath);
    this.paginatorQueryParams.queryParams.page = page
    // if (this.pagerSearch == 'search') {
      console.log('searching route')
      console.log(this.paginatorQueryParams)
      this.router.navigate([`${this.paginatorRoutePath}`], this.paginatorQueryParams)
      // this.productService.generalQuery(this.query, this.paginatorRoutePath).subscribe(
      //   {
      //     next: (val) => {
      //       this.pager = val
      //       console.log(this.pager)
      //       console.log(this.paginatorRoutePath)
      //       this.router.navigate([`${this.paginatorRoutePath}`], { queryParams: { q: this.query, page: page }, fragment: 'resultados' })
      //     },
      //     error: (err) => { console.log(err) },
      //     complete: () => {

      //     }

      //   }
      // )

    // }

    // else if (this.pagerSearch == 'categorias'){
    //   console.log(this.routeState.pathFromRoot)
    //   this.productService.filterCategory(this.query, page, this.parentCategory).subscribe(
    //     {next: (products) => {
    //       this.router.navigate([`/${this.parentRouteName}/categorias`], {queryParams: {categoria: this.query, page: page}})
    //       console.log(products)}}
    //   )



      // this.productService.getProductsCategory(this.pageName, page, this.pageName).subscribe(
      //   {
      //     next: (val) => {
      //       this.pager = val
      //       console.log(this.pager)
      //       this.router.navigate([`/${this.pageName}`], { queryParams: { page: page } })
      //     },
      //     error: (err) => { console.log(err) },
      //     complete: () => {

      //     }

      //   }
      // )

    // }

    // else if(this.pagerSearch === 'make'){

    // }


  }









  forwardButton() {
    if (this.query !== undefined) {
      let current = Number(this.currentPage)
      let next = current + 1
      this.productService.getProductsCategory(this.query, next, '').subscribe(
        {
          next: (val) => {
            this.currentPage = next
            this.pager = val
          },
          error: (err) => { console.log(err) },
          complete: () => {
            this.router.navigate([`/search`], { queryParams: { q: this.query, page: next } })
          }

        }
      )

    }
    else {
      let current = Number(this.currentPage)
      let next = current + 1
      console.log(this.pageName)
      this.productService.getProductsCategory(this.query, next, this.pageName).subscribe(
        {
          next: (val) => {
            this.currentPage = next
            this.pager = val
          },
          error: (err) => { console.log(err) },
          complete: () => {
            this.router.navigate([`/${this.pageName}`], { queryParams: { page: next } })
          }

        }
      )

    }


  }





  backButton() {
    if (this.query !== undefined) {
      let previousPage = this.currentPage - 1

      this.productService.getProductsCategory(this.query, previousPage, '').subscribe(
        {
          next: (val) => {
            this.currentPage = previousPage
            this.pager = val
          },
          error: (err) => { console.log(err) },
          complete: () => {
            this.router.navigate([`/search`], { queryParams: { q: this.query, page: previousPage } })
          }

        }
      )

    }
    else {
      let previousPage = this.currentPage - 1

      this.productService.getProductsCategory(this.query, previousPage, this.pageName).subscribe(
        {
          next: (val) => {
            this.currentPage = previousPage
            this.pager = val
          },
          error: (err) => { console.log(err) },
          complete: () => {
            this.router.navigate([`/${this.pageName}`], { queryParams: { page: previousPage } })
          }

        }
      )

    }

  }


}
