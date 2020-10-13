import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaMasterComponent } from './visa-master.component';

describe('VisaMasterComponent', () => {
  let component: VisaMasterComponent;
  let fixture: ComponentFixture<VisaMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisaMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisaMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
