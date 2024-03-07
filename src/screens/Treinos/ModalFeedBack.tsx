import { Box } from "@components/Box";
import { X } from "phosphor-react-native";
import { Modal, TouchableOpacity } from "react-native";

interface IModalFeedBack {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ModalFeedBack ({
  show,
  setShow
}:IModalFeedBack) {
  return (
  <Box flex={1}>
    <Modal animationType="slide" visible={show}>
      <Box position="absolute" right={10} top={5}>
       <TouchableOpacity onPress={() => setShow(false)}>
         <X color="#5ED25C" />
       </TouchableOpacity>
      </Box>
    </Modal>
  </Box> 
  )
}