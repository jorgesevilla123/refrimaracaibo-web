import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service'
import { LoginService } from '../../services/login.service'
import { AlertService } from 'src/app/shared/alert.service';
import { FormControl } from '@angular/forms'
import { PaginationService } from '../../services/pagination.service'
import { PaginationComponent } from '../pagination/pagination.component'
import { CartOverviewComponent } from '../../main-sections/cart-overview/cart-overview.component';
import { MatDialog } from '@angular/material/dialog'






// this is the implementation of the tree shown in the filters sidenav //////////////////////////////

//////////// end of the data used for tree demonstration




@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {



  @ViewChild(CartOverviewComponent) cartDrawer: CartOverviewComponent
  @ViewChild(PaginationComponent) paginate: PaginationComponent
  products: any
  query: any
  resultsLength: any
  totalItems: any
  currentPage: any = 1
  categories: any
  commonCategories
  categoriesArr: any = []
  filters = new FormControl(null);
  isMobile: boolean
  pager: any
  completed: boolean = false
  categoriesSelectedString: string = '';
  makesSelectedString: string = '';




  queryString: any



 






  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public productsService: ProductsService,
    public cartService: CartService,
    public alert: AlertService,
    public paginationService: PaginationService,
    public dialog: MatDialog,
    public loginService: LoginService
  ) {

  }


  ngOnDestroy(): void {
    //clearing categories from localstorage
    localStorage.clear();
    console.log('component destroyed');
    //setting categories to false when exiting the component
    this.paginationService.categoryValues.forEach( (category) => category.checked = false)
    this.paginationService.categoriesSelected = []
  }









  ngOnInit(): void {
    // this.getCategoriesValuesLocalStorage();
    // this.getCategoriesSelectedLocalStorage();
    // this.getMakesSelectedLocalStorage();
    // this.getMakesValuesLocalStorage();

    this.route.queryParamMap.subscribe(
      ({ params }: any) => {
        console.log('routing')
        this.queryString = window.location.search;
        this.query = params.q
        this.paginationService.query = this.query
        // this.searchProducts(this.query, params.page)
        //send route path here 
        let routePath = window.location.pathname;
        console.log(routePath)
        this.generalPagination(this.queryString, routePath);

      }
    )
  }










  productDescription(id) {
    console.log(id)
    this.router.navigate(['/product-details'], { queryParams: { id: id } })
  }





  categoryMultiSelection(product, event){
    console.log(this.paginationService.categoriesSelected)
    if (event.checked ) {
      let index = this.paginationService.categoryValues.findIndex( categoryValue => categoryValue.category_name === product )
      this.paginationService.categoryValues[index].checked = true
      this.paginationService.categoriesSelected.push(product);
      // this.setCategoriesInLocalStorage(this.paginationService.categoryValues);
      // this.setSelectedCategoriesInLocalStorage(this.paginationService.categoriesSelected);
      this.categoriesSelectedString = JSON.stringify(this.paginationService.categoriesSelected)
      console.log(this.paginationService.paginatorRoutePath)
      this.router.navigate([`${this.paginationService.paginatorRoutePath}`], { queryParams: {q: this.query, page: this.currentPage, categoria: this.categoriesSelectedString, make: this.makesSelectedString} })
    } 
    // else if(!event.checked && this.paginationService.categoriesSelected.length == 1){
    //   let indexValues = this.paginationService.categoryValues.findIndex( categoryValue => categoryValue.category_name === product )
    //   this.paginationService.categoryValues[indexValues].checked = false
    //   let index = this.paginationService.categoriesSelected.findIndex((arrayProduct) => arrayProduct === product)
    //   this.paginationService.categoriesSelected.splice(index, 1)
    //   // this.setSelectedCategoriesInLocalStorage(this.paginationService.categoriesSelected);
    //   // this.setCategoriesInLocalStorage(this.paginationService.categoryValues);
    //   this.router.navigate([`${this.paginationService.paginatorRoutePath}`], { queryParams: {q: this.query, page: this.currentPage,categoria: this.categoriesSelectedString, make: this.makesSelectedString} })

    // }
    else if(!event.checked){
      let indexValues = this.paginationService.categoryValues.findIndex( categoryValue => categoryValue.category_name === product )
      this.paginationService.categoryValues[indexValues].checked = false
      let index = this.paginationService.categoriesSelected.findIndex((arrayProduct) => arrayProduct === product)
      this.paginationService.categoriesSelected.splice(index, 1)
      // this.setSelectedCategoriesInLocalStorage(this.paginationService.categoriesSelected);
      // this.setCategoriesInLocalStorage(this.paginationService.categoryValues);
      this.categoriesSelectedString = JSON.stringify(this.paginationService.categoriesSelected)
      this.router.navigate([`${this.paginationService.paginatorRoutePath}`], { queryParams: {q: this.query, page: this.currentPage ,categoria: this.categoriesSelectedString, make: this.makesSelectedString} })
    }
  }




  makeMultiSelection(product, event){
    console.log(this.paginationService.categoriesSelected)
    if (event.checked ) {
      let index = this.paginationService.makeValues.findIndex( makeValue => makeValue.make_name === product )
      this.paginationService.makeValues[index].checked = true
      this.paginationService.makesSelected.push(product);
      // this.setMakeInLocalStorage(this.paginationService.makeValues);
      // this.setSelectedMakesInLocalStorage(this.paginationService.makesSelected);
      this.makesSelectedString = JSON.stringify(this.paginationService.makesSelected)
      console.log(this.paginationService.paginatorRoutePath)
      this.router.navigate([`${this.paginationService.paginatorRoutePath}`], { queryParams: {q: this.query, page: this.currentPage,categoria: this.categoriesSelectedString, make: this.makesSelectedString} })
    } 
    // else if(!event.checked && this.paginationService.categoriesSelected.length == 1){
    //   let indexValues = this.paginationService.makeValues.findIndex( makeValue => makeValue.make_name === product )
    //   this.paginationService.makeValues[indexValues].checked = false
    //   let index = this.paginationService.makesSelected.findIndex((arrayProduct) => arrayProduct === product)
    //   this.paginationService.makesSelected.splice(index, 1)
    //   // this.setSelectedCategoriesInLocalStorage(this.paginationService.categoriesSelected);
    //   // this.setCategoriesInLocalStorage(this.paginationService.categoryValues);
    //   this.router.navigate([`${this.paginationService.paginatorRoutePath}`], { queryParams: {q: this.query, page: this.currentPage,categoria: this.categoriesSelectedString, make: this.makesSelectedString} })

    // }
    else if(!event.checked){
      let indexValues = this.paginationService.makeValues.findIndex( makeValue => makeValue.make_name === product )
      this.paginationService.makeValues[indexValues].checked = false
      let index = this.paginationService.makesSelected.findIndex((arrayProduct) => arrayProduct === product)
      this.paginationService.makesSelected.splice(index, 1)
      // this.setSelectedCategoriesInLocalStorage(this.paginationService.makesSelected);
      // this.setCategoriesInLocalStorage(this.paginationService.makeValues);
      this.makesSelectedString = JSON.stringify(this.paginationService.makesSelected)
      this.router.navigate([`${this.paginationService.paginatorRoutePath}`], { queryParams: {q: this.query, page: this.currentPage ,categoria: this.categoriesSelectedString, make: this.makesSelectedString} })
    }
  }






  // this function does all searching 
  generalPagination(query, routePath) {
    this.productsService.generalQuery(query, routePath).subscribe({
      next: (pager: any) => {
        this.paginationService.pagerSearch = 'search'
        this.paginationService.paginatorQueryParams = pager.queryParams;
        this.paginationService.pager = pager
        this.paginationService.query = query;
        this.paginationService.paginatorRoutePath = pager.paginatorRoute
        this.resultsLength = pager.products.length
        this.products = pager.pageOfItems
        console.log(pager)
        console.log(this.products)
        setTimeout(() => {
          this.completed = true
        }, 200)
      }
    })
  }










  //here we handle searching and creating pager setting the data to pagination service

  searchProducts(query, page) {
    this.productsService.searchProducts(query, page).subscribe(
      pager => {
        this.paginationService.pagerSearch = 'search'
        console.log(pager);
        this.paginationService.pager = pager
        this.paginationService.parentRouteName = pager.paginatorRoute
        console.log(this.paginationService.parentRouteName)
        this.resultsLength = pager.pageOfItems.length
        this.products = pager.pageOfItems
        setTimeout(() => {
          this.completed = true
        }, 200)
      }
    )
  }








  addToCart(product) {
    if (this.loginService.selectedUser.cart.some(cartProducts => cartProducts._id == product._id)) {
      console.log('product in cart')
      this.alert.notifyWarn('Ya tienes este producto en carrito', 2000, 'top', 'center')
    }
    else {


      product.quantity = 1
      this.cartService.addProductsToLoggedUserCart(product).subscribe(
        {
          next: (value) => {
            console.log(value)
          },
          complete: () => {
            this.cartService.updateCount();
            console.log(this.loginService.selectedUser.cart)
            const dialogRef = this.dialog.open(CartOverviewComponent, {
              width: '550px'
            });
            dialogRef.afterClosed().subscribe(
              () => {
                console.log('cerrado')
              }
            )

          }
        }
      )
    }
  }





  removeFromCart(product) {
    this.cartService.deleteById(product)
    this.cartService.updateCount()
    this.alert.notifySuccess('Producto eliminado del carrito', 800, 'top', 'center');
  }



  setCategoriesInLocalStorage(categoryValuesArray){
    let categoryValues = JSON.stringify(categoryValuesArray);
    console.log(categoryValues)
    localStorage.setItem('category_values', categoryValues);
    console.log('local storage set')
  }

  setMakeInLocalStorage(makeValuesArray){
    let makeValues = JSON.stringify(makeValuesArray);
    console.log(makeValues);
    localStorage.setItem('make_values', makeValues);
    console.log('local storage set for make')

  }




  getCategoriesValuesLocalStorage(){
    let categoriesValues = localStorage.getItem('category_values');
    if(categoriesValues === null){
      return
    }else {
  
    let category_values = JSON.parse(categoriesValues);
    this.paginationService.categoryValues = category_values;
    }
  }


  getMakesValuesLocalStorage(){
    let makesValues = localStorage.getItem('make_values');
    if(makesValues === null){
      return
    }else {
  
    let make_values = JSON.parse(makesValues);
    this.paginationService.makeValues = make_values;
    }
  }



  setSelectedCategoriesInLocalStorage(categoriesSelectedArray){
    let categoriesSelected = JSON.stringify(categoriesSelectedArray);
    localStorage.setItem('categories_selected', categoriesSelected);
  }



  setSelectedMakesInLocalStorage(makesSelectedArray){
    let makesSelected = JSON.stringify(makesSelectedArray);
    localStorage.setItem('makes_selected', makesSelected);
  }





  getCategoriesSelectedLocalStorage(){
    let values = localStorage.getItem('categories_selected');
    if(values === null){
      return
    }else {
      console.log(values)
    let categories_selected = JSON.parse(values);
    console.log('setting categories selected from the local storage')
    this.paginationService.categoriesSelected = categories_selected;
    }
  }

  getMakesSelectedLocalStorage(){
    let values = localStorage.getItem('makes_selected');
    if(values === null){
      return
    }else {
      console.log(values)
    let makes_selected = JSON.parse(values);
    console.log('setting categories selected from the local storage')
    this.paginationService.categoriesSelected = makes_selected;
    }

  }












}




