import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientCreateDialogComponent } from './patient-create-dialog.component';

describe('PatientCreateDialogComponent', () => {
  let component: PatientCreateDialogComponent;
  let fixture: ComponentFixture<PatientCreateDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientCreateDialogComponent]
    });
    fixture = TestBed.createComponent(PatientCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
