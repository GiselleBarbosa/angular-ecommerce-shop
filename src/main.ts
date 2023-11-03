import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { ConfirmationService, MessageService } from 'primeng/api';

import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      HttpClientModule
    ),

    ConfirmationService,
    MessageService,
  ],
}).catch(err => console.error(err));
