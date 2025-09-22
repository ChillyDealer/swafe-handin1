import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardCreator } from './credit-card-creator';

describe('CreditCardCreator', () => {
  let component: CreditCardCreator;
  let fixture: ComponentFixture<CreditCardCreator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditCardCreator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditCardCreator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
