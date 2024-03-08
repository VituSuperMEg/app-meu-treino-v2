import { useState } from "react";
import { Box } from "./Box";
import { Button } from "./Button";
import { Text } from "./Text";

interface DIDLIKE {
  objectLike: {
    label: string;
    value: string;
  }[];
}

export function DidLike({ objectLike }: DIDLIKE) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelection = (value: string) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  return (
    <Box mt="s">
      {objectLike.map((obj, index) => (
        <>
        <Box
          key={index}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text variant="body" color="shape">
            {obj.label}
          </Text>
          <Button
            onPress={() => toggleSelection(obj.value)}
            backgroundColor={
              selected.includes(obj.value) ? "greenPrimary" : "mainBackground"
            }
            width={20}
            height={20}
            borderRadius={20}
            borderWidth={1}
            borderColor="greenPrimary"
          />
        </Box>
        <Box backgroundColor="textBody" height={1} mt="s" mb='s'/>
        </>
      ))}
    </Box>
  );
}
