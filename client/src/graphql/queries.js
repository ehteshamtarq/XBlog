import { gql } from "@apollo/client";

export const GET_BLOGS = gql`
  {
    blogs {
      id
      title
      content
      user {
        name
      }
    }
  }
`;
