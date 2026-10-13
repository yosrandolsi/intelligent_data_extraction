import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrivingLicenceHistoriqueComponent } from './driving-licence-historique.component';

describe('DrivingLicenceHistoriqueComponent', () => {
  let component: DrivingLicenceHistoriqueComponent;
  let fixture: ComponentFixture<DrivingLicenceHistoriqueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DrivingLicenceHistoriqueComponent]
    });
    fixture = TestBed.createComponent(DrivingLicenceHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
