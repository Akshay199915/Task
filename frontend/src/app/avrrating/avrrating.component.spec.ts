import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvrratingComponent } from './avrrating.component';

describe('AvrratingComponent', () => {
  let component: AvrratingComponent;
  let fixture: ComponentFixture<AvrratingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvrratingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvrratingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
