import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { ActivatedRoute, RouterModule } from '@angular/router'
import { CartOverviewComponent } from 'src/app/main-sections/cart-overview/cart-overview.component';
import { MaterialModule } from 'src/app/material/material.module';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { PaginationService } from 'src/app/services/pagination.service';
import { ProductsService } from 'src/app/services/products.service';
import { AlertService } from 'src/app/shared/alert.service';
import { PaginationComponent } from '../../pagination/pagination.component';

@Component({
  selector: 'app-herramientas-categories',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterModule, ReactiveFormsModule, FormsModule, PaginationComponent],
  templateUrl: './herramientas-categories.component.html',
  styleUrls: ['./herramientas-categories.component.scss']
})
export class HerramientasCategoriesComponent implements OnInit {
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

  generalPagination(query, routePath){
    this.productsService.generalQuery(query, routePath).subscribe({
      next: (pager: any) => {
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


  
  
  addToCart(product) {
    product.quantity = 1
    this.cartService.addProductsToLoggedUserCart(product)
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


  removeFromCart(product) {
    this.cartService.deleteById(product)
    this.cartService.updateCount()
    this.alert.notifySuccess('Producto eliminado del carrito', 800, 'top', 'center');
  }





}
