import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaConfirmComponent } from './visa-confirm.component';

describe('VisaConfirmComponent', () => {
  let component: VisaConfirmComponent;
  let fixture: ComponentFixture<VisaConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisaConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisaConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
