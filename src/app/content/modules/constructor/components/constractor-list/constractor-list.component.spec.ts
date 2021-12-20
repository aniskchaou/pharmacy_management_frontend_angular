import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstractorListComponent } from './constractor-list.component';

describe('ConstractorListComponent', () => {
  let component: ConstractorListComponent;
  let fixture: ComponentFixture<ConstractorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstractorListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstractorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
