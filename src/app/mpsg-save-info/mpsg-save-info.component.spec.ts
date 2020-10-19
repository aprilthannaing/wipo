import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MpsgSaveInfoComponent } from './mpsg-save-infocomponent';

describe('MpsgSaveInfoComponent', () => {
  let component: MpsgSaveInfoComponent;
  let fixture: ComponentFixture<MpsgSaveInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MpsgSaveInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MpsgSaveInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
