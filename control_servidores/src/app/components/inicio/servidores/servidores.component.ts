import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PaginatorESP } from '../paginatoresp.component';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ServidoresAnadirComponent } from '../servidores-anadir/servidores-anadir.component';
import { MatDialog } from '@angular/material/dialog';
import { DatosService } from 'src/app/services/datos.service';
import { Catalogo_Servidor } from 'src/app/models/catalogo_servidor.model';

@Component({
  selector: 'app-servidores',
  templateUrl: './servidores.component.html',
  styleUrls: ['./servidores.component.css'],
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorESP }],
})
export class ServidoresComponent {
  displayedColumns: string[] = ['IpProduccion', 'Nombre', 'Tipo', 'Estatus'];
  dataSource = new MatTableDataSource<Catalogo_Servidor>();
  form: FormGroup;
  nombre: string;
  peso: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  tipo_serv: any[] = [
    { value: '', viewValue: 'Todos'},
    { value: 'Tester', viewValue: 'Tester' },
    { value: 'Desarrollo', viewValue: 'Desarrollo' },
    { value: 'Produccion', viewValue: 'Produccion' },
  ];

  constructor(public ventana: MatDialog, private datosService: DatosService,
    formBuilder: FormBuilder) {
      this.dataSource.filterPredicate = ((data, filter)=> {
        const filters = JSON.parse(filter);
        const a = !filters[1].fIP || data.IpDireccion.includes(filters[1].fIP);
        const b = !filters[0].fNombre || data.Nombre.toLowerCase().includes(filters[0].fNombre);
        let c = !filters[2].fTipo;
        if(filters[2].fTipo != ''){
          c = !filters[2].fTipo || data.Tipo === filters[2].fTipo;
        }
        
        return a && b && c;
      } ) as (Catalogo_Servidor:Catalogo_Servidor, string:string) => boolean

      this.form = formBuilder.group({
        fNombre: '',
        fIP: '',
        fTipo: '',
      })
      this.form.valueChanges.subscribe(value =>{
        const filter = [{fNombre: value.fNombre}, {fIP: value.fIP}, {fTipo: value.fTipo}];
        this.dataSource.filter = JSON.stringify(filter);
      })
    }

  ngOnInit() {
    this.obtenerServidores();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  obtenerServidores() {
    const params = { nombre: '', ipdireccion: '', tipo: '' };

    this.datosService.getServidores(params).subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  abrirVentanaAgregar() {
    const dialogRef = this.ventana.open(ServidoresAnadirComponent, {
      width: '70%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: { titulo: 'Agregar servidor' },
    });
  }

  abrirVentanaEditar(servidor: Catalogo_Servidor) {
    const dialogRef = this.ventana.open(ServidoresAnadirComponent, {
      width: '70%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: { titulo: 'Editar servidor', nombre: servidor.Nombre, tipo: servidor.Tipo, descripcion: servidor.Descripcion },
    });
  }
}
