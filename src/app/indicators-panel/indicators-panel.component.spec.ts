import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorsPanelComponent } from './indicators-panel.component';

describe('IndicatorsPanelComponent', () => {
  let component: IndicatorsPanelComponent;
  let fixture: ComponentFixture<IndicatorsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicatorsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
