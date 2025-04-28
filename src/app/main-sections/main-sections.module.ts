import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainCartComponent } from './main-cart/main-cart.component'
import { MainSearchBarComponent } from './main-search-bar/main-search-bar.component'
import { MainToolbarComponent } from './main-toolbar/main-toolbar.component'
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { MainSectionTemplatesComponent } from './main-section-templates/main-section-templates.component';
import { BillingComponent } from './billing/billing.component';
import { ProductsModalComponent } from './products-modal/products-modal.component';
import { RegistrationComponent } from './registration/registration.component'
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field";
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { NgbRatingModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap'
import { CartOverviewComponent } from './cart-overview/cart-overview.component'
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction } from 'rxjs';
import { JsonPipe } from '@angular/common';


@NgModule({
  declarations: [
    MainCartComponent,
    MainSearchBarComponent,
    MainSectionTemplatesComponent,
    BillingComponent,
    ProductsModalComponent,
    RegistrationComponent,
    UserDashboardComponent,
    CartOverviewComponent


  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    NgbRatingModule,
    NgbCarouselModule,
    NgbTypeaheadModule,
    JsonPipe
  ],
  exports: [
   
    MainSearchBarComponent,
    MainSectionTemplatesComponent


  ]
})
export class MainSectionsModule { }
