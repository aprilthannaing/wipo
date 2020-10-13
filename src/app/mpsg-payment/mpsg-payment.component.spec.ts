import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpsgPaymentComponent } from './mpsg-payment.component';

describe('MpsgPaymentComponent', () => {
  let component: MpsgPaymentComponent;
  let fixture: ComponentFixture<MpsgPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MpsgPaymentComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MpsgPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
