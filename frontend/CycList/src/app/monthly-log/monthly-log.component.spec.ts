import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyLogComponent } from './monthly-log.component';

describe('MonthlyLogComponent', () => {
  let component: MonthlyLogComponent;
  let fixture: ComponentFixture<MonthlyLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyLogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
