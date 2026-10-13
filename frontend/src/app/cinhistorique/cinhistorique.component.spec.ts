import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CINHistoriqueComponent } from './cinhistorique.component';

describe('CINHistoriqueComponent', () => {
  let component: CINHistoriqueComponent;
  let fixture: ComponentFixture<CINHistoriqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CINHistoriqueComponent]
    });
    fixture = TestBed.createComponent(CINHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
