import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuillReadonlyComponent } from './quill-readonly.component';

describe('QuillReadonlyComponent', () => {
  let component: QuillReadonlyComponent;
  let fixture: ComponentFixture<QuillReadonlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuillReadonlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuillReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
