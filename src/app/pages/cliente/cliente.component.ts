import { Component, OnInit } from '@angular/core';
import { ModelComponent } from '../shared/ui/model/model.component';
import { clienteFormComponent } from '../cliente-form/cliente-form.component';
import { ToastrService } from 'ngx-toastr';
import { clienteService } from '../../services/cliente.service';
import { Icliente } from '../shared/models/Cliente';
@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [ModelComponent, clienteFormComponent],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss',
})
export class clienteComponent implements OnInit {
  isModelOpen = false;
  clientes: Icliente[] = [];
  cliente!: Icliente;

  constructor(
    private clienteService: clienteService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllcliente();
  }

  getAllcliente() {
    this.clienteService.getAllcliente().subscribe({
      next: (response) => {
          this.clientes = response;
      },
    });
  }

  loadcliente(cliente: Icliente) {
    this.cliente = cliente;
    this.openModel();
  }

  deletecliente(id: number) {
    this.clienteService.deletecliente(id).subscribe({
      next: (response) => {
        this.toastr.success(response);
        this.getAllcliente();
      },
    });
  }

  openModel() {
    this.isModelOpen = true;
  }

  closeModel() {
    this.isModelOpen = false;
    this.getAllcliente();
  }
}
