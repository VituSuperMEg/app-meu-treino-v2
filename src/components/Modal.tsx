import { ReactNode } from "react"
import { Modal, ModalProps } from "react-native";
import { Box } from "./Box";
import theme, { Theme } from "src/theme/theme";
import { TouchableOpacity } from "react-native-gesture-handler";

interface IModal extends ModalProps {
  children: ReactNode;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  backgroundColor : keyof Theme['colors'];
  closeButton?: ReactNode;
}

export function ModalComponent ({ 
  children, 
  show, 
  setShow, 
  backgroundColor,
  closeButton,
  ...rest
}:IModal) {
  return (
    <Modal {...rest} visible={show}>
      <Box backgroundColor={backgroundColor} flex={1}>
        <Box position="absolute" right={10} top={5}>
          <TouchableOpacity onPress={() => setShow(false)}>
            {closeButton}
          </TouchableOpacity>
        </Box>
        {children}
      </Box>
    </Modal>
  )
} 