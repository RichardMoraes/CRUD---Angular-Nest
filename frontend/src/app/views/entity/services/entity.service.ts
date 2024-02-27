import { Injectable } from '@angular/core';
import { EntitiesResponse, Entity, EntityResponse, SpecialtiesResponse } from '../models/entity';
import { GlobalState } from 'src/app/models/global';
import { Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { MedicalSpecialty } from 'src/app/components/medical-specialties/models/medical-specialties';

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
  private api = `${environment.apiUrl}/entities`;
  private userState$ = this.store.select(state => state.global.user)

  constructor(
    private store: Store<{ global: GlobalState }>,
    private http: HttpClient
  ) { }

  getEntity(id: string | number): Observable<EntityResponse> {
    return this.userState$.pipe(
      switchMap(token => {
        return this.http.get<EntityResponse>(`${this.api}/${id}`, {
          headers: { 'Authorization': `Bearer ${token.access_token}`},
          withCredentials: true
        });
      })
    )
  }

  getEntityList(search?: string): Observable<EntitiesResponse> {
    const searchParam = search ? `?search=${search}` : '';

    return this.userState$.pipe(
      switchMap(token => {
        return this.http.get<EntitiesResponse>(`${this.api}${searchParam}`, {
          headers: { 'Authorization': `Bearer ${token.access_token}`},
          withCredentials: true
        });
      })
    )
  }

  getRegions(): Promise<{value?: string; label?: string}[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(regionsList);
      }, 1000);
    });
  }

  getMedicalSpecialties(): Observable<SpecialtiesResponse> {
    return this.userState$.pipe(
      switchMap(token => {
        return this.http.get<SpecialtiesResponse>(`${this.api}/specialties`, {
          headers: { 'Authorization': `Bearer ${token.access_token}`},
          withCredentials: true
        });
      })
    )
  }

  filterMedicalSpecialties(specialties: string[]): Observable<SpecialtiesResponse> {
    return this.userState$.pipe(
      switchMap(token => {
        return this.http.post<SpecialtiesResponse>(`${this.api}/specialties`, {specialties}, {
          headers: { 'Authorization': `Bearer ${token.access_token}`},
          withCredentials: true
        });
      })
    )
  }

  setEntity(entityObj: Entity, id?: string | number): Observable<EntityResponse> {
    return this.userState$.pipe(
      switchMap(token => {
        // Update Method
        if(id)
          return this.http.patch<EntityResponse>(`${this.api}${id ? '/'+id : ''}`, { ...entityObj }, {
            headers: { 'Authorization': `Bearer ${token.access_token}`},
            withCredentials: true
          });

        // Create Method
        return this.http.post<EntityResponse>(`${this.api}${id ? '/'+id : ''}`, { ...entityObj }, {
          headers: { 'Authorization': `Bearer ${token.access_token}`},
          withCredentials: true
        });
      })
    )
  }
}
