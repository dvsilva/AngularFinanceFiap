import { gql } from 'apollo-angular';

export const ADICIONAR_TRANSACAO = gql`
  mutation AdicionarTransacao(
    $tipoMovimentacao: String!
    $valor: Float!
    $dataMovimentacao: String!
  ) {
    adicionarTransacao(
      input: {
        tipoMovimentacao: $tipoMovimentacao
        valor: $valor
        dataMovimentacao: $dataMovimentacao
      }
    ) {
      id
      tipoMovimentacao
      valor
      dataMovimentacao
    }
  }
`;
