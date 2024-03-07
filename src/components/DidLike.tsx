import { Box } from "./Box";
import { Text } from "./Text";

interface DIDLIKE {
  objectLike : [
    { label : string, value : string}
  ];
}

export function DidLike({
  objectLike
}:DIDLIKE) {
  return (
    <Box>
      {objectLike.map((obj, index) => (
        <Text variant="body" color="shape" key={index}>
          {obj.label}
        </Text>
      ))}
    </Box>
  )
}