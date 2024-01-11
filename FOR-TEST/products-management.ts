import { filter, from, map, Observable } from 'rxjs'
import { productsCategory } from './database-collections-test'










export function getCategories(category_query): Observable<any>{
   let productSource = from(productsCategory)

   return productSource.pipe(
      filter( val => val.category_name === category_query)
   )
   

}


export function getRootCategories(): Observable<any>{
   let categorySource = from([productsCategory])

   return categorySource
}



