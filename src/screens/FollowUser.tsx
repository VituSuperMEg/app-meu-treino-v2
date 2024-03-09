import { Box } from "@components/Box";
import { Header } from "@components/Header";
import { useRoute } from "@react-navigation/native";
import { api, getData } from "@services/api";
import { useEffect, useState } from "react"
import { IUserState } from "src/interfaces/interfaces"

export function FollowUser () {
  const [user, setUser] = useState({} as IUserState);
  const { params } = useRoute();
  console.log(params)
  useEffect(() => {
    if (params) {
      async function getData() {
        const respose = await api.get(`/users/${params?.id}`);
        setUser(respose.data);
      }
      getData();
    }
  }, [params]);
  return (
    <Box backgroundColor="mainBackground" flex={1} pt="l">
      <Header 
       style="menu"
       name={user.name}
      />
    </Box>
  )
}