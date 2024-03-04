import { Box } from "@components/Box";
import { Text } from "@components/Text";
import { api } from "@services/api";
import { useEffect, useState } from "react";

export function ListTreinos () {
  const [treinos, setTreinos] = useState([]);

  useEffect(() => {
    async function get() {
      try {
        const response = await api.get(`treinos`);
        if(response.data) {
          setTreinos(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    get();
  })
  return (
    <>
    {treinos.map(t => (
      <Box key={t.id} backgroundColor="shape" alignItems="center" justifyContent="center">
        <Text variant="body" color="textBody">
          {t.name}
        </Text>
      </Box>
    ))}
    </>
  )
}