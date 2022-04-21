import { gql } from '@apollo/client'

export const GET_MESSAGES = gql`
  subscription Messages {
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

export const CREATE_MESSAGE = gql`
  mutation CreateMessage($object: messages_insert_input!) {
    insert_messages_one(object: $object) {
      id
    }
  }
`
