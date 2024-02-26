import { NgModule, TemplateRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BackgroundRoutingModule } from './components/background/background-routing.module';
import { BackgroundModule } from './components/background/background.module';
import { AuthGuard } from './services/auth.guard';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GlobalEffects } from './store/global.effect';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { globalReducer, userReducer } from './store/global.reducer';
import { LoadingInterceptor } from './shared/loading-interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BackgroundModule,
    BackgroundRoutingModule,
    HttpClientModule,
    EffectsModule.forRoot([GlobalEffects]),
    StoreModule.forRoot({ global: globalReducer, user: userReducer })
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
