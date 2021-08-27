import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCcComponent } from './register-cc.component';

describe('RegisterCcComponent', () => {
  let component: RegisterCcComponent;
  let fixture: ComponentFixture<RegisterCcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterCcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterCcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
