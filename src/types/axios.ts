// Definir AxiosHeaders et AxiosHeaderValue types
type AxiosHeaders = { [key: string]: string }
type AxiosHeaderValue = string | string[] | undefined

// types
export type AxiosRequestHeaders = Record<
  string,
  AxiosHeaderValue | AxiosHeaders
>
