import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServidoresAnadirComponent } from './servidores-anadir.component';

describe('ServidoresAnadirComponent', () => {
  let component: ServidoresAnadirComponent;
  let fixture: ComponentFixture<ServidoresAnadirComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServidoresAnadirComponent]
    });
    fixture = TestBed.createComponent(ServidoresAnadirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
