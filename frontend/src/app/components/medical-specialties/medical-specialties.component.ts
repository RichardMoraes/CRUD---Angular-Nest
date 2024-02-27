import { Component, Inject, OnInit } from '@angular/core';
import { MedicalSpecialty } from './models/medical-specialties';
import {
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { EntityService } from 'src/app/views/entity/services/entity.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-medical-specialties',
  templateUrl: './medical-specialties.component.html',
  styleUrls: ['./medical-specialties.component.scss'],
})
export class MedicalSpecialtiesComponent implements OnInit {
  specialties!: MedicalSpecialty[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: string[],
    private entityService: EntityService
  ) { }

  async ngOnInit(): Promise<void> {
    this.specialties = (await firstValueFrom(this.entityService.filterMedicalSpecialties(this.data))).data!
  }

}
