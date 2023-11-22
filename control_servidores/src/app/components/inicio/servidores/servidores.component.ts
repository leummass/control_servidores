import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PaginatorESP } from '../paginatoresp.component';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ServidoresAnadirComponent } from '../servidores-anadir/servidores-anadir.component';
import { MatDialog } from '@angular/material/dialog';
import { DatosService } from 'src/app/services/datos.service';
import { Catalogo_Servidor } from 'src/app/models/catalogo_servidor.model';
import { Catalogo_DetalleServidor } from 'src/app/models/catalogo_detalleservidor.model';

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
  detalle_servidors: Catalogo_DetalleServidor[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  tipo_serv: any[] = [
    { value: '', viewValue: 'Todos' },
    { value: 'Tester', viewValue: 'Tester' },
    { value: 'Desarrollo', viewValue: 'Desarrollo' },
    { value: 'Produccion', viewValue: 'Produccion' },
    { value: 'DRP', viewValue: 'DRP'}
  ];

  constructor(
    public ventana: MatDialog,
    private datosService: DatosService,
    formBuilder: FormBuilder
  ) {
    this.dataSource.filterPredicate = ((data, filter) => {
      const filters = JSON.parse(filter);
      const a = !filters[1].fIP || data.IpDireccion.includes(filters[1].fIP);
      const b =
        !filters[0].fNombre ||
        data.Nombre.toLowerCase().includes(filters[0].fNombre);
      let c = !filters[2].fTipo;
      if (filters[2].fTipo != '') {
        c = !filters[2].fTipo || data.Tipo === filters[2].fTipo;
      }
      return a && b && c;
    }) as (Catalogo_Servidor: Catalogo_Servidor, string: string) => boolean;

    this.form = formBuilder.group({
      fNombre: '',
      fIP: '',
      fTipo: '',
    });
    this.form.valueChanges.subscribe((value) => {
      const filter = [
        { fNombre: value.fNombre },
        { fIP: value.fIP },
        { fTipo: value.fTipo },
      ];
      this.dataSource.filter = JSON.stringify(filter);
    });
  }

  ngOnInit() {
    this.obtenerServidores();
    this.obtenerDetalleServidor();
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

  obtenerDetalleServidor() {
    this.datosService.getDetalleServidor().subscribe((data) => {
      this.detalle_servidors = data;
    });
  }

  abrirVentanaAgregar() {
    const dialogRef = this.ventana.open(ServidoresAnadirComponent, {
      width: '70%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: { titulo: 'Agregar servidor',edicion:'anadir' },
    });
  }

  abrirVentanaEditar(servidor: Catalogo_Servidor) {
    let datas;
    let servidor_tester;
    let servidor_produccion;
    let servidor_desarrollo;
    let servidor_drp;
    let ip_tester = '',
      ip_produccion = '',
      ip_desarrollo = '',
      ip_drp = '';
    let detalles_servidor: Catalogo_DetalleServidor[] =
      this.retornaDetallesServidorFilter(servidor.IdServidor);
    console.log(detalles_servidor);
    if (this.detalle_servidors.length != 0) {
      servidor_tester = this.retornaDetalleServidorFilter(
        'tester',
        detalles_servidor
      );
      servidor_produccion = this.retornaDetalleServidorFilter(
        'produccion',
        detalles_servidor
      );
      servidor_desarrollo = this.retornaDetalleServidorFilter(
        'desarrollo',
        detalles_servidor
      );
      servidor_drp = this.retornaDetalleServidorFilter(
        'drp',
        detalles_servidor
      );
      if (servidor_tester != null) {
        ip_tester = servidor_tester.IpDireccion;
      }
      if (servidor_produccion != null) {
        ip_produccion = servidor_produccion.IpDireccion;
      }
      if (servidor_desarrollo != null) {
        ip_desarrollo = servidor_desarrollo.IpDireccion;
      }
      if (servidor_drp != null) {
        ip_drp = servidor_drp.IpDireccion;
      }
      datas = {
        nombre: servidor.Nombre,
        descripcion: servidor.Descripcion,
        tipo: servidor.Tipo,
        ip_des: ip_desarrollo,
        ip_test: ip_tester,
        ip_prod: ip_produccion,
        detalle_serv_prod: servidor_produccion,
        detalle_serv_test: servidor_tester,
        detalle_serv_des: servidor_desarrollo,
        detalle_serv_drp: servidor_drp,
        edicion: 'editar',
        titulo: 'Editar servidor'
      };
    }

    const dialogRef = this.ventana.open(ServidoresAnadirComponent, {
      width: '70%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      data: datas,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result != undefined){
        servidor_tester = result.detalle_servidor_des;
        servidor_produccion = result.detalle_servidor_prod;
        servidor_desarrollo = result.detalle_servidor_test;
        servidor_drp = result.detalle_servidor_drp;
        console.log('des', servidor_desarrollo);
        console.log('prod', servidor_produccion);
        console.log('test', servidor_desarrollo);
        console.log('drp', servidor_drp);
      }
    });
  }
  //Retorna el registro detalle de un servidor en base a su tipo(tester, produccion, desarrollo)
  retornaDetalleServidorFilter(
    tipo: string,
    listado_detalles: Catalogo_DetalleServidor[]
  ) {
    let servidor_coinc;
    servidor_coinc = listado_detalles.filter((obj) => {
      return obj.Tipo.toLowerCase() === tipo.toLowerCase();
    });
    if (servidor_coinc != null) {
      return servidor_coinc[0];
    }
    return null;
  }
  //Retorna los detalles de un servidor en base a su id que conecta con la tabla Catalogo_DetalleServidor
  retornaDetallesServidorFilter(IdServidor: number) {
    let servidores_coinc: Catalogo_DetalleServidor[];
    servidores_coinc = this.detalle_servidors.filter((obj) => {
      return obj.IdServidor === IdServidor;
    });

    return servidores_coinc;
  }
}
