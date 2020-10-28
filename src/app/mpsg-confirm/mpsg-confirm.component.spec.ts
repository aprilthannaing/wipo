import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpsgConfirmComponent } from './mpsg-confirm.component';

describe('VisaConfirmComponent', () => {
  let component: MpsgConfirmComponent;
  let fixture: ComponentFixture<MpsgConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MpsgConfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MpsgConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
