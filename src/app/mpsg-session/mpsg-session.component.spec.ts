import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpsgSessionComponent } from './mpsg-session.component';

describe('VisaMasterComponent', () => {
  let component: MpsgSessionComponent;
  let fixture: ComponentFixture<MpsgSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MpsgSessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MpsgSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
