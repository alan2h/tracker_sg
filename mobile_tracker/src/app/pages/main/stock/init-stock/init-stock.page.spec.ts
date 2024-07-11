import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InitStockPage } from './init-stock.page';

describe('InitStockPage', () => {
  let component: InitStockPage;
  let fixture: ComponentFixture<InitStockPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InitStockPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
