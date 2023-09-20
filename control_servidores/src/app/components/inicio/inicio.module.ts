import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio.component';
import { SharedModule } from 'src/app/shared-modules/shared/shared.module';
import { InicioRoutingModule } from './inicio-routing.module';



@NgModule({
  declarations: [
    InicioComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InicioRoutingModule
  ]
})
export class InicioModule { }
