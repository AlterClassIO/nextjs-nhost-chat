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

export const DELETE_MESSAGE = gql`
  mutation DeleteMessage($id: uuid!) {
    delete_messages(where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`
