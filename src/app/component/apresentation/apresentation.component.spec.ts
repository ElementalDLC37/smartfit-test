import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApresentationComponent } from './apresentation.component';

describe('ApresentationComponent', () => {
  let component: ApresentationComponent;
  let fixture: ComponentFixture<ApresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApresentationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
