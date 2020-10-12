import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthInterceptor } from './auth.interceptor';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AuthModule { 
    static forRoot(): ModuleWithProviders {
      return {
        ngModule: AuthModule,
        providers: [
          AuthInterceptor
        ]
      }
    }
 }
