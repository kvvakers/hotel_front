import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelItemComponent } from './hotel-item.component';

describe('HotelItemComponent', () => {
  let component: HotelItemComponent;
  let fixture: ComponentFixture<HotelItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HotelItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
