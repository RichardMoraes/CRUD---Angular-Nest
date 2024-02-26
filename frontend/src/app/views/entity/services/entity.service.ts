import { Injectable } from '@angular/core';
import { Entity } from '../models/entity';
import { SelectObject } from 'src/app/models/global';

const regionsList = [
  { value: '1', label: 'Alto tietê' },
  { value: '2', label: 'Interior' },
  { value: '3', label: 'ES' },
  { value: '4', label: 'SP Interior' },
  { value: '5', label: 'SP' },
  { value: '6', label: 'SP2' },
  { value: '7', label: 'MG' },
  { value: '8', label: 'Nacional' },
  { value: '9', label: 'SP CAV' },
  { value: '10', label: 'RJ' },
  { value: '11', label: 'SP2' },
  { value: '12', label: 'SP1' },
  { value: '13', label: 'NE1' },
  { value: '14', label: 'NE2' },
  { value: '15', label: 'SUL' },
  { value: '16', label: 'Norte' }
]

const medicalSpecialtiesList = [
  { value: '1', label: 'Cardiologia' },
  { value: '2', label: 'Pediatria' },
  { value: '3', label: 'Ortopedia' },
  { value: '4', label: 'Ginecologia' },
  { value: '5', label: 'Dermatologia' },
  { value: '6', label: 'Oftalmologia' },
  { value: '7', label: 'Oncologia' },
  { value: '8', label: 'Urologia' },
  { value: '9', label: 'Psiquiatria' },
  { value: '10', label: 'Neurologia' },
  { value: '11', label: 'Endocrinologia' },
  { value: '12', label: 'Otorrinolaringologia' },
  { value: '13', label: 'Radiologia' },
  { value: '14', label: 'Anestesiologia' },
  { value: '15', label: 'Nutrologia' },
  { value: '16', label: 'Fisioterapia' }
]

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  constructor() { }

  getEntity(id: string | number): Promise<Entity> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          id: '1',
          company_name: 'teste company name',
          fantasy_name: 'test fantasy name',
          cnpj: '29.437.213/0001-67',
          region: '5',
          opening_date: '2001-05-26',
          active: true,
          medical_specialties: ['1', '13', '16', '5', '8', '3']
        });
      }, 1000);
    });
  }

  getRegions(): Promise<SelectObject[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(regionsList);
      }, 1000);
    });
  }

  getMedicalSpecialties(): Promise<SelectObject[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(medicalSpecialtiesList);
      }, 1000);
    });
  }
}
