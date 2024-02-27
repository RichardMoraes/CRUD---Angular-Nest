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
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  loading(loading: boolean): void {
    this.loadingSubject.next(loading);
    document.body.style.overflow = 'hidden';
  }

  openSnackBar(message: string, duration?: number): void {
    this.snackBar.openFromComponent(SnackBarComponent, {
      data: message,
      duration: duration ?? 3000,
    });
  }

  openMedicalSpecialtiesDialog(specialties: string[]){
    this.dialog.open(MedicalSpecialtiesComponent, {
      data: specialties,
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
}
