import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PaginatorESP } from '../paginatoresp.component';
import { FormGroup } from '@angular/forms';
import { ServidoresAnadirComponent } from '../servidores-anadir/servidores-anadir.component';
import { MatDialog } from '@angular/material/dialog';
import { DatosService } from 'src/app/services/datos.service';
import { Catalogo_Servidor } from 'src/app/models/catalogo_servidor.model';


@Component({
  selector: 'app-servidores',
  templateUrl: './servidores.component.html',
  styleUrls: ['./servidores.component.css'],
  providers: [{provide: MatPaginatorIntl, useClass: PaginatorESP}],
})
export class ServidoresComponent {
  displayedColumns: string[] = ['IpProduccion', 'Nombre', 'Tipo', 'Estatus'];
  dataSource = new MatTableDataSource<Catalogo_Servidor>();
  form: FormGroup;
  
  tipo_serv: any[] = [
    { value: 'tipo1', viewValue: 'tipo1' },
    { value: 'tipo2', viewValue: 'tipo2' },
    { value: 'tipo3', viewValue: 'tipo3' },
  ];

  nombre:string;
  peso:string;
  constructor(public ventana: MatDialog, public datosService: DatosService){}

  ngOnInit(){
    //this.obtenerServidores();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  obtenerServidores(){
    
  }

  filtrarNombre(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  filtrarIP(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  filtrarTipo(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  abrirVentanaAgregar() {
    console.log("abrir");
    const dialogRef = this.ventana.open(ServidoresAnadirComponent, {
      width: '70%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {name: 'XD'},
    });
  }
}
