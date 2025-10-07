import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTransactionModal } from './create-transaction-modal';

describe('CreateTransactionModal', () => {
  let component: CreateTransactionModal;
  let fixture: ComponentFixture<CreateTransactionModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTransactionModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTransactionModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
