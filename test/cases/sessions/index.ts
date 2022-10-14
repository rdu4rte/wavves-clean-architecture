import { gql } from 'apollo-server-express'
import { print } from 'graphql'
import { test } from '../../data'

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
    session(session_id: "${test.session.session_id_never_expires}") {
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
    session(session_id: "${test.session.wrong_session_id}") {
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
    inactivateSessions(user_id: "${test.user.user1_id}") {
      message
      success
    }
  }
`)

export const MutationInactivateUserSessionsErr = print(gql`
  mutation InactivateUserSessions {
    inactivateSessions(user_id: "${test.user.invalid_object_id}") {
      message
      success
    }
  }
`)

export const MutationLogin = print(gql`
  mutation Login {
    login(credentials: { email: "${test.email.user1_email}", password: "${test.password.user1_password}" }) {
      session_id
    }
  }
`)

export const MutationLoginErr = print(gql`
  mutation Login {
    login(credentials: { email: "${test.random.email}", password: "${test.random.password}" }) {
      session_id
    }
  }
`)
