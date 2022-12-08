import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveHomeComponent } from './active-home.component';

describe('ActiveHomeComponent', () => {
  let component: ActiveHomeComponent;
  let fixture: ComponentFixture<ActiveHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
