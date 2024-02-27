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
import { globalReducer } from './store/global.reducer';
import { LoadingInterceptor } from './shared/loading-interceptor';
import { MedicalSpecialtiesComponent } from './components/medical-specialties/medical-specialties.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    AppComponent,
    MedicalSpecialtiesComponent,
    SnackBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BackgroundModule,
    BackgroundRoutingModule,
    HttpClientModule,
    EffectsModule.forRoot([GlobalEffects]),
    StoreModule.forRoot({ global: globalReducer }),
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule
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
