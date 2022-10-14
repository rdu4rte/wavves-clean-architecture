import { gql } from 'apollo-server-express'
import { print } from 'graphql'

export const getBooksCase = print(gql`
  query GetBooks {
    books {
      _id
      name
      author
      category
      publicationDate
      created_at
      pages
      publisher
      unitValue
    }
  }
`)
