import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environment/environment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormField } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSpinner } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { Oficina } from 'src/interfaces/oficina.interface';
import { DataService } from 'src/services/data.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private urlOficinas = environment.appUrl + 'oficinas/';
  private urlPrimas = environment.appUrl + 'primas_pendientes/';
  public oficinas: Oficina[] = [];
  protected selectedOficina: any;
  protected showSpinner = false;
  protected total = 100;
  protected porcentaje_pendiente = 80;
  protected porcentaje_pagado = 20;
  displayedColumns: string[] = ['fianza', 'movimiento', 'fiado', 'antigüedad', 'dias_vencimiento', 'importe'];
  protected dataSource!: MatTableDataSource<any>;

  constructor(private dataSvc: DataService) {
  }
  ngOnInit(): void {
    this.getOficinas();
  }

  getOficinas(){
      this.dataSvc.get<any>(this.urlOficinas).subscribe(
        res => {
          this.oficinas = res;
          console.log(this.oficinas);
        },
        err => {
          console.log('Error al recuperar las oficinas', err);
        }
      );
  }

  getPrimaPorCobrar(oficina: any){
    console.log('prima');
    this.total= 1;
  }

  changeSelectOficina(oficina: any){
    this.getPrimaPorCobrar(oficina);
  }
}

