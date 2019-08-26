import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNavComponent } from './edit-nav.component';

describe('EditNavComponent', () => {
  let component: EditNavComponent;
  let fixture: ComponentFixture<EditNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
