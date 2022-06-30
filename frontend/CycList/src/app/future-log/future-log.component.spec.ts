import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureLogComponent } from './future-log.component';

describe('FutureLogComponent', () => {
  let component: FutureLogComponent;
  let fixture: ComponentFixture<FutureLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FutureLogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FutureLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
