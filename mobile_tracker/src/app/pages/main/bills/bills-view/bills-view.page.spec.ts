import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BillsViewPage } from './bills-view.page';

describe('BillsViewPage', () => {
  let component: BillsViewPage;
  let fixture: ComponentFixture<BillsViewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
