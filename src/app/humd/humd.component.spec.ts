import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumdComponent } from './humd.component';

describe('HumdComponent', () => {
  let component: HumdComponent;
  let fixture: ComponentFixture<HumdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HumdComponent]
    });
    fixture = TestBed.createComponent(HumdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
