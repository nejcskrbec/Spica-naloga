import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAbsencesCardComponent } from './user-absences-card.component';

describe('UserAbsencesCardComponent', () => {
  let component: UserAbsencesCardComponent;
  let fixture: ComponentFixture<UserAbsencesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAbsencesCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAbsencesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
