import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MyGalleryComponent } from './my-gallery/my-gallery.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { LightboxModule } from 'ngx-lightbox'; // https://www.npmjs.com/package/ngx-lightbox



@NgModule({
  declarations: [
    AppComponent,
    MyGalleryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule, // for later, to accept route to page
    BrowserAnimationsModule,
    MatGridListModule,
    MatToolbarModule,
    MatSelectModule,
    LightboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
