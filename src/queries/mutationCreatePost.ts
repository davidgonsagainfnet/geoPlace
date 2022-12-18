import {gql} from '../components/apollo/apolloClient';

export const mutationCreatePost = gql`
  mutation CreatePlace(
    $latitude: String!
    $longitude: String!
    $rua: String!
    $cidade: String!
    $descricao: String!
    $estado: String!
    $corMarker: String!
    $image: String!
  ) {
    createIndicatedPlace(
      data: {
        latitude: $latitude
        longitude: $longitude
        rua: $rua
        cidade: $cidade
        descricao: $descricao
        estado: $estado
        corMarker: $corMarker
        image: $image
      }
    ) {
      data {
        id
      }
    }
  }
`;
