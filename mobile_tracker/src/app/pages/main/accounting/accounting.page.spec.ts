import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountingPage } from './accounting.page';

describe('AccountingPage', () => {
  let component: AccountingPage;
  let fixture: ComponentFixture<AccountingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
