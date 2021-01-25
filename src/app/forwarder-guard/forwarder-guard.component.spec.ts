import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForwarderGuardComponent } from './forwarder-guard.component';

describe('ForwarderGuardComponent', () => {
  let component: ForwarderGuardComponent;
  let fixture: ComponentFixture<ForwarderGuardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForwarderGuardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForwarderGuardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
