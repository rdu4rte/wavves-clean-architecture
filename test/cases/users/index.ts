import { gql } from 'apollo-server-express'
import { print } from 'graphql'
import { test } from '../../data'

export const QueryGetAllUsers = print(gql`
  query GetAllUsers {
    users(
      filters: { active: true, role: admin }
      pagination: {
        page: 0
        pageSize: 10
        search: ""
        sort: ["created_at"]
        sortDirection: [ASC]
      }
    ) {
      data {
        _id
        active
        created_at
        email
        password
        role
        updated_at
        username
      }
      count
    }
  }
`)

export const QueryGetUserById = print(gql`
	query GetUserById {
		user(user_id: "${test.user.admin_id}") {
			_id
			active
			created_at
			email
			password
			role
			updated_at
			username
		}
	}
`)

export const QueryGetUserByIdErr = print(gql`
  query GetUserById {
    user(user_id: "${test.user.wrong_id}") {
      _id
      active
      created_at
      email
      password
      role
      updated_at
      username
    }
  }
`)

export const MutationInsertUser = print(gql`
  mutation InsertUser {
    insertUser(
      input: {
        email: "${test.random.email}"
        password: "${test.random.password}"
        role: user
        username: "${test.random.username}"
      }
    ) {
      message
      success
    }
  }
`)

export const MutationUpdatePassword = print(gql`
	mutation UpdateUserPassword {
		updateUserPassword(
			password: "${test.random.password}"
			user_id: "${test.user.user2_id}"
		) {
			message
			success
		}
	}
`)

export const MutationUpdatePasswordErr = print(gql`
  mutation UpdateUserPassword {
    updateUserPassword(password: "${test.random.password}", user_id: "${test.user.invalid_object_id}") {
      message
      success
    }
  }
`)

export const MutationInactivateUser = print(gql`
	mutation InactivateUser {
		inactivateUser(
			user_id: "${test.user.user1_id}"
		) {
			message
			success
		}
	}
`)

export const MutationInactivateUserErr = print(gql`
  mutation InactivateUser {
    inactivateUser(user_id: "${test.user.invalid_object_id}") {
      message
      success
    }
  }
`)
