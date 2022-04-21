import { gql } from '@apollo/client'

export const GET_MESSAGES = gql`
  subscription Messages {
    messages(order_by: { createdAt: asc }) {
      id
      text
      createdAt
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

export const UPDATE_MESSAGE = gql`
  mutation UpdateMessage($id: uuid!, $text: String!) {
    update_messages(where: { id: { _eq: $id } }, _set: { text: $text }) {
      returning {
        id
      }
    }
  }
`
