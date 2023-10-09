import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaAnadirIpComponent } from './ventana-anadir-ip.component';

describe('VentanaAnadirIpComponent', () => {
  let component: VentanaAnadirIpComponent;
  let fixture: ComponentFixture<VentanaAnadirIpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VentanaAnadirIpComponent]
    });
    fixture = TestBed.createComponent(VentanaAnadirIpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
