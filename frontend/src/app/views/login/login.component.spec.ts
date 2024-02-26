import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { LoginComponent } from './login.component';
import { By } from '@angular/platform-browser';
import { LoginModule } from './login.module';
import { ActivatedRoute } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoginModule],
      declarations: [LoginComponent],
      // providers: [
      //   {
      //     provide: ActivatedRoute,
      //     useValue: {
      //       params: Observable.from([{id: 1}]),
      //     },
      //   },
      // ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display title', () => {
    const titleElement = fixture.debugElement.query(By.css('h1.title'));
    const titleText = titleElement.nativeElement.textContent.trim();

    expect(titleText).toBe('Login');
  })
});
