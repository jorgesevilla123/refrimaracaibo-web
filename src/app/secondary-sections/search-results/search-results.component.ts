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
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Aire acondicionado',
    children: [
      { name: 'Aceites' }, { name: 'Armaflex' }, { name: 'Aspas' },
      { name: 'Capacitores' }, { name: 'Capilares' }, { name: 'Cintas' },
      { name: 'Compresores' }, { name: 'Conexiones' }, { name: 'Filtros' },
      { name: 'Gas refrigerante' }, { name: 'Motores' }, { name: 'protectores termicos' },
      { name: 'Capacitores' }, { name: 'Capilares' }, { name: 'Cintas' },
      { name: 'Compresores' }, { name: 'Conexiones' }, { name: 'Cintas' },
    ]
    ,
  },
  {
    name: 'Automotriz',
    children: [
      { name: 'Abrazaderas' }, { name: 'Aceites' }, { name: 'Acoples' },
      { name: 'Compresores' }, { name: 'Condensasdores' }, { name: 'Conectores' },
      { name: 'Empacaduras' }, { name: 'Evaporadores' }, { name: 'Filtros' },
      { name: 'Gas' }, { name: 'Gusanillos' }, { name: 'Mangueras' },
      { name: 'Orings' }, { name: 'Motor fan' }, { name: 'Presostatos' },
      { name: 'Relays' }, { name: 'Rolineras' },
    ],
  },
  {
    name: 'Componentes electricos',
    children: [
      {
        name: 'Motores'
      }
    ]
  },
  {
    name: 'Herramientas',
    children: [
      {
        name: 'Motores'
      }
    ]
  },
  {
    name: 'Iluminacion',
    children: [
      {
        name: 'Motores'
      }
    ]
  },
  {
    name: 'Lavadora',
    children: [
      {
        name: 'Motores'
      }
    ]
  },
  {
    name: 'Nevera',
    children: [
      {
        name: 'Motores'
      }
    ]
  },
  {
    name: 'Secadora',
    children: [
      {
        name: 'Motores'
      }
    ]
  },


];


interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

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

  categoryValues: Array<any> = []










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
        this.query = params.q
        this.paginationService.query = this.query
        this.searchProducts(this.query, params.page)
      }
    )


  }


  productDescription(id){
    console.log(id)
    this.router.navigate(['/product-details'], {queryParams: {id: id}})
  }










  //here we handle searching and creating pager setting the data to pagination service

  searchProducts(query, page) {
    this.productsService.searchProducts(query, page).subscribe(
      pager => {
        this.paginationService.pagerSearch = 'search'
        this.paginationService.pager = pager
        this.resultsLength = pager.pageOfItems.length
        this.products = pager.pageOfItems
        setTimeout(() => {
          this.completed = true
        }, 200)
      }
    )
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




