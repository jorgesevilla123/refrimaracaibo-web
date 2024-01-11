import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service'
import { AlertService } from 'src/app/shared/alert.service';
import { FormControl } from '@angular/forms'
import { getCategories, getRootCategories } from 'FOR-TEST/products-management'
import { tap } from 'rxjs';
import { PaginationService } from '../../services/pagination.service'
import { PaginationComponent } from '../pagination/pagination.component'
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { CartOverviewComponent } from '../../main-sections/cart-overview/cart-overview.component'


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




  ///////////////////////////////////// 



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

  ) {
    this.dataSource.data = TREE_DATA;
  }

  ///////////////////////////// this function is also part of the tree
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;







  ngOnInit(): void {






    getRootCategories().subscribe(
      categories => {

        this.categories = categories
        // this.categories = val
      }
    )



    this.route.queryParamMap.subscribe(
      ({ params }: any) => {
        this.query = params.q
        this.paginationService.query = this.query
        this.searchProducts(this.query, params.page)
      }
    )






  }


  sup() {
    console.log('hllo')
  }








  //here we handle searching and creating pager setting the data to pagination service

  searchProducts(query, page) {
    this.productsService.searchProducts(query, page).subscribe(
      pager => {
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
    product.quantity = 1
    this.cartService.addProductsToLoggedUserCart(product)
    this.cartService.updateCount();
    this.cartDrawer.open()
  }





  removeFromCart(product) {
    this.cartService.deleteById(product)
    this.cartService.updateCount()
    this.alert.notifySuccess('Producto eliminado del carrito', 800, 'top', 'center');
  }


  optionHandler(value: MatOptionSelectionChange) {
    console.log(this.categoryValues)

    if (value.source.selected === false) {
      let index = this.categoryValues.indexOf(value.source.value.id)
      // prevents that the remove function is executed again when the onChangeSelection function triggers on filter deselection
      if (index === -1) {
        return
      }
      else {
        //removes the product filter
        this.remove({ id: value.source.value.id, name: value.source.value.label_value, mat_select: value })
      }

    }

    else {


      this.categoryChips.push({ id: value.source.value.id, name: value.source.value.label_value, mat_select: value })
      let label_value = value.source.value.id
      this.categoryValues.push(label_value)



      this.filter()
      this.isFiltering = true
      this.matchExist = true


    }





    // if(value.length === 0){
    //   const reg = new RegExp('', 'gi');
    //   let matchedSection = this.sections_template.filter(
    //     ({ capacity }) => capacity.match(reg)
    //   )
    //   this.sectionsToRender = this.sections_template
    // }
    // else {


    //   let string = value.join('|')
    //   console.log(string)
    //   const reg = new RegExp(string, 'gi');
    //   let matchedSection = this.sections_template.filter(
    //     ({ capacity }) => capacity.match(reg)
    //   )
    //   console.log(matchedSection)

    //   this.sectionsToRender = matchedSection

    // }

  }

  remove(category) {

    let index = this.categoryChips.indexOf(category)

    this.categoryChips.splice(index, 1)

    let categoryIndex = this.categoryValues.indexOf(category.id)

    this.categoryValues.splice(categoryIndex, 1)


    category.mat_select.source.deselect()


    if (this.categoryValues.length > 0) {

      this.filter()

    }
    else {
      this.isFiltering = true
      this.matchExist = true
      this.products = this.products

    }


  }




  filter() {
    let filterValues = new Set(this.categoryValues)
    console.log(filterValues)


    // let matched = this.sections_template.filter(value =>
    //   value.category_id.some(n => filterValues.has(n))
    // )

    // if (matched.length === 0) {
    //   this.isFiltering = true
    //   this.matchExist = false
    // }

    // else {

    //   this.products = matched
    //   this.isFiltering = true
    //   this.matchExist = true
    // }
  }















}




