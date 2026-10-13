import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasseportHistoriqueComponent } from './passeport-historique.component';

describe('PasseportHistoriqueComponent', () => {
  let component: PasseportHistoriqueComponent;
  let fixture: ComponentFixture<PasseportHistoriqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasseportHistoriqueComponent]
    });
    fixture = TestBed.createComponent(PasseportHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
