import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArticlesComponent } from './edit-articles.component';

describe('EditArticlesComponent', () => {
  let component: EditArticlesComponent;
  let fixture: ComponentFixture<EditArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditArticlesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
