import { Component, OnInit, Input } from '@angular/core';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-search-bar',
  templateUrl: './main-search-bar.component.html',
  styleUrls: ['./main-search-bar.component.scss']
})
export class MainSearchBarComponent implements OnInit {
  products:  any

  filteredProducts: any
  

  constructor(
    public productService: ProductsService,
    private router : Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productService.setProducts()
  
 
   
  

   
   


    this.filteredProducts = this.productService.searchForm.get('product')?.valueChanges.pipe(
      

      map( val => {
        if(val === ''){
          console.log('Any search')
          return
        }
        else {
          return val ? this.filterProducts(val) : this.productService.products.slice()
      

        }
       
      }),
      debounceTime(800),
    )
    
  }

  



  private filterProducts(value: any){
    console.log(value)
    const filterValue = value.toLowerCase();
    return this.productService.products.filter( (product: any) => product.title.toLowerCase().includes(filterValue) )
    

    
  }


  getProducts(){
    this.productService.getProducts().subscribe(
      val => {
        this.products = val
      }
    )
  }


  


  search(value){
    console.log(value)

    this.router.navigate(['/search'], {queryParams: { q: value, page: 1}})
  }


 


}
