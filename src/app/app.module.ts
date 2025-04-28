import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HomeComponent } from './main-sections/home/home.component';
import { MainSectionsModule } from './main-sections/main-sections.module';
import { SecondarySectionsModule } from './secondary-sections/secondary-sections.module';
import { MainToolbarComponent } from './main-sections/main-toolbar/main-toolbar.component';
import { UpdateModalComponent } from './shared/update-modal/update-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderStatusModalComponent } from './shared/order-status-modal/order-status-modal.component';
import { ConfirmationModalComponent } from './shared/confirmation-modal/confirmation-modal.component';
import { RegisterToolbarComponent } from './register-toolbar/register-toolbar.component';
import { LogoutConfirmationComponent } from './shared/logout-confirmation/logout-confirmation.component'

@NgModule({ declarations: [
        AppComponent,
        HomeComponent,
        MainToolbarComponent,
        UpdateModalComponent,
        OrderStatusModalComponent,
        ConfirmationModalComponent,
        RegisterToolbarComponent,
        LogoutConfirmationComponent
    ],
    exports: [
        MainToolbarComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MainSectionsModule,
        SecondarySectionsModule,
        NgbModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { 




  
}
