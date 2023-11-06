import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorEditDialogComponent } from './doctor-edit-dialog.component';

describe('DoctorEditDialogComponent', () => {
  let component: DoctorEditDialogComponent;
  let fixture: ComponentFixture<DoctorEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorEditDialogComponent]
    });
    fixture = TestBed.createComponent(DoctorEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
