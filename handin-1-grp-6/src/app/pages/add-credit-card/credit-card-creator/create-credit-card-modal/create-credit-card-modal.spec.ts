import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCreditCardModal } from './create-credit-card-modal';

describe('CreateCreditCardModal', () => {
  let component: CreateCreditCardModal;
  let fixture: ComponentFixture<CreateCreditCardModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCreditCardModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCreditCardModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
