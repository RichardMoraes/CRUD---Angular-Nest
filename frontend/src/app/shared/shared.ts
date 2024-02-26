import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import slugify from 'slugify';

interface FormError {
  group: FormGroup,
  control: string
}

@Injectable({
  providedIn: 'root'
})
export class Shared {
  private loadingSubject = new BehaviorSubject<boolean>(false);

  constructor() {}

  loading(loading: boolean): void {
    this.loadingSubject.next(loading);
    document.body.style.overflow = 'hidden';
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
}
