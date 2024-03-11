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
export function formatDate(date : any) {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.getMonth() + 1; // Mês é base 0, então adicionamos 1
  const year = d.getFullYear();

  // Adicionando zeros à esquerda para garantir dois dígitos para dia e mês
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedDay}/${formattedMonth}/${year}`;
}
export const separatedArray =  (e : string) => {
  const separatedExercises = e.split(', ');
  return (separatedExercises.filter((item : any) => item.trim() !== '')); 
}