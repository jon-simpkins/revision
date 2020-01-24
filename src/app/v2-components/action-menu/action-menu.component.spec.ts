import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionMenuComponent } from './action-menu.component';
import { MatProgressSpinnerModule, MatListModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

describe('ActionMenuComponent', () => {
  let component: ActionMenuComponent;
  let fixture: ComponentFixture<ActionMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActionMenuComponent],
      imports: [MatProgressSpinnerModule, MatListModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
