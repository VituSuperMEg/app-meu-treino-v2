import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Box } from "@components/Box";
import { Text } from "@components/Text";
import { api } from "@services/api";

export function ListTreinos() {
  const [treinos, setTreinos] = useState([]);

  useEffect(() => {
    async function get() {
      try {
        const response = await api.get(`treinos`);
        if (response.data) {
          setTreinos(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    get();
  }, []);

  const renderItem = ({ item }) => (
    <Box
      key={item.id}
      backgroundColor="shape"
      alignItems="center"
      justifyContent="center"
      padding="m"
      marginVertical="s"
      borderRadius={8}
    >
      <Text variant="body" color="textBody">
        {item.name}
      </Text>
    </Box>
  );

  return (
    <FlatList
      data={treinos}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingVertical: 20, paddingBottom : 70 }}
    />
  );
}
