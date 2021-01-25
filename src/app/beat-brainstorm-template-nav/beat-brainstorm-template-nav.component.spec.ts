import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatBrainstormTemplateNavComponent } from './beat-brainstorm-template-nav.component';

describe('BeatBrainstormTemplateNavComponent', () => {
  let component: BeatBrainstormTemplateNavComponent;
  let fixture: ComponentFixture<BeatBrainstormTemplateNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeatBrainstormTemplateNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeatBrainstormTemplateNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
