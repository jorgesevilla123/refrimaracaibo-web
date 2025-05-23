import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from '../app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { MainSectionsModule } from '../main-sections/main-sections.module';
import { LightningSectionComponent } from './lightning-section/lightning-section.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ProductsDescriptionComponent } from './products-description/products-description.component';
import { HerramientasSectionComponent } from './herramientas-section/herramientas-section.component';
import { LavadoraSectionsComponent } from './lavadora-sections/lavadora-sections.component';
import { MarcasComponent } from './marcas/marcas.component';
import { SecadoraSectionsComponent } from './secadora-sections/secadora-sections.component';
import { AutomotrizSectionsComponent } from './automotriz-sections/automotriz-sections.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { UserPurchasesComponent } from './user-purchases/user-purchases.component';
import { UsersCartComponent } from './users-cart/users-cart.component';
import { UserShippingComponent } from './user-shipping/user-shipping.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { ShippingModalComponent } from './shipping-modal/shipping-modal.component';
import { NgbRatingModule,  NgbCarouselModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { MainAutomotrizComponent } from './automotriz-sections/main-automotriz/main-automotriz.component';
import { AutomotrizCategoriesComponent } from './automotriz-sections/automotriz-categories/automotriz-categories.component';
import { MainHerramientasComponent } from './herramientas-section/main-herramientas/main-herramientas.component';
import { MainLavadoraComponent } from './lavadora-sections/main-lavadora/main-lavadora.component';
import { MainSecadoraComponent } from './secadora-sections/main-secadora/main-secadora.component';
import { MainNeveraComponent } from './nevera-section/main-nevera/main-nevera.component';
import { NeveraSectionComponent } from './nevera-section/nevera-section.component';
import { AireAcondicionadoSectionComponent } from './aire-acondicionado-section/aire-acondicionado-section.component';
import { MainAireAcondicionadoComponent } from './aire-acondicionado-section/main-aire-acondicionado/main-aire-acondicionado.component';
import { HogarSectionComponent } from './hogar-section/hogar-section.component';
import { MainHogarComponent } from './hogar-section/main-hogar/main-hogar.component';
import { CommercialRefriComponent } from './commercial-refri/commercial-refri.component';
import { MainCommercialRefriComponent } from './commercial-refri/main-commercial-refri/main-commercial-refri.component';
import { LavadoraCategoriesComponent } from './lavadora-categories/lavadora-categories.component';
import {SecadoraCategoriesComponent} from '../secondary-sections/secadora-sections/secadora-categories/secadora-categories.component';
import { NeveraCategoriesComponent } from './nevera-section/nevera-categories/nevera-categories.component';
import { CommercialRefriCategoriesComponent } from './commercial-refri/commercial-refri-categories/commercial-refri-categories.component';
import { HerramientasCategoriesComponent } from './herramientas-section/herramientas-categories/herramientas-categories.component';
import { AireAcondicionadoCategoriesComponent } from './aire-acondicionado-section/aire-acondicionado-categories/aire-acondicionado-categories.component';
import { HogarCategoriesComponent } from './hogar-section/hogar-categories/hogar-categories.component';
import { OrderDetailsComponent } from './user-account/order-details/order-details.component';
import { LavadoraMakeComponent } from './lavadora-make/lavadora-make.component'




@NgModule({
  declarations: [
    LightningSectionComponent,
    PaginationComponent,
    ProductsDescriptionComponent,
    HerramientasSectionComponent,
    LavadoraSectionsComponent,
    MarcasComponent,
    SecadoraSectionsComponent,
    AutomotrizSectionsComponent,
    SearchResultsComponent,
    UserAccountComponent,
    UserPurchasesComponent,
    UsersCartComponent,
    UserShippingComponent,
    UserSettingsComponent,
    ShippingModalComponent,
    MainAutomotrizComponent,
    AutomotrizCategoriesComponent,
    MainHerramientasComponent,
    MainLavadoraComponent,
    MainSecadoraComponent,
    MainNeveraComponent,
    NeveraSectionComponent,
    AireAcondicionadoSectionComponent,
    MainAireAcondicionadoComponent,
    HogarSectionComponent,
    MainHogarComponent,
    CommercialRefriComponent,
    MainCommercialRefriComponent,
    LavadoraCategoriesComponent,
    SecadoraCategoriesComponent,
    NeveraCategoriesComponent,
    CommercialRefriCategoriesComponent,
    HerramientasCategoriesComponent,
    AireAcondicionadoCategoriesComponent,
    HogarCategoriesComponent,
    OrderDetailsComponent,
    LavadoraMakeComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgbRatingModule,
     NgbCarouselModule,
     NgbDropdownModule
  ]
})
export class SecondarySectionsModule { }
