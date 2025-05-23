import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { HomeComponent } from './main-sections/home/home.component';
import { MainCartComponent } from './main-sections/main-cart/main-cart.component';
import { AutomotrizSectionsComponent } from './secondary-sections/automotriz-sections/automotriz-sections.component';
import { HerramientasSectionComponent } from './secondary-sections/herramientas-section/herramientas-section.component';
import { LavadoraSectionsComponent } from './secondary-sections/lavadora-sections/lavadora-sections.component';
import { LightningSectionComponent } from './secondary-sections/lightning-section/lightning-section.component';
import { MarcasComponent } from './secondary-sections/marcas/marcas.component';
import { ProductsDescriptionComponent } from './secondary-sections/products-description/products-description.component';
import { SearchResultsComponent } from './secondary-sections/search-results/search-results.component';
import { SecadoraSectionsComponent } from './secondary-sections/secadora-sections/secadora-sections.component';
import { BillingComponent } from './main-sections/billing/billing.component';
import { LoginComponent } from './main-sections/login/login.component'
import { RegistrationComponent } from './main-sections/registration/registration.component'
import { UserDashboardComponent } from './main-sections/user-dashboard/user-dashboard.component'
import { UserAccountComponent } from './secondary-sections/user-account/user-account.component'
import { UserPurchasesComponent } from './secondary-sections/user-purchases/user-purchases.component'
import { UsersCartComponent } from './secondary-sections/users-cart/users-cart.component'
import { UserShippingComponent } from './secondary-sections/user-shipping/user-shipping.component';
import { UserSettingsComponent } from './secondary-sections/user-settings/user-settings.component';
import { LoginGuardGuard } from './login-guard.guard'
import { MainAutomotrizComponent } from './secondary-sections/automotriz-sections/main-automotriz/main-automotriz.component'
import { AutomotrizCategoriesComponent } from './secondary-sections/automotriz-sections/automotriz-categories/automotriz-categories.component'
import { MainHerramientasComponent } from './secondary-sections/herramientas-section/main-herramientas/main-herramientas.component'
import { MainLavadoraComponent } from './secondary-sections/lavadora-sections/main-lavadora/main-lavadora.component';
import { MainSecadoraComponent } from './secondary-sections/secadora-sections/main-secadora/main-secadora.component';
import { MainNeveraComponent } from './secondary-sections/nevera-section/main-nevera/main-nevera.component';
import { NeveraSectionComponent } from './secondary-sections/nevera-section/nevera-section.component';
import { AireAcondicionadoSectionComponent } from './secondary-sections/aire-acondicionado-section/aire-acondicionado-section.component';
import { MainAireAcondicionadoComponent } from './secondary-sections/aire-acondicionado-section/main-aire-acondicionado/main-aire-acondicionado.component';
import { HogarSectionComponent } from './secondary-sections/hogar-section/hogar-section.component';
import { MainHogarComponent } from './secondary-sections/hogar-section/main-hogar/main-hogar.component';
import { CommercialRefriComponent } from './secondary-sections/commercial-refri/commercial-refri.component';
import { MainCommercialRefriComponent } from './secondary-sections/commercial-refri/main-commercial-refri/main-commercial-refri.component';
import { LavadoraCategoriesComponent } from './secondary-sections/lavadora-categories/lavadora-categories.component';
import { SecadoraCategoriesComponent } from './secondary-sections/secadora-sections/secadora-categories/secadora-categories.component';
import { NeveraCategoriesComponent } from './secondary-sections/nevera-section/nevera-categories/nevera-categories.component';
import { CommercialRefriCategoriesComponent } from './secondary-sections/commercial-refri/commercial-refri-categories/commercial-refri-categories.component';
import { HerramientasCategoriesComponent } from './secondary-sections/herramientas-section/herramientas-categories/herramientas-categories.component';
import { AireAcondicionadoCategoriesComponent } from './secondary-sections/aire-acondicionado-section/aire-acondicionado-categories/aire-acondicionado-categories.component';
import { HogarCategoriesComponent } from './secondary-sections/hogar-section/hogar-categories/hogar-categories.component';
import { OrderDetailsComponent } from './secondary-sections/user-account/order-details/order-details.component'
import { LavadoraMakeComponent } from './secondary-sections/lavadora-make/lavadora-make.component';



//For autoscrolling in searchproducts component
const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled'
}



export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: MainCartComponent },
  { path: 'search', component: SearchResultsComponent },
  {
    path: 'aire-acondicionado', component: AireAcondicionadoSectionComponent,
    children: [
      {path: '', redirectTo: 'principal', pathMatch: 'full'},
      {path: 'principal', component: MainAireAcondicionadoComponent},
      {path: 'categorias', component: AireAcondicionadoCategoriesComponent},

    ]
  },
  {
    path: 'herramientas', component: HerramientasSectionComponent,
    children: [
      { path: '', redirectTo: 'principal', pathMatch: 'full' },
      { path: 'principal', component: MainHerramientasComponent 
        
      },
      { path: 'categorias', component: HerramientasCategoriesComponent}
    ]
  },
  { 
    path: 'hogar', component: HogarSectionComponent, 
    children: [
      {path: '', redirectTo: 'principal', pathMatch: 'full'},
      {path: 'principal', component: MainHogarComponent},
      {path: 'categorias', component: HogarCategoriesComponent},
    
    ]
  },
  {
    path: 'lavadora', component: LavadoraSectionsComponent,
    children: [
      { path: '', redirectTo: 'principal', pathMatch: 'full' },
      { path: 'principal', component: MainLavadoraComponent},
      { path: 'categorias', component:  LavadoraCategoriesComponent},
      { path: 'marcas', component: LavadoraMakeComponent}
    ]
  },
  {
    path: 'secadora', component: SecadoraSectionsComponent,
    children: [
      {path: '', redirectTo: 'principal', pathMatch: 'full'},
      {path: 'principal', component: MainSecadoraComponent},
      {path: 'categorias', component: SecadoraCategoriesComponent}
    ]
  },
  {
    path: 'nevera', component: NeveraSectionComponent,
    children: [
      {path: '', redirectTo: 'principal', pathMatch: 'full'},
      {path: 'principal', component: MainNeveraComponent},
      {path: 'categorias', component: NeveraCategoriesComponent}
    ]
  },
  {
    path: 'automotriz', component: AutomotrizSectionsComponent,
    children: [
      { path: '', redirectTo: 'principal', pathMatch: 'full' },
      { path: 'principal', component: MainAutomotrizComponent },
      { path: 'categorias', component: AutomotrizCategoriesComponent }

    ]
  },
  {
    path: 'refrigeracion-comercial', component: CommercialRefriComponent,
    children: [
      {path: '', redirectTo: 'principal', pathMatch: 'full'},
      {path: 'principal', component: MainCommercialRefriComponent},
      {path: 'categorias', component: CommercialRefriCategoriesComponent},
    ]
  }
  ,
  { path: 'marcas', component: MarcasComponent },
  { path: 'pago', component: BillingComponent },
  {
    path: 'dashboard', component: UserDashboardComponent,
    children: [
      { path: '', redirectTo: 'pedidos', pathMatch: 'full' },
      { path: 'pedidos', component: UserAccountComponent},
        
      {path: 'detalles-pedido', component: OrderDetailsComponent},


      { path: 'purchases', component: UserPurchasesComponent },
      { path: 'notificaciones', component: UsersCartComponent },
      { path: 'shipping', component: UserShippingComponent },
      { path: 'configuracion', component: UserSettingsComponent },
    ],
    canActivate: [LoginGuardGuard]


  },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'product-details', component: ProductsDescriptionComponent },

];


