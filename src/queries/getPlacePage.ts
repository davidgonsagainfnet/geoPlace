import {gql} from '../components/apollo/apolloClient';

export const getPlacePage = gql`
  query GetPlacePage($page: Int!, $pageSize: Int!) {
    indicatedPlaces(
      sort: ["createdAt:desc"]
      pagination: {pageSize: $pageSize, page: $page}
    ) {
      data {
        attributes {
          latitude
          longitude
          rua
          cidade
          descricao
          estado
          corMarker
          image
          createdAt
        }
      }
    }
  }
`;
