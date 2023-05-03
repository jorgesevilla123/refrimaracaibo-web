import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';

import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './main-sections/home/home.component';
import { MainSectionsModule } from './main-sections/main-sections.module';
import { SecondarySectionsModule } from './secondary-sections/secondary-sections.module';
import { MainToolbarComponent } from './main-sections/main-toolbar/main-toolbar.component';
import { UpdateModalComponent } from './shared/update-modal/update-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainToolbarComponent,
    UpdateModalComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MainSectionsModule,
    SecondarySectionsModule,
    NgbModule
  ],
  exports: [
    MainToolbarComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
