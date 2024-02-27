export class CreateEntityDto {
  company_name: string;
  fantasy_name: string;
  cnpj: string;
  region: string;
  opening_date: Date;
  active: boolean;
  medical_specialties: string[];
}
