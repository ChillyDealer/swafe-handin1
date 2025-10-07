import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCreator } from './transaction-creator';

describe('TransactionCreator', () => {
  let component: TransactionCreator;
  let fixture: ComponentFixture<TransactionCreator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionCreator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionCreator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
