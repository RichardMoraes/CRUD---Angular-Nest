import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Shared } from 'src/app/shared/shared';
import { EntityService } from '../services/entity.service';
import { SelectObject } from 'src/app/models/global';
import { Entity } from '../models/entity';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent implements OnInit {
  private _entity!: Entity;

  entityForm!: FormGroup;
  entityFormType!: string;

  regionsList!: SelectObject[];
  medicalSpecialtiesList!: SelectObject[];

  constructor(
    private entityService: EntityService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef,
    public shared: Shared
  ) { }

  ngOnInit(): void {
    try {
      this.initEntityForm(this.route.snapshot.paramMap.get('entity') ?? '');
    } catch (error) {
      this.router.navigate(['/list']);
    }
  }

  get entity(): Entity {
    return this._entity;
  }

  private set entity(entity: Entity) {
    this._entity = entity;

    this.entityForm = new FormGroup({
      company_name: new FormControl(entity.company_name, [Validators.required]),
      fantasy_name: new FormControl(entity.fantasy_name, [Validators.required]),
      cnpj: new FormControl(entity.cnpj, [Validators.required]),
      region: new FormControl(entity.region, [Validators.required]),
      opening_date: new FormControl(new Date(entity.opening_date), [Validators.required]),
      active: new FormControl(entity.active, [Validators.required]),
      medical_specialties: new FormControl(entity.medical_specialties)
    });
  }

  get medicalSpecialties(): FormControl {
    return this.entityForm.get('medical_specialties') as FormControl;
  }

  private set medicalSpecialties(control: FormControl) {
    if(!control.value.length)
      return;

    this.medicalSpecialties.setValue(control.value);
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
    this.entityFormType = this.handleFormType();

    if(this.entityFormType === 'invalid')
      this.router.navigate(['/list']);

    if(id){
      await this.handleEntity(id);
    } else {
      this.entityForm = new FormGroup({
        company_name: new FormControl('', [Validators.required]),
        fantasy_name: new FormControl('', [Validators.required]),
        cnpj: new FormControl('', [Validators.required]),
        region: new FormControl('', [Validators.required]),
        opening_date: new FormControl('', [Validators.required]),
        active: new FormControl(''),
        medical_specialties: new FormControl([], [Validators.required, Validators.minLength(5)])
      });
    }

    this.initSelects();
    this.cd.markForCheck();
  }

  private async initSelects(): Promise<void> {
    this.region.disable();
    this.medicalSpecialties.disable();

    this.regionsList = await this.entityService.getRegions().finally(() => this.region.enable());
    this.medicalSpecialtiesList = await this.entityService.getMedicalSpecialties().finally(() => this.medicalSpecialties.enable());
  }

  private async handleEntity(id: string): Promise<void>{
    this.entity = await this.entityService.getEntity(id);
  }

  private handleFormType(): 'edit' | 'create' | 'invalid' {
    const urlArray = this.router.url.split('/');

    if(urlArray.includes('editar'))
      return 'edit';

    if(urlArray.includes('criar'))
      return 'create';

    return 'invalid';
  }

  filterSpecialtyLabel(id: string, list: SelectObject[]): string {
    return list.filter(spec => spec.value === id)?.[0]?.label || '';
  }
}
