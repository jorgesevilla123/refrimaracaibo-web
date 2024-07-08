import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CartService } from '../services/cart.service'
import { HttpClient } from '@angular/common/http'
import { Observable, Subscription, from } from 'rxjs';
import { AlertService } from '../shared/alert.service';












@Injectable({
  providedIn: 'root'
})
export class LoginService {

  uri = 'http://localhost:4300/api/sessions'

  stateSelected: any

  selectedUser: any = []




  shippingAddressForm = new FormGroup({
    descripcion: new FormControl(''),
    avenida: new FormControl(''),
    calle: new FormControl(''),
    casa_apartamento: new FormControl(''),
    info_adicional: new FormControl('')
  })


  logged

  users = [
    {
      name: 'Jorge Sevilla', email: 'jsdelduca@gmail.com', password: 'jorge2784', password2: 'Jorge2784', shipping_addresses: [], cart: [],

    },
    {
      name: 'Nicole Sardi', email: 'nicoles.ardi.ns@gmail.com', password: 'miwichi', password2: 'miwichi', shipping_addresses: [], cart: [],

    }
  ]


  constructor(
    private http: HttpClient,
    private alert: AlertService


  ) { }


  setState(state) {
    console.log(state)
    this.stateSelected = state.source.value
  }



  setLogin(user) {
    return this.http.post(`${this.uri}/login`, user)
  }



  setLogout() {
    return this.http.delete(`${this.uri}/logout`).subscribe(
      {
        next: (val) => {
          this.selectedUser.pop()
          this.logged = false
          return true
        }
      }
    )
  }




  sessionChecker() {
    this.checkSession().subscribe(
      val => {
        console.log(val)
        this.logged = val.logged
      }
    )
  }




  addShipping() {
    //add validation
    let descripcion = this.shippingAddressForm.get('descripcion').value
    let avenida = this.shippingAddressForm.get('avenida').value
    let calle = this.shippingAddressForm.get('calle').value
    let casa_apartamento = this.shippingAddressForm.get('casa_apartamento').value
    let info_adicional = this.shippingAddressForm.get('info_adicional').value
    console.log(avenida, calle, casa_apartamento, info_adicional)
    let shipping = {
      descripcion: descripcion,
      avenida: avenida,
      calle: calle,
      casa_apartamento,
      info_adicional
    }

    this.selectedUser[0].shipping_addresses.push(shipping)
    return this.http.post(`${this.uri}/update-shipping`, this.selectedUser[0])
  }




  updateShippingAddress(address) {
    let descripcion = this.shippingAddressForm.get('descripcion').value
    let avenida = this.shippingAddressForm.get('avenida').value
    let calle = this.shippingAddressForm.get('calle').value
    let casa_apartamento = this.shippingAddressForm.get('casa_apartamento').value
    let info_adicional = this.shippingAddressForm.get('info_adicional').value


    let addressExists = this.selectedUser[0].shipping_addresses.some( userAddress => userAddress.descripcion === descripcion)

    if(addressExists){
      return from([{found: false}])
   

    }
    else {
      let index = this.selectedUser[0].shipping_addresses.findIndex( userAddress => userAddress.descripcion === address.descripcion)
      this.selectedUser[0].shipping_addresses[index].descripcion = descripcion
      this.selectedUser[0].shipping_addresses[index].avenida = avenida
      this.selectedUser[0].shipping_addresses[index].calle = calle
      this.selectedUser[0].shipping_addresses[index].casa_apartamento = casa_apartamento
      this.selectedUser[0].shipping_addresses[index].info_adicional = info_adicional
      
      
      
  
  
      return this.http.post(`${this.uri}/update-shipping`, this.selectedUser[0])
  

    }

    
  

   
  }












  deleteShippingAddress(user) {
    console.log(user)

    return this.http.post(`${this.uri}/update-shipping`, user)
  }










  checkSession(): Observable<any> {
    return this.http.get(`${this.uri}/check-session`)
  }




  createUser(user): Observable<any> {
    return this.http.post(`${this.uri}/create-user`, user)
  }





  populateForm(address) {
    this.shippingAddressForm.patchValue({
      descripcion: address.descripcion,
      avenida: address.avenida,
      calle: address.calle,
      casa_apartamento: address.casa_apartamento,
      info_adicional: address.info_adicional

    })

  }






}
