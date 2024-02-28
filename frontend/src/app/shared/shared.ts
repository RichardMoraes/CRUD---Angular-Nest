import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import slugify from 'slugify';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MedicalSpecialty } from '../components/medical-specialties/models/medical-specialties';
import { MedicalSpecialtiesComponent } from '../components/medical-specialties/medical-specialties.component';
import { UserService } from '../services/user/user.service';
import { removeUser } from '../store/global.action';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GlobalState, Loading } from '../models/global';

interface FormError {
  group: FormGroup,
  control: string
}

@Injectable({
  providedIn: 'root'
})
export class Shared {
  private loadingSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private store: Store<GlobalState>,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private router: Router,
    public dialog: MatDialog,
  ) {}

  async loading(options: Loading): Promise<void> {
    return new Promise<void>((resolve) => {
      const snackBarRef = this.snackBar.openFromComponent(SnackBarComponent, {
        data: options.message,
        duration: options.duration,
        verticalPosition: 'top',
        panelClass: options.type
      });

      snackBarRef.afterDismissed().subscribe(() => {
        resolve();
      });
    });
  }

  openMedicalSpecialtiesDialog(specialties: string[]){
    this.dialog.open(MedicalSpecialtiesComponent, {
      data: specialties,
    });
  }

  disableForm(form: FormGroup, disabled: boolean) {
    Object.keys(form.controls).forEach(key => {
      if (disabled) {
        form.get(key)?.disable();
        form.disable();
      } else {
        form.get(key)?.enable();
        form.enable();
      }
    });
  }

  slugify(input: string): string {
    return slugify(input, { lower: true, strict: true });
  }

  unSlugify(input: string): string {
    return input.replace('-', ' ');
  }

  getErrorMessage(formError: FormError): string {
    const formControl: AbstractControl | null = formError.group.get(formError.control);

    if(!formControl)
      return '';

    if (formControl?.hasError('required'))
      return `Campo obrigatório`;
    if (formControl?.hasError('email'))
      return `E-mail inválido`;
    if (formControl?.hasError('pattern') || formControl?.hasError('mask'))
      return `Valor Inválido`;

    return '';
  }

  sanitizeDate(date: Date): string | null {
    return new DatePipe('en-US').transform(date, 'yyyy-MM-dd')
  }

  filterSpecialtyLabel(id: string, list: MedicalSpecialty[]): string {
    return list.filter(spec => spec.id === parseFloat(id))?.[0]?.value || '';
  }

  logout(): void {
    this.userService.logout().then(() => {
      this.store.dispatch(removeUser());
      this.router.navigate(['/login']);
    }).catch(error => {
      console.log(error);
    });
  }
}
