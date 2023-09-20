import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Componentes
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login.service';
import { DatosService } from './services/datos.service';
import { SharedModule } from './shared-modules/shared/shared.module';
import { ServiciosComponent } from './components/inicio/servicios/servicios.component';


@NgModule({
  declarations: [AppComponent, LoginComponent,ServiciosComponent,ServiciosComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [LoginService, DatosService],
  bootstrap: [AppComponent],
})
export class AppModule {}
