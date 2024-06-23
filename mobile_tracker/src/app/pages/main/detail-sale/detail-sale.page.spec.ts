import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailSalePage } from './detail-sale.page';

describe('DetailSalePage', () => {
  let component: DetailSalePage;
  let fixture: ComponentFixture<DetailSalePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSalePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
