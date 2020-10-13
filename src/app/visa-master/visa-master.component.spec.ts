import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD
=======
<<<<<<< HEAD:src/app/qrstatus/qrstatus.component.spec.ts
import { QrstatusComponent } from './qrstatus.component';

describe('QrstatusComponent', () => {
  let component: QrstatusComponent;
  let fixture: ComponentFixture<QrstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrstatusComponent ]
=======
>>>>>>> 1a252339acae86a6cd5705af9ec33cbfddb7d8d9
import { VisaMasterComponent } from './visa-master.component';

describe('VisaMasterComponent', () => {
  let component: VisaMasterComponent;
  let fixture: ComponentFixture<VisaMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisaMasterComponent ]
<<<<<<< HEAD
=======
>>>>>>> 1a252339acae86a6cd5705af9ec33cbfddb7d8d9:src/app/visa-master/visa-master.component.spec.ts
>>>>>>> 1a252339acae86a6cd5705af9ec33cbfddb7d8d9
    })
    .compileComponents();
  });

  beforeEach(() => {
<<<<<<< HEAD
    fixture = TestBed.createComponent(VisaMasterComponent);
=======
<<<<<<< HEAD:src/app/qrstatus/qrstatus.component.spec.ts
    fixture = TestBed.createComponent(QrstatusComponent);
=======
    fixture = TestBed.createComponent(VisaMasterComponent);
>>>>>>> 1a252339acae86a6cd5705af9ec33cbfddb7d8d9:src/app/visa-master/visa-master.component.spec.ts
>>>>>>> 1a252339acae86a6cd5705af9ec33cbfddb7d8d9
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
