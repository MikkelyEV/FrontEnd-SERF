export interface PrimaPendiente {
  id_fianza: string;
  id_oficina: number;
  nombre_fiado: string;
  tipo_movimiento: string;
  fecha_inicio: Date;
  fecha_fin: Date;
  importe: number;
  antigüedad: number;
  dias_vencidos: number;
}
