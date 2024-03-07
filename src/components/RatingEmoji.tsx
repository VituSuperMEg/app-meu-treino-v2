import { TouchableOpacity } from "react-native";
import { Box } from "./Box";
import { Text } from "./Text";

export function RatingEmoji() {

  const emoji = ["🤩", "😁", "😀", "😔", "😭"];
  

  return (
    <Box flexDirection="row" gap="l">
      {emoji.map((e, index) => (
        <TouchableOpacity key={index} onPress={() => console.log(e)}>
          <Box
            backgroundColor="zinc"
            width={50}
            height={50}
            borderRadius={8}
            alignItems="center"
            justifyContent="center"
          >
            <Text variant="body" fontSize={20}>
              {e}
            </Text>
          </Box>
        </TouchableOpacity>

      ))}
    </Box>
  )
}