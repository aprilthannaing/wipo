import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontEndRedirectComponent } from './front-end-redirect.component';

describe('FrontEndRedirectComponent', () => {
  let component: FrontEndRedirectComponent;
  let fixture: ComponentFixture<FrontEndRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrontEndRedirectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontEndRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
