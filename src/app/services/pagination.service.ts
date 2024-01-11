import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { ProductsService } from './products.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
    pager: any
    query: any
    pageName: any
    currentPage: any

  constructor(
    private productService: ProductsService,
    private router: Router
  ) { }




  setPager(pager){
    this.pager = pager

  }


  getPager(){
    return from([this.pager])
  }






  route(page){
    console.log(this.query)

    if(this.query !== undefined){
      console.log('searching route')
      console.log(this.pageName, page)
      this.productService.searchProducts(this.pageName, page).subscribe(
        {
          next: (val) => {
            this.pager = val
            console.log(this.pager)
            this.router.navigate([`/search`], {queryParams: {q: this.query, page: page}})
          },
          error: (err) => {console.log(err)},
          complete: () => {
       
          }
        
        }
      )

    }

    else {
      this.productService.getProductsCategory(this.pageName, page, this.pageName).subscribe(
        {
          next: (val) => {
            this.pager = val
            console.log(this.pager)
            this.router.navigate([`/${this.pageName}`], {queryParams: { page: page}})
          },
          error: (err) => {console.log(err)},
          complete: () => {
       
          }
        
        }
      )

    }


  }






  


  forwardButton(){
    if(this.query !== undefined){
      let current = Number(this.currentPage)
      let next = current  + 1
      this.productService.getProductsCategory(this.query, next, '').subscribe(
        {
          next: (val) => {
            this.currentPage = next
            this.pager = val
          },
          error: (err) => {console.log(err)},
          complete: () => {
            this.router.navigate([`/search`], {queryParams: {q: this.query, page: next}})
          }
        
        }
      )

    }
    else {
      let current = Number(this.currentPage)
      let next = current  + 1
      console.log(this.pageName)
      this.productService.getProductsCategory(this.query, next, this.pageName).subscribe(
        {
          next: (val) => {
            this.currentPage = next
            this.pager = val
          },
          error: (err) => {console.log(err)},
          complete: () => {
            this.router.navigate([`/${this.pageName}`], {queryParams: { page: next}})
          }
        
        }
      )
      
    }
   

  }




  
  backButton(){
    if(this.query !== undefined){
      let previousPage = this.currentPage - 1
    
      this.productService.getProductsCategory(this.query, previousPage, '').subscribe(
        {
          next: (val) => {
            this.currentPage = previousPage
            this.pager = val
          },
          error: (err) => {console.log(err)},
          complete: () => {
            this.router.navigate([`/search`], {queryParams: {q: this.query, page: previousPage}})
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
          error: (err) => {console.log(err)},
          complete: () => {
            this.router.navigate([`/${this.pageName}`], {queryParams: {page: previousPage}})
          }
        
        }
      )
      
    }
   
  }


}
