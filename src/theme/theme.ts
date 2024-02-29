import { createTheme } from "@shopify/restyle";

const pallete = {
  blackPrimary : '#101010',
  zinc : '#18181b',
  greenPrimary : '#5ED25C',

  gray : '#888585',
  shape : '#fff',
  black : '#000',

  danger : 'red'
}

const theme = createTheme({
  colors : {
    mainBackground : pallete.blackPrimary,
    greenPrimary : pallete.greenPrimary,
    textBody : pallete.gray,
    shape : pallete.shape,
    danger : pallete.danger,
    black : pallete.black,
    zinc : pallete.zinc
  },
  spacing : {
    s : 8,
    m : 16,
    l : 24,
    xl : 40
  },
  border : {},
  textVariants : {
    body : {
      fontSize : 15,
      fontFamily: 'Poppins-Regular',
    },
    ligth : {
      fontSize : 11,
      fontFamily : 'Poppins-Light'
    },
    bold : {
      fontSize : 15,
      fontFamily : 'Poppins-Bold'
    }
  },
});

export type Theme = typeof theme;
export default theme;