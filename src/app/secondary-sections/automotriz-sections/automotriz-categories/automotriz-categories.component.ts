import { FlatTreeControl } from '@angular/cdk/tree';
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
  selector: 'app-automotriz-categories',
  templateUrl: './automotriz-categories.component.html',
  styleUrls: ['./automotriz-categories.component.scss']
})
export class AutomotrizCategoriesComponent implements OnInit {
 
  //this functions are part of the tree implementation

  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  };



  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);



  category: any
  completed: boolean = false
  query: any
  resultsLength: any
  totalItems: any
  currentPage: any = 1
  products: any

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;







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
      next: (query) => this.getCategory(query.categoria),
      error: (e) => console.log(e),
      complete: () => console.log('observable completed')
    })
  }



  getCategory(category){
    this.productsService.filterCategory(category).subscribe({
      next: (res) => {this.products = res.products}
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
