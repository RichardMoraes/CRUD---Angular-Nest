import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Entity } from './models/entity';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityService } from './services/entity.service';

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityComponent implements OnInit {
  private _entity!: Entity;
  entityForm!: FormGroup;

  constructor(
    private entityService: EntityService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef,
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

  private async initEntityForm(id: string): Promise<void> {
    this.entityForm = new FormGroup({
      company_name: new FormControl('', [Validators.required]),
      fantasy_name: new FormControl('', [Validators.required]),
      cnpj: new FormControl('', [Validators.required]),
      region: new FormControl('', [Validators.required]),
      opening_date: new FormControl('', [Validators.required]),
      active: new FormControl(''),
      medical_specialties: new FormControl([], [Validators.required, Validators.minLength(5)])
    });

    this.handleEntity(id);
    this.initSelects();
    this.cd.markForCheck();
  }

  private async initSelects(): Promise<void> {
    // this.regionsList = await this.entityService.getRegions().finally(() => this.region.enable());
    // this.medicalSpecialtiesList = await this.entityService.getMedicalSpecialties().finally(() => this.medicalSpecialties.enable());
  }

  private async handleEntity(id: string): Promise<void>{
    this.entity = await this.entityService.getEntity(id);
  }
}
