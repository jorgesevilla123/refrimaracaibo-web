import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PaginationService } from '../../services/pagination.service'
import { PaginationComponent } from '../pagination/pagination.component'
import { CartService } from '../../services/cart.service'
import { LoginService } from '../../services/login.service'
import { AlertService } from 'src/app/shared/alert.service';
import { CartOverviewComponent } from '../../main-sections/cart-overview/cart-overview.component';
import { ProductsService } from 'src/app/services/products.service';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-lavadora-make',
  templateUrl: './lavadora-make.component.html',
  styleUrls: ['./lavadora-make.component.scss']
})
export class LavadoraMakeComponent implements OnInit {


  products: any;

  category: any;

  completed: boolean = false


  query: string;

  resultsLength: any;



  constructor(
    private router: Router,
        private route: ActivatedRoute,
        public productsService: ProductsService,
        public cartService: CartService,
        public alert: AlertService,
        public paginationService: PaginationService,
        public dialog: MatDialog,
        public loginService: LoginService

  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(
      ({ params }: any) => {
        this.query = params.filter
        this.paginationService.query = this.query
        this.getFilteredProducts(this.query, params.page)
      }
    )

  }



  getFilteredProducts(category, page){
    console.log(category, page)
    this.productsService.filterMake(category, page).subscribe({
      next: (pager) => {
        this.paginationService.pagerSearch = 'make'
        this.paginationService.pager = pager;
        this.resultsLength = pager.pageOfItems.length;
        this.products = pager.pageOfItems;
      },
      complete: () => {this.completed = true}
    })

  }





  
  addToCart(product) {

    if(this.loginService.selectedUser.cart.some(cartProducts => cartProducts._id == product._id)){
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
