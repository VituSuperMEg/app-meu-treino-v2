import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Box } from "./Box";
import { Text } from "./Text";
import React, { useState } from "react";

interface IButtonFocus {
  text: string;
  description: string;
  onSelect: () => void; // Nova propriedade para lidar com a seleção
  selected: boolean; // Nova propriedade para indicar se o botão está selecionado
}

export function ButtonFocus({
  text,
  description,
  onSelect,
  selected,
}: IButtonFocus) {
  return (
    <TouchableOpacity
      style={styles.button} 
      onPress={onSelect}
    >
      <Box flexDirection="row" alignItems="center" gap="m">
        <View style={selected ? styles.select : styles.none}></View>
        <Box>
          <Text variant="bold" color="shape">
            {text}
          </Text>
          <Text variant="bodyMin" color="textBody">
            {description}
          </Text>
        </Box>
      </Box>
    </TouchableOpacity>
  );
}

export const styles = StyleSheet.create({
  button: {
    backgroundColor: "#18181b",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    marginBottom: 10,
  },
  selectedButton: {
    backgroundColor: "#5ED25C", // Cor do botão selecionado
  },
  none: {
    backgroundColor: "#ccc",
    height: 20,
    width: 20,
    borderRadius: 20,
  },
  select: {
    backgroundColor: "#5ED25C",
    height: 20,
    width: 20,
    borderRadius: 20,
  },
});
