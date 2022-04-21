import { gql } from '@apollo/client'

export const GET_MESSAGES = gql`
  query Messages {
    messages {
      id
      text
      createdAt
      updatedAt
      author {
        id
        avatarUrl
        displayName
      }
    }
  }
`
