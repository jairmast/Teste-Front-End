import { ComponentFixture, TestBed } from '@angular/core/testing';

import { clienteFormComponent } from './cliente-form.component';

describe('clienteFormComponent', () => {
  let component: clienteFormComponent;
  let fixture: ComponentFixture<clienteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [clienteFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(clienteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
