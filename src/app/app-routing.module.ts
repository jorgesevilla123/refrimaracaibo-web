import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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






const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: MainCartComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: 'herramientas', component: HerramientasSectionComponent },
  { path: 'iluminacion', component: LightningSectionComponent },
  { path: 'lavadora', component: LavadoraSectionsComponent },
  { path: 'secadora', component: SecadoraSectionsComponent },
  { path: 'automotriz', component: AutomotrizSectionsComponent },
  { path: 'marcas', component: MarcasComponent },
  { path: 'pago', component: BillingComponent },
  {
    path: 'dashboard', component: UserDashboardComponent,
    children: [
      {path: '', redirectTo: 'account', pathMatch: 'full'},
      {path: 'account', component: UserAccountComponent}, 
      {path: 'purchases', component: UserPurchasesComponent}, 
      {path: 'cart', component: UsersCartComponent}, 
      {path: 'shipping', component: UserShippingComponent}, 
      {path: 'settings', component: UserSettingsComponent}, 
    ],
    canActivate: [LoginGuardGuard]


  },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'product-details/:id', component: ProductsDescriptionComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
