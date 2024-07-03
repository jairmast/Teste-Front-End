import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { Icliente } from '../shared/models/Cliente';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
import { RouterModule } from '@angular/router';
import { clienteService } from '../../services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import {MatRadioModule} from '@angular/material/radio'

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule,MatRadioModule],
  templateUrl: './cliente-form.component.html',
  styleUrl: './cliente-form.component.scss',
})
export class clienteFormComponent implements OnChanges {
  @Input() data: Icliente | null = null;
  @Output() onCloseModel = new EventEmitter();

  clienteForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clienteService: clienteService,
    private toastr: ToastrService
  ) {
    this.clienteForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      tipoEmpresa: new FormControl('', [Validators.required])
    });
  }

  onClose() {
    this.onCloseModel.emit(false);
  }

  ngOnChanges(): void {
    if (this.data) {
      this.clienteForm.patchValue({
        name: this.data.nomeCliente,
        tipoEmpresa: this.data.tipoEmpresa.toString(),
      });
    }
  }

  onSubmit() {
    if (this.clienteForm.valid) {
      if (this.data) {
        this.clienteService
          .updatecliente(this.data.id as number, this.clienteForm.value)
          .subscribe({
            next: (response: any) => {
              this.resetclienteForm();
              this.toastr.success(response);
            },
          });
      } else {
        this.clienteService.createcliente(this.clienteForm.value).subscribe({
          next: (response: any) => {
            this.resetclienteForm();
            this.toastr.success(response);
          },
        });
      }
    } else {
      this.clienteForm.markAllAsTouched();
    }
  }

  resetclienteForm() {
    this.clienteForm.reset();
    this.onClose();
  }
}
