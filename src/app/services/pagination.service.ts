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
      { make_name: '3M', checked: false },
      { make_name: '3W', checked: false },
      { make_name: 'AMERICOLD', checked: false },
      { make_name: 'ANENG', checked: false },
      { make_name: 'APPLI PARTS', checked: false },
      { make_name: 'BLACKDIAMOND', checked: false },
      { make_name: 'BLUE REFRIGERATION', checked: false },
      { make_name: 'BREAKERMATIC', checked: false },
      { make_name: 'BRISTOL', checked: false },
      { make_name: 'BULL', checked: false },
      { make_name: 'CARK', checked: false },
      { make_name: 'CASTEL', checked: false },
      { make_name: 'CHEMOURS DUPONT', checked: false },
      { make_name: 'COPELAND', checked: false },
      { make_name: 'COWPLANDT', checked: false },
      { make_name: 'CSC', checked: false },
      { make_name: 'CUBIGEL', checked: false },
      { make_name: 'DAEWOO', checked: false },
      { make_name: 'DANFOSS', checked: false },
      { make_name: 'DHEK', checked: false },
      { make_name: 'DONPER', checked: false },
      { make_name: 'DUPONT', checked: false },
      { make_name: 'DURACELL', checked: false },
      { make_name: 'EDISSON', checked: false },
      { make_name: 'ELECTROLUX', checked: false },
      { make_name: 'ELITECH', checked: false },
      { make_name: 'EMBRACO', checked: false },
      { make_name: 'EMICOL', checked: false },
      { make_name: 'EMKARATE', checked: false },
      { make_name: 'EXCELINE', checked: false },
      { make_name: 'FASCO', checked: false },
      { make_name: 'FRIGIDAIRE', checked: false },
      { make_name: 'FRIGOREX', checked: false },
      { make_name: 'FUJITSU', checked: false },
      { make_name: 'FULL GAUGE', checked: false },
      { make_name: 'GE', checked: false },
      { make_name: 'GENERICO', checked: false },
      { make_name: 'GENETRON', checked: false },
      { make_name: 'GLOBAL AC WIND', checked: false },
      { make_name: 'GLOBAL AIR', checked: false },
      { make_name: 'HAIER', checked: false },
      { make_name: 'HARRIS', checked: false },
      { make_name: 'HARTLAND', checked: false },
      { make_name: 'HC PRO', checked: false },
      { make_name: 'HONEYWELL', checked: false },
      { make_name: 'HONGSEN', checked: false },
      { make_name: 'HYPER TOUGH', checked: false },
      { make_name: 'INGCO', checked: false },
      { make_name: 'INVOTECH', checked: false },
      { make_name: "JOHNSEN'S", checked: false },
      { make_name: 'KODIAK', checked: false },
      { make_name: 'LG', checked: false },
      { make_name: 'MASI', checked: false },
      { make_name: 'MAXEL', checked: false },
      { make_name: 'MOTORVENCA', checked: false },
      { make_name: 'OSTER', checked: false },
      { make_name: 'PANASONIC', checked: false },
      { make_name: 'PARAGON', checked: false },
      { make_name: 'PEDROLLO', checked: false },
      { make_name: 'PENN', checked: false },
      { make_name: 'QE QUALITY', checked: false },
      { make_name: 'RANCO', checked: false },
      { make_name: 'RGC', checked: false },
      { make_name: 'ROBERTSHAW', checked: false },
      { make_name: 'RUN', checked: false },
      { make_name: 'SAMSUNG', checked: false },
      { make_name: 'SANDEN', checked: false },
      { make_name: 'SECOP', checked: false },
      { make_name: 'SHURTAPE', checked: false },
      { make_name: 'SIEMENS', checked: false },
      { make_name: 'STEINMANN', checked: false },
      { make_name: 'TOPFLO', checked: false },
      { make_name: 'TOSHIBA', checked: false },
      { make_name: 'UNIWELD', checked: false },
      { make_name: 'US MOTORS', checked: false },
      { make_name: 'VOLTATIC', checked: false },
      { make_name: 'WHIRLPOOL', checked: false },
      { make_name: 'WIPCOOL', checked: false },
  
    ]



  makesSelected: Array<any> = []
  
  

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
