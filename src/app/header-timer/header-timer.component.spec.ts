import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTimerComponent } from './header-timer.component';

describe('HeaderTimerComponent', () => {
  let component: HeaderTimerComponent;
  let fixture: ComponentFixture<HeaderTimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderTimerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
