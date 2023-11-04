import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfigService } from './app/shared/template/config/services/config.service';
import { RequestsInterceptor } from './app/core/interceptors/request-interceptor.service';

export function setSavedTheme(_configService: ConfigService) {
  return (): void => {
    const theme = _configService.getTheme();
    const scheme = _configService.getScheme();
    _configService.changeTheme(theme, scheme);
  };
}

export function setSavedFontSize(_configService: ConfigService) {
  return (): void => {
    const savedFontSize = _configService.getFontSize();
    _configService.applyScale(savedFontSize);
  };
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      HttpClientModule
    ),

    {
      provide: APP_INITIALIZER,
      useFactory: setSavedTheme,
      deps: [ConfigService],
      multi: true,
    },

    {
      provide: APP_INITIALIZER,
      useFactory: setSavedFontSize,
      deps: [ConfigService],
      multi: true,
    },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestsInterceptor,
      multi: true,
    },

    ConfirmationService,
    MessageService,
  ],
}).catch(err => console.error(err));
