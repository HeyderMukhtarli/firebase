
import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {environment} from '../environments/environment';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from '../AuthInterceptor';
import {CommonModule} from '@angular/common';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireMessagingModule} from '@angular/fire/compat/messaging';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';


export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true, // Allow multiple interceptors
    },
    provideZoneChangeDetection(),
    importProvidersFrom(
      CommonModule,
      HttpClientModule, // ✅ Correctly importing HttpClientModule
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireMessagingModule,
      AngularFireAuthModule
    )
  ]
};
