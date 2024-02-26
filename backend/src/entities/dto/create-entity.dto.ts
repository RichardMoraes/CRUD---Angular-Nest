export class CreateEntityDto {
  readonly company_name: string;
  readonly fantasy_name: string;
  readonly cnpj: string;
  readonly region: string;
  readonly opening_date: Date;
  readonly active: boolean;
  readonly medical_specialties: string[];
}
