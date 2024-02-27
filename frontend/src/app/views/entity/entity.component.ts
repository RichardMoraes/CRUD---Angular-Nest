import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Entity } from './models/entity';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityService } from './services/entity.service';
import { firstValueFrom } from 'rxjs';
import { Shared } from 'src/app/shared/shared';
import { MedicalSpecialty } from 'src/app/components/medical-specialties/models/medical-specialties';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityComponent implements OnInit {
  private _entity!: Entity;
  entityForm: FormGroup = new FormGroup({
    company_name: new FormControl(''),
    fantasy_name: new FormControl(''),
    cnpj: new FormControl(''),
    region: new FormControl(''),
    opening_date: new FormControl(''),
    active: new FormControl(''),
    medical_specialties: new FormControl([])
  });

  regionsList!: {value?: string; label?: string}[];
  medicalSpecialtiesList!: MedicalSpecialty[];

  constructor(
    private entityService: EntityService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef,
    private datePipe: DatePipe,
    public shared: Shared
  ) { }

  ngOnInit(): void {
    try {
      this.initEntityForm(this.route.snapshot.paramMap.get('entity')!);
    } catch (error) {
      this.router.navigate(['/list']);
    }
  }

  get entity(): Entity {
    return this._entity;
  }

  private set entity(entity: Entity) {
    this._entity = entity;

    const openingDate = new Date(entity.opening_date);
    openingDate.setDate(openingDate.getDate() + 1);

    this.entityForm.patchValue({
      company_name: entity.company_name,
      fantasy_name: entity.fantasy_name,
      cnpj: entity.cnpj,
      region: entity.region,
      opening_date: this.datePipe.transform(entity.opening_date, 'dd/MM/yyyy'),
      active: entity.active,
      medical_specialties: entity.medical_specialties
    });
  }

  get medicalSpecialties(): FormControl {
    return this.entityForm.get('medical_specialties') as FormControl;
  }

  private set medicalSpecialties(control: FormControl) {
    if(!control.value.length)
      return;

    this.medicalSpecialties.setValue(parseInt(control.value));
  }

  private async initEntityForm(id: string): Promise<void> {
    this.entityForm.reset({
      company_name: '',
      fantasy_name: '',
      cnpj: '',
      region: '',
      opening_date: '',
      active: '',
      medical_specialties: []
    });

    await this.handleEntity(id);
    this.regionsList = await this.entityService.getRegions();
    this.medicalSpecialtiesList = Object.values((await firstValueFrom(this.entityService.getMedicalSpecialties())).data!) ?? [];

    // Set Entity Form Select`s Values
    this.medicalSpecialties.patchValue(
      this.medicalSpecialties.value.map(
        (specialty: string) => ((parseInt(specialty)))
    ));

    this.cd.markForCheck();
  }

  private async handleEntity(id: string): Promise<void>{
    this.entity = (await firstValueFrom(this.entityService.getEntity(id))).data!;
  }
}
