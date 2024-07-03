export interface ApiResponse<T> {
  message?: string;
  data: T;
}

export interface Icliente {
  id: number;
  nomeCliente: string;
  tipoEmpresa: number;
}
