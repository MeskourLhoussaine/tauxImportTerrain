import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTarrainComponent } from './add-tarrain.component';

describe('AddTarrainComponent', () => {
  let component: AddTarrainComponent;
  let fixture: ComponentFixture<AddTarrainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTarrainComponent]
    });
    fixture = TestBed.createComponent(AddTarrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
