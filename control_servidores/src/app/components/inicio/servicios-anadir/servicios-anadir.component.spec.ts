import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosAnadirComponent } from './servicios-anadir.component';

describe('ServiciosAnadirComponent', () => {
  let component: ServiciosAnadirComponent;
  let fixture: ComponentFixture<ServiciosAnadirComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiciosAnadirComponent]
    });
    fixture = TestBed.createComponent(ServiciosAnadirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
