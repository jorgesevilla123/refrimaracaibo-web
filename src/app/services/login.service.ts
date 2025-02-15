import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../services/cart.service'
import { HttpClient } from '@angular/common/http'
import { Observable, Subscription, from } from 'rxjs';
import { AlertService } from '../shared/alert.service';
import { v4 as uuidv4 } from 'uuid';












@Injectable({
  providedIn: 'root'
})
export class LoginService {

  uri = 'http://localhost:4300/api/sessions'

  stateSelected: any

  selectedUser: any




  shippingAddressForm = new FormGroup({
    name: new FormControl(''),
    direccion: new FormControl(''),
    casa: new FormControl(''),
    infoExtra: new FormControl(''),
    isDefault: new FormControl()
  })


  


  accountDetailsForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required
    ]),
    contact_number: new FormControl('', [
      Validators.required
    ])
  })





  populateAccountDetailsForm() {
    this.accountDetailsForm.patchValue({
      name: this.selectedUser.name,
      email: this.selectedUser.email,
      contact_number: this.selectedUser.contact_phone
    })
  }


  logged: any



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
    
    return this.http.delete(`${this.uri}/logout`)
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

    let direccion = this.shippingAddressForm.value.direccion
    let casa = this.shippingAddressForm.value.casa
    let infoExtra = this.shippingAddressForm.value.infoExtra
    let isDefault = this.shippingAddressForm.value.isDefault
    if (isDefault == null) {
      isDefault = false
    }
    console.log(isDefault)
    console.log(direccion, casa, infoExtra)
    let shipping = {
      shipping_id: uuidv4(),
      direccion: direccion,
      casa: casa,
      infoExtra: infoExtra,
      isDefault: isDefault
    }
    this.selectedUser.shipping_addresses.push(shipping)
    this.shippingAddressForm.reset()
    let bodyData = {
      user: this.selectedUser,
      address: shipping
    }
    return this.http.post(`${this.uri}/add-shipping-address`, bodyData)
  }


  updateAccountDetails(){
    let name = this.accountDetailsForm.value.name
    let email = this.accountDetailsForm.value.email
    let contact_number = this.accountDetailsForm.value.contact_number
    this.selectedUser[0].name = name
    this.selectedUser[0].email = email
    this.selectedUser[0].contact_phone = contact_number
    return this.http.post(`${this.uri}/update-shipping`, this.selectedUser[0])
  }




  updateShippingAddress(address) {
  
    let direccion = this.shippingAddressForm.get('direccion').value
    let casa = this.shippingAddressForm.get('casa').value
    let infoExtra = this.shippingAddressForm.get('infoExtra').value
    let index = this.selectedUser.shipping_addresses.findIndex(userAddress => userAddress.name === address.name)
    console.log(index)
    this.selectedUser.shipping_addresses[index].direccion = direccion
    this.selectedUser.shipping_addresses[index].casa = casa
    this.selectedUser.shipping_addresses[index].infoExtra = infoExtra
    console.log(this.selectedUser)
    let bodyData = {
      user: this.selectedUser,
      address: {
        direccion: direccion,
        casa: casa,
        infoExtra: infoExtra
      }

    }
    return this.http.post(`${this.uri}/update-shipping`, bodyData)

  }




  selectDefaultAddress(addressSelected) {
    let index = this.selectedUser[0].shipping_addresses.findIndex(address => address.isDefault)
    if (index == -1) {
      console.log(index)
      console.log('not default')
      let newdefaultAddressIndex = this.selectedUser[0].shipping_addresses.findIndex(address => address.name == addressSelected.name)
      this.selectedUser[0].shipping_addresses[newdefaultAddressIndex].isDefault = true
      return this.http.post(`${this.uri}/update-shipping`, this.selectedUser[0])


    }
    else {
      this.selectedUser[0].shipping_addresses[index].isDefault = false
      let newdefaultAddressIndex = this.selectedUser[0].shipping_addresses.findIndex(address => address.name == addressSelected.name)
      this.selectedUser[0].shipping_addresses[newdefaultAddressIndex].isDefault = true
      return this.http.post(`${this.uri}/update-shipping`, this.selectedUser[0])



    }

  }












  deleteShippingAddress(user, address_id) {
    console.log(user.shipping_addresses)
    const bodyData = {
      profile: user,
      shipping_id: address_id
      

    }
    return this.http.post(`${this.uri}/remove-shipping-address`, user)
  }










  checkSession(): Observable<any> {
    return this.http.get(`${this.uri}/check-session`)
  }




  createUser(user): Observable<any> {
    return this.http.post(`${this.uri}/create-user`, user)
  }





  populateForm(address) {
    this.shippingAddressForm.patchValue({
      name: address.name,
      direccion: address.direccion,
      casa: address.casa,
      infoExtra: address.infoExtra,
      isDefault: address.isDefault
    })

  }






}
