import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterDetailsPageComponent } from './character-details-page.component';

describe('CharacterDetailsPageComponent', () => {
  let component: CharacterDetailsPageComponent;
  let fixture: ComponentFixture<CharacterDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
