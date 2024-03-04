import { Box } from "@components/Box";
import { api } from "@services/api";
import { useUser } from "@store/auth";
import { useState } from "react"
import { Image } from "react-native";
import notTreino from '@assets/notreino.png';

export function NotTreino () {

  const [existsTreino, setExistsTreino] = useState(false);
  const user = useUser(s => s.user);

  useState(() => {
    async function get() {
      try {
        const response = await api.get(`treinos/${user.id}`);
        if(response.data) {
          setExistsTreino(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    get();
  }, []);

  return (
    <>
     {!existsTreino && (
      <Box flex={1} backgroundColor="mainBackground" alignItems="center" justifyContent="center">
       <Image source={notTreino} style={{ width : 300, height: 300 }}/>
      </Box>
    )}
    </>
  )
}