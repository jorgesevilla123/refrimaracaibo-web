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




  matchExist: boolean
  isFiltering: boolean

  categoryChips: any = []

  categoryValues: Array<any> = [
    { category_name: 'Aire acondicionado' },
    { category_name: 'Automotriz' },
    { category_name: 'Herramientas' },
    { category_name: 'Hogar' },
    { category_name: 'Lavadora' },
    { category_name: 'Nevera' },
    { category_name: 'Secadora' },
  ]










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


    this.route.queryParamMap.subscribe(
      ({ params }: any) => {
        let queryString = window.location.search;
        this.query = params.q
        this.paginationService.query = this.query
        // this.searchProducts(this.query, params.page)
        //send route path here 
        let routePath = window.location.pathname;
        this.generalPagination(queryString, routePath);

      }
    )
  }







  productDescription(id) {
    console.log(id)
    this.router.navigate(['/product-details'], { queryParams: { id: id } })
  }


  multiSelection(product, event){
    if (event.checked) {
      console.log('event checked', event.checked, product)
      // this.productsSelected.push(product);
      // console.log(this.productsSelected)
    }
    else {
      console.log('Event not checked!', event.checked,product)
      // let index = this.productsSelected.findIndex((arrayProduct) => arrayProduct._id === product._id)
      // this.productsSelected.splice(index, 1)
      // console.log(this.productsSelected)
    }

  }





  // this function does all searching 
  generalPagination(query, routePath) {
    this.productsService.generalQuery(query, routePath).subscribe({
      next: (pager: any) => {
        this.paginationService.pagerSearch = 'search'
        this.paginationService.paginatorQueryParams = pager.queryParams;
        console.log(pager);
        this.paginationService.pager = pager
        this.paginationService.query = query;
        this.paginationService.paginatorRoutePath = pager.paginatorRoute
        this.resultsLength = pager.pageOfItems.length
        this.products = pager.pageOfItems
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












}




