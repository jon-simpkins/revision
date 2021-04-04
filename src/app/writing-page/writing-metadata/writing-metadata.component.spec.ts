import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WritingMetadataComponent } from './writing-metadata.component';

describe('WritingMetadataComponent', () => {
  let component: WritingMetadataComponent;
  let fixture: ComponentFixture<WritingMetadataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WritingMetadataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WritingMetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
