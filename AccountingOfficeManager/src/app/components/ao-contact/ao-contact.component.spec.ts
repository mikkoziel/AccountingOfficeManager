import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AoContactComponent } from './ao-contact.component';

describe('AoContactComponent', () => {
  let component: AoContactComponent;
  let fixture: ComponentFixture<AoContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AoContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AoContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
