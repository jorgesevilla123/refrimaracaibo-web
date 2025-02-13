import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { MatOptionSelectionChange } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getCategories } from 'FOR-TEST/products-management'
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { AlertService } from 'src/app/shared/alert.service';
import { CartOverviewComponent } from '../../main-sections/cart-overview/cart-overview.component'
import { LoginService } from '../../services/login.service'

@Component({
  selector: 'app-secadora-sections',
  templateUrl: './secadora-sections.component.html',
  styleUrls: ['./secadora-sections.component.scss']
})
export class SecadoraSectionsComponent implements OnInit {
  @ViewChild(CartOverviewComponent) cartDrawer: CartOverviewComponent
  @Input() data: any


  
  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public cartService: CartService,
    public alert: AlertService,
    public productService: ProductsService,
    public loginService: LoginService
  ) { }




  products: any
  filters = new FormControl(null);
  sort = new FormControl('');
  categoryValues: Array<any> = []


  matchExist: boolean
  isFiltering: boolean
  page_name: any

  

  sections_template: Array<any> = [
    { category_name: 'Switch secadora', category_id: [3], capacity: '12w', route: "/product-details", query: 'bombillos', img_src: '../assets/bombillo 15w.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'Correa de secadora', category_id: [1], capacity: '12w', route: "/product-details", query: 'bombillos', img_src: '../assets/bombillo 15w.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'Banda secadora', category_id: [1], capacity: '15w', route: "/product-details", query: 'dicroicos', img_src: '../assets/bombillo dicroico.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'Correa de secadora frigidaire', category_id: [1], capacity: '15w', route: "/product-details", query: 'Tubos LED', img_src: '../assets/bombillo emergencia.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'Correa de secadora ariston', category_id: [1], capacity: '12w', route: "/product-details", query: 'reflectores', img_src: '../assets/ip66.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'Ducto de secadora', category_id: [4], capacity: '12w', route: "/product-details", query: 'lamparas LED', img_src: '../assets/lampara cuadrada.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'Fieltro de secadora frigidaire', category_id: [], capacity: '15w', route: "/product-details", query: 'Lamparas empotrables', img_src: '../assets/lampara redonda.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'Fieltro de secadora whirlpool', category_id: [], capacity: '12w', route: "/product-details", query: 'Lamparas de tungsteno', img_src: '../assets/lampara tungsteno.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'Ignitor para cocina', category_id: [], capacity: '12w', route: "/product-details", query: 'Lamparas ufo', img_src: '../assets/lampara UFO.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'Kit de bobina secadora', category_id: [], capacity: '12w', route: "/product-details", query: 'reflectores', img_src: '../assets/ip66.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'Solenoide secadora', category_id: [], capacity: '15w', route: "/product-details", query: 'lamparas LED', img_src: '../assets/lampara cuadrada.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'Motor secadora', category_id: [], capacity: '12w', route: "/product-details", query: 'Lamparas empotrables', img_src: '../assets/lampara redonda.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'kit tabor de secadora', category_id: [], capacity: '9w', route: "/product-details", query: 'Lamparas de tungsteno', img_src: '../assets/lampara tungsteno.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'kit tabor de secadora', category_id: [], capacity: '9w', route: "/product-details", query: 'Lamparas de tungsteno', img_src: '../assets/lampara tungsteno.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'kit tabor de secadora', category_id: [], capacity: '9w', route: "/product-details", query: 'Lamparas de tungsteno', img_src: '../assets/lampara tungsteno.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'kit tabor de secadora', category_id: [], capacity: '9w', route: "/product-details", query: 'Lamparas de tungsteno', img_src: '../assets/lampara tungsteno.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'kit tabor de secadora', category_id: [], capacity: '9w', route: "/product-details", query: 'Lamparas de tungsteno', img_src: '../assets/lampara tungsteno.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'kit tabor de secadora', category_id: [], capacity: '9w', route: "/product-details", query: 'Lamparas de tungsteno', img_src: '../assets/lampara tungsteno.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'kit tabor de secadora', category_id: [], capacity: '9w', route: "/product-details", query: 'Lamparas de tungsteno', img_src: '../assets/lampara tungsteno.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'kit tabor de secadora', category_id: [], capacity: '9w', route: "/product-details", query: 'Lamparas de tungsteno', img_src: '../assets/lampara tungsteno.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'kit tabor de secadora', category_id: [], capacity: '9w', route: "/product-details", query: 'Lamparas de tungsteno', img_src: '../assets/lampara tungsteno.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'kit tabor de secadora', category_id: [], capacity: '9w', route: "/product-details", query: 'Lamparas de tungsteno', img_src: '../assets/lampara tungsteno.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'kit tabor de secadora', category_id: [], capacity: '9w', route: "/product-details", query: 'Lamparas de tungsteno', img_src: '../assets/lampara tungsteno.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'kit tabor de secadora', category_id: [], capacity: '9w', route: "/product-details", query: 'Lamparas de tungsteno', img_src: '../assets/lampara tungsteno.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'kit tabor de secadora', category_id: [], capacity: '9w', route: "/product-details", query: 'Lamparas de tungsteno', img_src: '../assets/lampara tungsteno.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'kit tabor de secadora', category_id: [], capacity: '9w', route: "/product-details", query: 'Lamparas de tungsteno', img_src: '../assets/lampara tungsteno.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'kit tabor de secadora', category_id: [], capacity: '9w', route: "/product-details", query: 'Lamparas de tungsteno', img_src: '../assets/lampara tungsteno.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'kit tabor de secadora', category_id: [], capacity: '9w', route: "/product-details", query: 'Lamparas de tungsteno', img_src: '../assets/lampara tungsteno.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'kit tabor de secadora', category_id: [], capacity: '9w', route: "/product-details", query: 'Lamparas de tungsteno', img_src: '../assets/lampara tungsteno.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'kit tabor de secadora', category_id: [], capacity: '9w', route: "/product-details", query: 'Lamparas de tungsteno', img_src: '../assets/lampara tungsteno.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'kit tabor de secadora', category_id: [], capacity: '9w', route: "/product-details", query: 'Lamparas de tungsteno', img_src: '../assets/lampara tungsteno.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'kit tabor de secadora', category_id: [], capacity: '9w', route: "/product-details", query: 'Lamparas de tungsteno', img_src: '../assets/lampara tungsteno.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'kit tabor de secadora', category_id: [], capacity: '9w', route: "/product-details", query: 'Lamparas de tungsteno', img_src: '../assets/lampara tungsteno.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'kit tabor de secadora', category_id: [], capacity: '9w', route: "/product-details", query: 'Lamparas de tungsteno', img_src: '../assets/lampara tungsteno.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'kit tabor de secadora', category_id: [], capacity: '9w', route: "/product-details", query: 'Lamparas de tungsteno', img_src: '../assets/lampara tungsteno.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'kit tabor de secadora', category_id: [], capacity: '9w', route: "/product-details", query: 'Lamparas de tungsteno', img_src: '../assets/lampara tungsteno.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'kit tabor de secadora', category_id: [], capacity: '9w', route: "/product-details", query: 'Lamparas de tungsteno', img_src: '../assets/lampara tungsteno.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'kit tabor de secadora', category_id: [], capacity: '9w', route: "/product-details", query: 'Lamparas de tungsteno', img_src: '../assets/lampara tungsteno.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
    { category_name: 'kit tabor de secadora', category_id: [], capacity: '9w', route: "/product-details", query: 'Lamparas de tungsteno', img_src: '../assets/lampara tungsteno.jpeg', img_w: '100px', img_h: '100px', quantity: 20 },
 
  ]

  


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
  completed: boolean = false
  
  
  
  
  
  





  ngOnInit(): void {
    this.pageName = 'secadora'

    this.isFiltering = true
    this.matchExist = true






    // getCategories('Secadora').subscribe(
    //   val => {
    //     this.categories = val.category_data
    //   }
    // )

    
    // this.route.queryParams.subscribe(
    //   val => {
    //     console.log(val)
    //     this.currentPage = val.page
    //     this.getProducts('secadora', this.currentPage),
    //     setTimeout(() => {
    //       this.completed = true

    //     }, 500)


    //   }
    // )





  }



  
  getProducts(category, page){
    console.log(category)
    this.productService.getProductsCategory(category, page, 'iluminacion').subscribe(
      pager => {
        this.pager = pager
        this.sectionsToRender = pager.pageOfItems
        console.log(pager)
      }
    )

  }






  filterCategory(value) {


    if (value.length === 0) {
      const reg = new RegExp('', 'gi');
      let matchedSection = this.sections_template.filter(
        ({ category_name }) => category_name.match(reg)
      )
      this.sectionsToRender = this.sections_template
    }
    else {


      let string = value.join('|')
      console.log(string)
      const reg = new RegExp(string, 'gi');
      let matchedSection = this.sections_template.filter(
        ({ category_name }) => category_name.match(reg)
      )
      console.log(matchedSection)

      this.sectionsToRender = matchedSection

    }

    console.log(value)



  }



  filterByPrice(value) {

  }





  optionHandler(value: MatOptionSelectionChange) {


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


      console.log(value)


      this.categoryChips.push({ id: value.source.value.id, name: value.source.value.label_value, mat_select: value })


      let label_value = value.source.value.id
      this.categoryValues.push(label_value)

      this.filter()

    }
  }




  remove(category) {
    console.log(category.id)
    console.log(this.categoryChips)

    let index = this.categoryChips.indexOf(category)
    console.log(index)
    this.categoryChips.splice(index, 1)

    let categoryIndex = this.categoryValues.indexOf(category.id)
    console.log(categoryIndex)
    this.categoryValues.splice(categoryIndex, 1)
    category.mat_select.source.deselect()

    if (this.categoryValues.length > 0) {

      this.filter()


    }
    else {
      this.isFiltering = true
      this.matchExist = true
      this.sectionsToRender = this.sections_template

    }






  }



  

  filter(){
    let filterValues = new Set(this.categoryValues)


    let matched = this.sections_template.filter( value => 
     value.category_id.some( n => filterValues.has(n))
    )

    if(matched.length === 0){
      this.isFiltering = true
      this.matchExist = false



    }

    else {
      
      this.sectionsToRender = matched
      this.isFiltering = true
      this.matchExist = true
    }
 
 
  }






  



  getDescription(data) {
    console.log(data)
    let route_data = JSON.stringify(data)
    let route = `/product-details/${data.title}?d=${route_data}`
    this.router.navigateByUrl(route)

  }



  

  checkCart(product){
    let isInCart = this.loginService.selectedUser.cart.some( productFound => productFound.title === product.title)
    if(isInCart){
      return true
    }
    else {
      return false
    }
  }



  
  addToCart(product){
    product.quantity = 1
    this.cartService.addProductsToLoggedUserCart(product)
    this.cartService.updateCount();
    this.cartDrawer.open()
 
  }



  removeFromCart(product){
    this.cartService.deleteById(product)
    this.checkCart(product)
    this.cartService.updateCount()
  
  }























}
