import { gql } from 'apollo-angular';

export const GET_SALDO_TOTAL = gql`
  query {
    movimentacoes {
      id
      valor
    }
  }
`;
