import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ActivatedRoute } from '@angular/router'
import { CartOverviewComponent } from 'src/app/main-sections/cart-overview/cart-overview.component';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { PaginationService } from 'src/app/services/pagination.service';
import { ProductsService } from 'src/app/services/products.service';
import { AlertService } from 'src/app/shared/alert.service';


@Component({
  selector: 'app-aire-acondicionado-categories',
  templateUrl: './aire-acondicionado-categories.component.html',
  styleUrls: ['./aire-acondicionado-categories.component.scss']
})
export class AireAcondicionadoCategoriesComponent implements OnInit {
  category: any
  completed: boolean = false
  query: any
  resultsLength: any
  totalItems: any
  currentPage: any = 1
  products: any


  constructor(
    public route: ActivatedRoute,
    public productsService: ProductsService,
    public cartService: CartService,
    public alert: AlertService,
    public paginationService: PaginationService,
    public dialog: MatDialog,
    public loginService: LoginService,
   
  ) { }

  ngOnInit(): void {
    this.showRoute()
  }

  
  showRoute(){
    this.route.queryParams.subscribe({
      next: (query) => {
        this.category = query.categoria
        this.getCategory(query.categoria, query.page
          )},
      error: (e) => console.log(e),
      complete: () => console.log('observable   ')
    })
  }

  getCategory(category, page){
    console.log(page)
    this.productsService.filterCategory(category, page, 'AIRE ACONDICIONADO').subscribe({
      next: (res) => {
        let parentRoute = this.route.parent.snapshot.routeConfig.path
          this.paginationService.parentCategory = 'AIRE ACONDICIONADO'
        this.paginationService.parentRouteName = parentRoute
        this.paginationService.query = category
        this.paginationService.pagerSearch = 'categorias'
        this.paginationService.pager = res
        this.resultsLength = res.pageOfItems.length
        this.products = res.pageOfItems
        console.log(res)
      },
      complete: () => {this.completed = true}
    })

  }

  
  
  addToCart(product) {
    product.quantity = 1
    this.cartService.addProductsToLoggedUserCart(product)
    this.cartService.updateCount();
    console.log(this.loginService.selectedUser[0].cart)


    const dialogRef = this.dialog.open(CartOverviewComponent, {
      width: '550px'
    });


    dialogRef.afterClosed().subscribe(
      () => {
        console.log('cerrado')
      }
    )
  }


  removeFromCart(product) {
    this.cartService.deleteById(product)
    this.cartService.updateCount()
    this.alert.notifySuccess('Producto eliminado del carrito', 800, 'top', 'center');
  }





}
