import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptHistoriqueComponent } from './receipt-historique.component';

describe('ReceiptHistoriqueComponent', () => {
  let component: ReceiptHistoriqueComponent;
  let fixture: ComponentFixture<ReceiptHistoriqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceiptHistoriqueComponent]
    });
    fixture = TestBed.createComponent(ReceiptHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
