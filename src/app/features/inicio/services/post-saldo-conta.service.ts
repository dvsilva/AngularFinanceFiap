import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movimentacao } from '../model/finance.interface';
import { ADICIONAR_TRANSACAO } from './adicionar-transacao.mutation';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostSaldoService {
  private apiUrl = environment.url_dev;

  constructor(private http: HttpClient, private apollo: Apollo) {}

  adicionarTransacao(movimentacao: Movimentacao): Observable<Movimentacao> {
    return this.http.post<Movimentacao>(`${this.apiUrl}finance`, movimentacao);
  }

  adicionarTransacaoGraphQL(
    movimentacao: Movimentacao
  ): Observable<{ adicionarMovimentacao: Movimentacao }> {
    return this.apollo
      .mutate({
        mutation: ADICIONAR_TRANSACAO,
        variables: {
          tipoMovimentacao: movimentacao.tipoMovimentacao,
          valor: movimentacao.valor,
          dataMovimentacao: movimentacao.dataMovimentacao,
        },
      })
      .pipe(
        map((result) => {
          if (!result.data || !result.data.adicionarMovimentacao) {
            throw new Error(
              'adicionarMovimentacao not found in mutation result'
            );
          }
          return { adicionarMovimentacao: result.data.adicionarMovimentacao };
        })
      );
  }
}
