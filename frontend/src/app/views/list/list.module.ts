import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Angular Material Modules
 */
import {MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { Subject } from 'rxjs';
import { Eye, LucideAngularModule, Pencil, CheckCircle, XCircle, ArrowUpRightFromSquare, Frown, Search, Trash2 } from 'lucide-angular';

class CustomPaginationIntl implements MatPaginatorIntl {
  changes = new Subject<void>();
  firstPageLabel = `Primeira página`;
  itemsPerPageLabel = `Entidades por página:`;
  lastPageLabel = `Ultima página`;
  nextPageLabel = 'Próxima página';
  previousPageLabel = 'Página anterior';
  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return `Página 1 de 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Página ${page + 1} de ${amountPages}`;
  }
}

const lucideIcons = {
  Eye,
  Pencil,
  CheckCircle,
  XCircle,
  ArrowUpRightFromSquare,
  Frown,
  Search,
  Trash2
}

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    LucideAngularModule.pick(lucideIcons)
  ],
  providers: [
    {provide: MatPaginatorIntl, useClass: CustomPaginationIntl},
  ]
})
export class ListModule { }
