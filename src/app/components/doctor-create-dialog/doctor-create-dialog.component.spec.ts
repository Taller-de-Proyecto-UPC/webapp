import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorCreateDialogComponent } from './doctor-create-dialog.component';

describe('DoctorCreateDialogComponent', () => {
  let component: DoctorCreateDialogComponent;
  let fixture: ComponentFixture<DoctorCreateDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorCreateDialogComponent]
    });
    fixture = TestBed.createComponent(DoctorCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
