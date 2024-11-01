import { GetUser } from "@/services/get-user"
import { HttpClient } from "@/services/http-client"
import { useQuery } from "react-query"

export const useGetUser = () => {
  const httpClient = new HttpClient()

  return useQuery({
    queryKey: ['user'],
    queryFn: () => new GetUser(httpClient).execute()
  })
}
