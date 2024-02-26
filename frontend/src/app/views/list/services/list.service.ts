import { Injectable, QueryList } from '@angular/core';
import { ListParams, ListState } from '../models/list';
import { Observable, of } from 'rxjs';
import { Entity } from '../../entity/models/entity';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor() { }

  loadPage(pageIndex: number, pageSize: number): Observable<ListState> {
    return of({
      data: [
        {
          id: '2',
          company_name: 'pag 2 company name',
          fantasy_name: 'pag 2 fantasy name',
          cnpj: '29.437.213/0001-67',
          region: '5',
          opening_date: '2001-05-26',
          active: false,
          medical_specialties: ['6', '5', '3', '8', '10', '12']
        }
      ],
      totalItems: 1,
      pageIndex: 1,
      pageSize: 10,
      loading: false,
      error: false
    })
  }

  cloneEntityToList(clones: number, params: ListParams): Entity[] {
    const entity: Entity = {
      id: '1',
      company_name: `${params?.search} company name`,
      fantasy_name: `${params?.search} fantasy name`,
      cnpj: '29.437.213/0001-67',
      region: '5',
      opening_date: '2001-05-26',
      active: true,
      medical_specialties: ['1', '13', '16', '5', '8', '3']
    };

    let list: Entity[] = [];

    for (let i = 0; i < clones; i++) {
      list.push({ ...entity });
    }

    console.log(`returned list, params:`, params);
    return list;
  }

  getList(params?: ListParams): Observable<Entity[]> {
    return of(this.cloneEntityToList(70, params!));
  }
}
