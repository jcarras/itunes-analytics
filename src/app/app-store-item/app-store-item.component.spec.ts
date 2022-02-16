import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppStoreItemComponent } from './app-store-item.component';

describe('AppStoreItemComponent', () => {
  let component: AppStoreItemComponent;
  let fixture: ComponentFixture<AppStoreItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppStoreItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppStoreItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
