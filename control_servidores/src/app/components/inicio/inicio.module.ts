import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio.component';
import { SharedModule } from 'src/app/shared-modules/shared/shared.module';
import { InicioRoutingModule } from './inicio-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ServidoresComponent } from './servidores/servidores.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { ServiciosAnadirComponent } from './servicios-anadir/servicios-anadir.component';
import { ServidoresAnadirComponent } from './servidores-anadir/servidores-anadir.component';
import { VentanaAnadirIpComponent } from './servidores-anadir/ventana-anadir-ip/ventana-anadir-ip.component';



@NgModule({
  declarations: [
    InicioComponent,
    NavbarComponent,
    ServidoresComponent,
    ServiciosComponent,
    ServiciosAnadirComponent,
    ServidoresAnadirComponent,
    VentanaAnadirIpComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InicioRoutingModule
  ]
})
export class InicioModule { }
