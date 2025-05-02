import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatOptionSelectionChange } from '@angular/material/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { getCategories } from 'FOR-TEST/products-management'
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { CartOverviewComponent } from '../../main-sections/cart-overview/cart-overview.component';
import { LoginService } from '../../services/login.service';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';





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
















@Component({
  selector: 'app-automotriz-sections',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './automotriz-sections.component.html',
  styleUrls: ['./automotriz-sections.component.scss']
})
export class AutomotrizSectionsComponent implements OnInit {


  
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










  @ViewChild(CartOverviewComponent) cartDrawer: CartOverviewComponent
  @Input() data: any

  filters = new FormControl(null);
  sort = new FormControl('');
  categoryValues: Array<any> = []


  matchExist: boolean
  isFiltering: boolean
  page_name: any
  products: any
  completed: boolean = false



  sectionsToRender: any
  categories: any;
  categoryChips: any = []
  sortList = [
    'menor precio a mayor precio',
    'mayor precio a menor precio'
  ]




  sections = [
    {
      section_name: 'Iluminacion', route: "/categories", query: 'iluminacion', all_button: 'Ver toda la iluminacion', cols: 4, rowHeight: '220px'
    }

  ]

  routeData: any
  category: any
  currentPage: any
  totalItems: any
  isMobile: boolean
  pager: any
  pageName: any







  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public cartService: CartService,
    public productService: ProductsService,
    public loginService: LoginService
  ) {
    this.dataSource.data = TREE_DATA;
   }

   hasChild = (_: number, node: ExampleFlatNode) => node.expandable;







  ngOnInit(): void {
  




  }





  getProducts(category, page) {
    console.log(category)
    this.productService.getProductsCategory(category, page, 'iluminacion').subscribe(
      pager => {
        this.pager = pager
        this.sectionsToRender = pager.pageOfItems
        console.log(pager)
      }
    )

  }






  // filterCategory(value) {


  //   if (value.length === 0) {
  //     const reg = new RegExp('', 'gi');
  //     let matchedSection = this.sections_template.filter(
  //       ({ category_name }) => category_name.match(reg)
  //     )
  //     this.sectionsToRender = this.sections_template
  //   }
  //   else {


  //     let string = value.join('|')
  //     console.log(string)
  //     const reg = new RegExp(string, 'gi');
  //     let matchedSection = this.sections_template.filter(
  //       ({ category_name }) => category_name.match(reg)
  //     )
  //     console.log(matchedSection)

  //     this.sectionsToRender = matchedSection

  //   }

  //   console.log(value)



  // }



  filterByPrice(value) {

  }





  // optionHandler(value: MatOptionSelectionChange) {


  //   if (value.source.selected === false) {
  //     let index = this.categoryValues.indexOf(value.source.value.id)
  //     // prevents that the remove function is executed again when the onChangeSelection function triggers on filter deselection
  //     if (index === -1) {
  //       return
  //     }
  //     else {
  //       //removes the product filter
  //       this.remove({ id: value.source.value.id, name: value.source.value.label_value, mat_select: value })
  //     }

  //   }

  //   else {


  //     console.log(value)


  //     this.categoryChips.push({ id: value.source.value.id, name: value.source.value.label_value, mat_select: value })


  //     let label_value = value.source.value.id
  //     this.categoryValues.push(label_value)

  //     this.filter()

  //   }
  // }




  // remove(category) {
  //   console.log(category.id)
  //   console.log(this.categoryChips)

  //   let index = this.categoryChips.indexOf(category)
  //   console.log(index)
  //   this.categoryChips.splice(index, 1)

  //   let categoryIndex = this.categoryValues.indexOf(category.id)
  //   console.log(categoryIndex)
  //   this.categoryValues.splice(categoryIndex, 1)
  //   category.mat_select.source.deselect()

  //   if (this.categoryValues.length > 0) {

  //     this.filter()


  //   }
  //   else {
  //     this.isFiltering = true
  //     this.matchExist = true
  //     this.sectionsToRender = this.sections_template

  //   }






  // }





  // filter() {
  //   let filterValues = new Set(this.categoryValues)


  //   let matched = this.sections_template.filter(value =>
  //     value.category_id.some(n => filterValues.has(n))
  //   )

  //   if (matched.length === 0) {
  //     this.isFiltering = true
  //     this.matchExist = false



  //   }

  //   else {

  //     this.sectionsToRender = matched
  //     this.isFiltering = true
  //     this.matchExist = true
  //   }


  // }










  getDescription(data) {
    console.log(data)
    let route_data = JSON.stringify(data)
    let route = `/product-details/${data.category_name}?d=${route_data}`
    this.router.navigateByUrl(route)

  }





  checkCart(product) {
    let isInCart = this.loginService.selectedUser.cart.some(productFound => productFound.title === product.title)
    if (isInCart) {
      return true
    }
    else {
      return false
    }
  }




  addToCart(product) {
    product.quantity = 1
    this.cartService.addProductsToLoggedUserCart(product)
    this.cartService.updateCount();
    this.cartDrawer.open()
  }



  removeFromCart(product) {
    this.cartService.deleteById(product)
    this.checkCart(product)
    this.cartService.updateCount()
  }








}
