import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAbsencesModalComponent } from './edit-absences-modal.component';

describe('EditAbsencesModalComponent', () => {
  let component: EditAbsencesModalComponent;
  let fixture: ComponentFixture<EditAbsencesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAbsencesModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAbsencesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
