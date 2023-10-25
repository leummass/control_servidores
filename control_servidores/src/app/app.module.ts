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
import { VentanaAnadirIpComponent } from './components/servidores-anadir/ventana-anadir-ip/ventana-anadir-ip.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [AppComponent, LoginComponent, VentanaAnadirIpComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [LoginService, DatosService],
  bootstrap: [AppComponent],
})
export class AppModule {}
