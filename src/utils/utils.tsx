import { Feather, Fire, SmileyNervous, Waveform } from "phosphor-react-native";
import React from "react";

interface DefaultIcon {
  [key: string]: React.JSX.Element;
}

export const DEFAULT_ICON: DefaultIcon = {
  "leve": <Feather color="#5ED25C" />,
  "moderado": <Waveform color="#5ED25C" />,
  "pesado": <Fire color="#5ED25C" />,
  "intenso": <SmileyNervous color="#5ED25C" />,
};
