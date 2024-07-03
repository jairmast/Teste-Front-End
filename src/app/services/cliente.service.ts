import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, Icliente } from '../pages/shared/models/Cliente';

@Injectable({
  providedIn: 'root',
})
export class clienteService {
  
  constructor(private http: HttpClient) {}


  getAllcliente(): Observable<Icliente[]> {
    return this.http.get<Icliente[]>('https://localhost:44324/api/Cliente/ObterClientes');
  }

  getcliente(id: number): Observable<ApiResponse<Icliente>> {
    let apiurl = 'https://localhost:44324/api/Cliente/ConsultarCliente';
    return this.http.get<ApiResponse<Icliente>>(`${apiurl}?id=${id}`);
  }

  createcliente(cliente: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type','application/json');
    let apiurl = 'https://localhost:44324/api/Cliente/InserirCliente';
    var objCliente : Icliente = {id : 0,nomeCliente : cliente.name, tipoEmpresa : Number(cliente.tipoEmpresa)};
    var temp2 =  this.http.post(`${apiurl}`, objCliente,{headers:headers});
    return temp2;
  }

  updatecliente(id: number, cliente: any): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type','application/json');
    let apiurl = 'https://localhost:44324/api/Cliente/AlterarCliente';
    var objCliente : Icliente = {id : id,nomeCliente : cliente.name, tipoEmpresa : Number(cliente.tipoEmpresa)};
    return this.http.put(`${apiurl}`, objCliente,{headers:headers});
  }

  deletecliente(id: number): Observable<string> {
    let apiurl = 'https://localhost:44324/api/Cliente/RemoverCliente';
    return this.http.delete<string>(`${apiurl}?id=${id}`);
  }
}
