import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Catalogo_Servicio } from 'src/app/models/catalogo_servicio.model';
import { DatosService } from 'src/app/services/datos.service';
import { PaginatorESP } from '../paginatoresp.component';
import { ServiciosAnadirComponent } from '../servicios-anadir/servicios-anadir.component';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css'],
  providers: [{provide: MatPaginatorIntl, useClass: PaginatorESP}],
})

export class ServiciosComponent implements AfterViewInit{
  displayedColumns: string[] = ['Nombre', 'UrlProduccion', 'IpProduccion', 'Dns'];
  dataSource = new MatTableDataSource<Catalogo_Servicio>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public ventana: MatDialog,private datosService:DatosService){}

  ngOnInit(){
    this.obtenerServicios();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  obtenerServicios(){
    this.datosService.getServicios().subscribe( data => {
      this.dataSource.data=data;
    })
  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  abrirVentanaAgregar(){
    const dialogRef = this.ventana.open(ServiciosAnadirComponent, {
      width: '70%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: {name: 'XD'},
    });
  }
}
