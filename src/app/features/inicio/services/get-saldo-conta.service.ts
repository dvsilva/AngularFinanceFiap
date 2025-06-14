import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movimentacao } from '../model/finance.interface';
import { Apollo } from 'apollo-angular';
import { GET_SALDO_TOTAL } from './get-saldo-total.query';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GetSaldoService {
  private apiUrl = environment.url_dev;

  constructor(private http: HttpClient, private apollo: Apollo) {}

  getSaldoTotal(): Observable<Movimentacao[]> {
    return this.http.get<Movimentacao[]>(`${this.apiUrl}finance`);
  }

  getSaldoTotalGraphQL(): Observable<Movimentacao[]> {
    return this.apollo
      .watchQuery<{ movimentacoes: Movimentacao[] }>({
        query: GET_SALDO_TOTAL,
      })
      .valueChanges.pipe(map((result) => result.data.movimentacoes));
  }
}
