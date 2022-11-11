export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH'
}

export interface IRequestParams {
  method: RequestMethod
  url: string
  headers: {
    'content-type'?: string
    Authorization?: string
  }
  data?: any
}
