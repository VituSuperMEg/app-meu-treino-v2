import {useState} from 'react';
import { ActivityIndicator } from 'react-native';
import {Agenda, Calendar} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import { Box } from './Box';
import { Text } from './Text';
import { ICalendarProps } from 'src/interfaces/interfaces';

interface ICalendar {
  treinoId : string;
}

const List = ({ treinoId, selectedDay}:ICalendarProps) => {
  const date = new Date(selectedDay);
  console.log(treinoId)
  
  async function getCalendar() {

  }
  console.log(date.getFullYear(), date.getMonth(), date.getDate())
  return (
    <Box>
      <Text variant='body'>Lista</Text>
    </Box>
  )
}

export function CalendarC({
   treinoId
}:ICalendar) {
  console.log(treinoId)
  const [selected, setSelected] = useState('');
  LocaleConfig.locales['br'] = {
    monthNames: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ],
    monthNamesShort: [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez',
    ],
    dayNames: [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
    ],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
    today: 'Hoje',
    clear: 'Limpar',
    dateFormat: 'dd/MM/yyyy',
  };
  LocaleConfig.defaultLocale = 'br';
  return (
    <Agenda
      style={{
        backgroundColor: '#101010',
      }}
      theme={{
        backgroundColor: '#101010',
        calendarBackground: '#101010',
        monthTextColor: '#858585',
        textSectionTitleColor: '#858585',
        selectedDayBackgroundColor: '#5ED25C',
        arrowColor: '#5ED25C',
        selectedDayTextColor: '#101010',
        todayTextColor: '#5ED25C',
        dayTextColor: '#858585',
        textDisabledColor: '#3f3f46',
        agendaKnobColor: '#101010',
      }}
      markedDates={{
        '2024-03-17': {marked: true},
      }}
      onDayPress={day => {
        // console.log('selected day', day);
      }}
      renderList={() => <List selectedDay={selected} treinoId={treinoId}/>}
    />
  );
}