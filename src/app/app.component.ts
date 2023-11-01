import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environment/environment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Oficina } from 'src/interfaces/oficina.interface';
import { PrimaPendiente } from 'src/interfaces/prima.interface';
import { DataService } from 'src/services/data.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private urlOficinas = environment.appUrl + 'oficinas/';
  private urlPrimas = environment.appUrl + 'primas_pendientes/';
  public oficinas: Oficina[] = [];
  public selectedOficina: any;
  public total = 0;
  public total_pendiente = 0;
  public total_pagado = 0;
  public porcentaje_pendiente = 0;
  public porcentaje_pagado = 0;
  public antiguedad = 0;
  public dias_vencimiento = 0;
  public displayedColumns: string[] = ['fianza', 'movimiento', 'fiado', 'antiguedad', 'dias_vencimiento', 'importe'];
  public dataSource!: MatTableDataSource<PrimaPendiente>;

  constructor(private dataSvc: DataService) {
    this.dataSource = new MatTableDataSource<PrimaPendiente>([]);
  }
  ngOnInit(): void {
    this.getOficinas();
  }

  getOficinas(){
      this.dataSvc.get<any>(this.urlOficinas).subscribe(
        res => {
          this.oficinas = res;
        },
        err => {
          console.log('Error al recuperar las oficinas', err);
        }
      );
  }

  getPrimaPorCobrar(oficina: any) {
    const url = `${this.urlPrimas}?id_oficina=${oficina}`;

    this.dataSvc.get<any>(url).subscribe(
      res => {
        this.dataSource.data = res;
        this.calculateAntique();
        this.calculateTotales();
      },
      err => {
        console.log('Error al recuperar las primas por cobrar', err);
      }
    );
  }

  calculateAntique() {
    const hoy = new Date();

    this.dataSource.data.forEach((prima: PrimaPendiente) => {
      const diferenciaInicio = Math.floor(
        Math.abs((hoy.getTime() - new Date(prima.fecha_inicio).getTime()) / (1000 * 60 * 60 * 24))
      );

      const diferenciaFin = Math.floor(
        Math.abs((hoy.getTime() - new Date(prima.fecha_fin).getTime()) / (1000 * 60 * 60 * 24))
      );

      prima.antiguedad = diferenciaInicio;
      prima.dias_vencidos = diferenciaFin;
    });
  }

  calculateTotales() {
    let totalImportes = 0;
    let totalPendiente = 0;
    let totalPagado = 0;

    this.dataSource.data.forEach(prima => {
      totalImportes += prima.importe;

      if (prima.dias_vencidos === 0) {
        totalPagado += prima.importe;
      } else {
        totalPendiente += prima.importe;
      }
    });

    this.total = totalPendiente + totalPagado;
    this.total_pendiente = totalPendiente;
    this.total_pagado = totalPagado;

    this.porcentaje_pendiente = (totalPendiente / this.total) * 100;
    this.porcentaje_pagado = (totalPagado / this.total) * 100;
  }


  changeSelectOficina(oficina: any){
    this.selectedOficina = oficina;
    this.getPrimaPorCobrar(this.selectedOficina);
  }
}

