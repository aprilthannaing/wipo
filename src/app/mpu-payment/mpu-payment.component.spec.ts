import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MPUPaymentComponent } from './mpu-payment.component';

describe('MPUPaymentComponent', () => {
  let component: MPUPaymentComponent;
  let fixture: ComponentFixture<MPUPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MPUPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MPUPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
