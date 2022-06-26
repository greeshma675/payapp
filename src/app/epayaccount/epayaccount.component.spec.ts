import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpayaccountComponent } from './epayaccount.component';

describe('EpayaccountComponent', () => {
  let component: EpayaccountComponent;
  let fixture: ComponentFixture<EpayaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpayaccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpayaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
