import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map, Observable, take } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})


export class ProductsService {

  API: any
  products: any




  searchForm: FormGroup = new FormGroup({
    product: new FormControl('')
  })




  constructor(
    public http: HttpClient
  ) { 
    this.API =  environment.PRODUCTS_API
  }



  



  getProducts(): Observable<any> {
    let api = `${this.API}/get-products`
    return this.http.get<any>(api)
  } 


  getOneProduct(id): Observable<any> {

    let api = `${this.API}/get-one-product?id=${id}`
    return this.http.get<any>(api)
  }


  filterTools(): Observable<any> {
    let api = `${this.API}/get-herramientas`
    return this.http.get<any>(api);
  }


  filterMake(filter, page): Observable<any>{
    let api = `${this.API}/general-filter?filter=${filter}&page=${page}`
    return this.http.get<any>(api);
  }

  

  getSomeProducts(): Observable<any> {
    let api = `${this.API}/get-some-products`
    return this.http.get<any>(api).pipe(take(5))
  }




  setProducts(){
    this.getProducts().subscribe(
      products => {
        this.products = products
      }
    )
  }






  searchProducts(query, page){
    let api = `${this.API}/search-products?q=${query}&page=${page}`
    return this.http.get<any>(api).pipe(
      map(productsMatch => {return productsMatch})
    )

  }




  getProductsCategory(category, page, pagename){
    let api =  `${this.API}/get-category/${category}/${page}/${pagename}`
    return this.http.get<any>(api).pipe(
      map(products => {return products})
    )
  }



  filterCategory(query, page, category){
    console.log(category)
    let searchQuery = query.toUpperCase()
    let categoryQuery = category.toUpperCase()
    let api = `${this.API}/filter?category=${categoryQuery}&q=${searchQuery}&page=${page}`
    return this.http.get<any>(api)

  }






















}
