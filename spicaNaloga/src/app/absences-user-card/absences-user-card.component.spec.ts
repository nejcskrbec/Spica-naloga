import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsencesUserCardComponent } from './absences-user-card.component';

describe('AbsencesUserCardComponent', () => {
  let component: AbsencesUserCardComponent;
  let fixture: ComponentFixture<AbsencesUserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsencesUserCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbsencesUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
