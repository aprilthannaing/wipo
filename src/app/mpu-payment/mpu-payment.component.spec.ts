import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD
=======
<<<<<<< HEAD:src/app/report/report.component.spec.ts
import { ReportComponent } from './report.component';

describe('ReportComponent', () => {
  let component: ReportComponent;
  let fixture: ComponentFixture<ReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportComponent ]
=======
>>>>>>> 1a252339acae86a6cd5705af9ec33cbfddb7d8d9
import { MPUPaymentComponent } from './mpu-payment.component';

describe('MPUPaymentComponent', () => {
  let component: MPUPaymentComponent;
  let fixture: ComponentFixture<MPUPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MPUPaymentComponent ]
<<<<<<< HEAD
=======
>>>>>>> 1a252339acae86a6cd5705af9ec33cbfddb7d8d9:src/app/mpu-payment/mpu-payment.component.spec.ts
>>>>>>> 1a252339acae86a6cd5705af9ec33cbfddb7d8d9
    })
    .compileComponents();
  });

  beforeEach(() => {
<<<<<<< HEAD
    fixture = TestBed.createComponent(MPUPaymentComponent);
=======
<<<<<<< HEAD:src/app/report/report.component.spec.ts
    fixture = TestBed.createComponent(ReportComponent);
=======
    fixture = TestBed.createComponent(MPUPaymentComponent);
>>>>>>> 1a252339acae86a6cd5705af9ec33cbfddb7d8d9:src/app/mpu-payment/mpu-payment.component.spec.ts
>>>>>>> 1a252339acae86a6cd5705af9ec33cbfddb7d8d9
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
