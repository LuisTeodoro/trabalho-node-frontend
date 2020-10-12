import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { UsuarioComponent } from './main/usuario/usuario.component';
import { LoginComponent } from './main/auth/login/login.component';
import { NovoUsuarioComponent } from './main/auth/novo-usuario/novo-usuario.component';
import { AuthModule } from './main/auth/auth.module';
import { MainModule } from './main/main.module';
import { AuthInterceptor } from './main/auth/auth.interceptor';





@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    LoginComponent,
    NovoUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    AuthModule.forRoot()
  
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
