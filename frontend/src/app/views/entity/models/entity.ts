export interface EntityState {
  ids: string[];
  entities: {
    [id: string]: Entity;
  };
  loading: boolean;
  error: any;
}

export interface Entity {
  id: string;
  company_name: string;
  fantasy_name: string;
  cnpj: string;
  region: string;
  opening_date: string;
  active: boolean;
  medical_specialties: string[];
}
