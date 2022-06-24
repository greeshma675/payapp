import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayhomeComponent } from './payhome.component';

describe('PayhomeComponent', () => {
  let component: PayhomeComponent;
  let fixture: ComponentFixture<PayhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayhomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
