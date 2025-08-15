import { gql } from "@apollo/client";

// get all brands
export const GET_BRANDS = gql`
  query GetBrands {
    findAllBrands {
      id
      name
      origin
      image
    }
  }
`;

//get the details of a single brand
export const GET_BRAND_DETAILS = gql`
  query GetBrand($id: ID!) {
    findUniqueBrand(id: $id) {
      id
      name
      origin
      image
      categories
      
    }
  }
`;

//get the models of the specific brand by id with optional sorting
export const GET_BRAND_MODELS = gql`
  query GetBrandModels($id: ID!, $sortBy: sortBy!) {
    findBrandModels(id: $id, sortBy: $sortBy) {
      id
      name
      type
      price
      image
    }
  }
`;

//for the search bar
export const SEARCH_MODELS = gql`
  query SearchModels($brandId: String!, $name: String!) {
    searchModels(brandId: $brandId, name: $name) {
      id
      name
      type
      image
      price
    }
  }
`;

//get the details of the specific model 
export const FIND_UNIQUE_MODEL = gql`
  query FindUniqueModel($brandId: ID!, $modelId: ID!) {
    findUniqueModel(brandId: $brandId, modelId: $modelId) {
      id
      name
      type
      image
      description
      price
      specs {
        bodyWood
        neckWood
        fingerboardWood
        pickups
        tuners
        scaleLength
        bridge
      }
      musicians {
        name
        musicianImage
        bands
      }
    }
  }
`;