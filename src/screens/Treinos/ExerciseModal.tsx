import { Box } from "@components/Box";
import { Text } from "@components/Text";
import { X } from "phosphor-react-native";
import { Modal, TouchableOpacity } from "react-native";

interface IExerciseModal {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
export function ExerciseModal ({
  show,
  setShow,
}: IExerciseModal) {
  return (
    <Box flex={1}>
      <Modal
       animationType="slide"
       visible={show}
      >
        <TouchableOpacity onPress={() => setShow(false)}>
         <X />
        </TouchableOpacity>
        <Text variant="bodyMin" color="danger">Modal</Text>
      </Modal>
    </Box>
  )
}