import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service'
import { LoginService } from '../../services/login.service'
import { AlertService } from 'src/app/shared/alert.service';
import { FormControl } from '@angular/forms'
import { getCategories, getRootCategories } from 'FOR-TEST/products-management'
import { PaginationService } from '../../services/pagination.service'
import { PaginationComponent } from '../pagination/pagination.component'
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { CartOverviewComponent } from '../../main-sections/cart-overview/cart-overview.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'






// this is the implementation of the tree shown in the filters sidenav //////////////////////////////

//////////// end of the data used for tree demonstration




@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {



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





  ngOnInit(): void {
    this.getLocalStorage()


    this.route.queryParamMap.subscribe(
      ({ params }: any) => {
        this.queryString = window.location.search;
        this.query = params.q
        this.paginationService.query = this.query
        // this.searchProducts(this.query, params.page)
        //send route path here 
        let routePath = window.location.pathname;
        this.generalPagination(this.queryString, routePath);

      }
    )
  }







  productDescription(id) {
    console.log(id)
    this.router.navigate(['/product-details'], { queryParams: { id: id } })
  }


  multiSelection(product, event){
    if (event.checked ) {
      let index = this.paginationService.categoryValues.findIndex( categoryValue => categoryValue.category_name === product )
      this.paginationService.categoryValues[index].checked = true
      this.setCategoriesInLocalStorage(this.paginationService.categoryValues);

      console.log('event checked', event.checked, product)
      this.paginationService.categoriesSelected.push(product);
      console.log(this.paginationService.categoriesSelected)
      let string = JSON.stringify(this.paginationService.categoriesSelected)

      console.log(this.paginationService.paginatorRoutePath)
      this.router.navigate([`${this.paginationService.paginatorRoutePath}`], { queryParams: {q: this.query, page: this.currentPage,categoria: string} })
      
      
      
    } 
    else if(!event.checked && this.paginationService.categoriesSelected.length == 0){
      this.router.navigate([`${this.paginationService.paginatorRoutePath}`], { queryParams: {q: this.query, page: this.currentPage} })

    }
    else if(!event.checked){
      let indexValues = this.paginationService.categoryValues.findIndex( categoryValue => categoryValue.category_name === product )
      this.paginationService.categoryValues[indexValues].checked = false
      this.setCategoriesInLocalStorage(this.paginationService.categoryValues);
      console.log('Event not checked!', event.checked,product)
      let index = this.paginationService.categoriesSelected.findIndex((arrayProduct) => arrayProduct === product)
      this.paginationService.categoriesSelected.splice(index, 1)
      let string = JSON.stringify(this.paginationService.categoriesSelected)
      this.router.navigate([`${this.paginationService.paginatorRoutePath}`], { queryParams: {q: this.query, page: this.currentPage ,categoria: string} })
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


  getLocalStorage(){
    let values = localStorage.getItem('category_values');
    if(values === null){
      return
    }else {
      console.log(values)
    let category_values = JSON.parse(values);
    this.paginationService.categoryValues = category_values;
    }

  }












}




