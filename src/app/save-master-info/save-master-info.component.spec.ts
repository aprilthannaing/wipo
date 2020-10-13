import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveMasterInfoComponent } from './save-master-info.component';

describe('SaveMasterInfoComponent', () => {
  let component: SaveMasterInfoComponent;
  let fixture: ComponentFixture<SaveMasterInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveMasterInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveMasterInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
