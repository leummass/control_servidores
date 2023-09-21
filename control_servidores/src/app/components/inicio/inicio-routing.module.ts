import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InicioComponent } from "./inicio.component";
import { ServiciosAnadirComponent } from "./servicios-anadir/servicios-anadir.component";
import { ServiciosComponent } from "./servicios/servicios.component";
import { ServidoresAnadirComponent } from "./servidores-anadir/servidores-anadir.component";
import { ServidoresComponent } from "./servidores/servidores.component";

const routes: Routes = [
    {path: '', component: InicioComponent, children: [
        {path: 'servicios', component: ServiciosComponent},
        {path: 'anadir_servicio', component: ServiciosAnadirComponent},
        {path: 'servidores', component: ServidoresComponent},
        {path: 'anadir_servidor', component: ServidoresAnadirComponent}
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class InicioRoutingModule{

}