import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TauxsComponent } from './tauxs.component';

describe('TauxsComponent', () => {
  let component: TauxsComponent;
  let fixture: ComponentFixture<TauxsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TauxsComponent]
    });
    fixture = TestBed.createComponent(TauxsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
