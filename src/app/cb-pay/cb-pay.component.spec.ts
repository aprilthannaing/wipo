import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CBPayComponent } from './cb-pay.component';

describe('CBPayComponent', () => {
  let component: CBPayComponent;
  let fixture: ComponentFixture<CBPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CBPayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CBPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
