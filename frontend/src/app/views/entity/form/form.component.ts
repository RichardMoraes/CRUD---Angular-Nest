import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Shared } from 'src/app/shared/shared';
import { EntityService } from '../services/entity.service';
import { GlobalState } from 'src/app/models/global';
import { Entity } from '../models/entity';
import { Store } from '@ngrx/store';
import { DatePipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { MedicalSpecialty } from 'src/app/components/medical-specialties/models/medical-specialties';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {
  private _entity!: Entity;

  entityForm: FormGroup = new FormGroup({
    company_name: new FormControl('', [Validators.required]),
    fantasy_name: new FormControl('', [Validators.required]),
    cnpj: new FormControl('', [Validators.required]),
    region: new FormControl('', [Validators.required]),
    opening_date: new FormControl('', [Validators.required]),
    active: new FormControl(false),
    medical_specialties: new FormControl([], [Validators.required, Validators.minLength(5)])
  });
  entityFormType!: string;
  entityId!: string;

  regionsList!: {value?: string; label?: string}[];
  medicalSpecialtiesList!: MedicalSpecialty[];

  constructor(
    private store: Store<{ global: GlobalState }>,
    private entityService: EntityService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef,
    public shared: Shared
  ) {
    this.entityFormType = this.handleFormType();
    this.entityId = this.route.snapshot.paramMap.get('entity') ?? '';
  }

  ngOnInit(): void {
    // try {
      if(this.entityId)
        this.handleEntity(this.entityId);

      this.initEntityForm();
    // } catch (error) {
    //   this.router.navigate(['/list']);
    // }
  }

  get entity(): Entity {
    return this._entity;
  }

  private set entity(entity: Entity) {
    this._entity = entity;

    this.entityForm.patchValue({
      company_name: entity.company_name,
      fantasy_name: entity.fantasy_name,
      cnpj: entity.cnpj,
      region: entity.region,
      opening_date: new Date(entity.opening_date),
      active: entity.active,
      medical_specialties: entity.medical_specialties
    });
  }

  private async handleEntity(id: string): Promise<void>{
    this.entity = (await firstValueFrom(this.entityService.getEntity(id))).data!;
  }

  get medicalSpecialties(): FormControl {
    return this.entityForm.get('medical_specialties') as FormControl;
  }

  private set medicalSpecialties(control: FormControl) {
    if(!control.value.length)
      return;

    this.medicalSpecialties.setValue(parseInt(control.value));
  }

  get region(): FormControl {
    return this.entityForm.get('region') as FormControl;
  }

  private set region(control: FormControl) {
    if(!control.value.length)
      return;

    this.region.setValue(control.value);
  }

  private async initEntityForm(id?: string): Promise<void> {
    if(this.entityFormType === 'invalid')
      this.router.navigate(['/list']);

    this.entityForm.reset({
      company_name: '',
      fantasy_name: '',
      cnpj: '',
      region: '',
      opening_date: '',
      active: '',
      medical_specialties: []
    });

    await this.initSelects();
    this.cd.markForCheck();
  }

  private async initSelects(): Promise<void> {
    this.region.disable();
    this.medicalSpecialties.disable();

    // Set Lists
    this.regionsList = await this.entityService.getRegions();
    this.medicalSpecialtiesList = Object.values((await firstValueFrom(this.entityService.getMedicalSpecialties())).data!) ?? [];

    // Set Entity Form Select`s Values
    this.medicalSpecialties.patchValue(
      this.medicalSpecialties.value.map(
        (specialty: string) => ((parseInt(specialty)))
    ));

    this.region.enable();
    this.medicalSpecialties.enable();
  }

  private handleFormType(): 'edit' | 'create' | 'invalid' {
    const urlArray = this.router.url.split('/');

    if(urlArray.includes('editar'))
      return 'edit';

    if(urlArray.includes('criar'))
      return 'create';

    return 'invalid';
  }

  async onSubmit(): Promise<void> {
    if (this.entityForm.invalid)
      return;

      try {
        const sanitizeDate = this.shared.sanitizeDate(this.entityForm.value.opening_date)

        if(!sanitizeDate) throw new Error;

        this.entity = this.entityForm.value;
        this.entity.opening_date = sanitizeDate;
        this.shared.loading(true);

        const savedEntity = (await firstValueFrom(this.entityService.setEntity(this.entity, this.entityId))).data

        if(!savedEntity) return;

        this.entityForm.reset();
        this.entity = savedEntity;
        await this.initSelects();

        this.shared.openSnackBar('Entity Saved Successfully!')
        this.cd.markForCheck();
        this.shared.loading(false);
      } catch (error) {
        console.log(error);
      }


    // this.store.dispatch(addEntity({
    //   entity: {
    //     ...this.entityForm.value,
    //     opening_date: (new DatePipe('en-US')).transform(this.entityForm.value.opening_date, 'yyyy-MM-dd')
    //   }
    // }));
  }

  filterSpecialtyLabel(id: number, list: MedicalSpecialty[]): string {
    return list.filter(spec => spec.id === id)?.[0]?.value || '';
  }
}
