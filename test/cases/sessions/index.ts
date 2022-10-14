import { gql } from 'apollo-server-express'
import { print } from 'graphql'
import { SESSION_ID, USER_ID_USER } from '../../data'

export const QueryGetSessions = print(gql`
  query GetSessions {
    sessions(
      pagination: {
        page: 0
        pageSize: 10
        search: ""
        sort: ["created_at"]
        sortDirection: [ASC]
      }
    ) {
      data {
        session_id
        active
        created_at
        expires_at
        session_id
        token
        user {
          _id
          role
        }
      }
      count
    }
  }
`)

export const QueryGetSessionById = print(gql`
  query GetSession {
    session(session_id: "${SESSION_ID}") {
      session_id
      active
      created_at
      expires_at
      session_id
      token
      user {
        _id
        role
      }
    }
  }
`)

export const QueryGetSessionByIdErr = print(gql`
  query GetSession {
    session(session_id: "wrong_session_id") {
      session_id
      active
      created_at
      expires_at
      session_id
      token
      user {
        _id
        role
      }
    }
  }
`)

export const MutationInactivateUserSessions = print(gql`
  mutation InactivateUserSessions {
    inactivateSessions(user_id: "${USER_ID_USER}") {
      message
      success
    }
  }
`)

export const MutationInactivateUserSessionsErr = print(gql`
  mutation InactivateUserSessions {
    inactivateSessions(user_id: "wrong_user_id") {
      message
      success
    }
  }
`)

export const MutationLogin = print(gql`
  mutation Login {
    login(credentials: { email: "admin@wavves.com", password: "123123" }) {
      session_id
    }
  }
`)

export const MutationLoginErr = print(gql`
  mutation Login {
    login(credentials: { email: "admin@wavves.com", password: "456456" }) {
      session_id
    }
  }
`)
