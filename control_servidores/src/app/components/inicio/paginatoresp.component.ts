import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { Subject } from "rxjs";

//Implementación en español de MatPaginator ya que por default está en inglés
@Injectable()
export class PaginatorESP implements MatPaginatorIntl {
  changes = new Subject<void>();

  firstPageLabel = "Primera página";
  itemsPerPageLabel = "Elementos por página:";
  lastPageLabel = "Última página";


  nextPageLabel = 'Siguiente';
  previousPageLabel = 'Anterior';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return $localize`Página 1 de 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return $localize`Página ${page + 1} de ${amountPages}`;
  }
}
