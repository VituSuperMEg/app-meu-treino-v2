import {useEffect, useState} from 'react';
import {ActivityIndicator, Image} from 'react-native';
import {Agenda, Calendar} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import {Box} from './Box';
import {Text} from './Text';
import {ICalendarProps, ITreinoCalendar} from 'src/interfaces/interfaces';
import {api} from '@services/api';
import {useUser} from '@store/auth';
import {formatDate} from '@utils/utils';
import {Dot} from 'phosphor-react-native';
import {Button} from './Button';

interface ICalendar {
  treinoId: string;
}

const List = ({treinoId, selectedDay}: ICalendarProps) => {
  const date = new Date(selectedDay);
  const user = useUser(state => state.user);
  const [treinoCalendar, setTreinoCalendar] = useState<ITreinoCalendar[] | []>(
    [],
  );
  const [loading, setLoading] = useState(true);

  async function getCalendar() {
    try {
      const res = await api.get('treinos/calendar', {
        params: {
          user: user.id,
          treinoId: treinoId,
          date: {
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear(),
          },
        },
      });
      setTreinoCalendar(res.data);
      console.log(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCalendar();
  }, [treinoId, selectedDay]);

  return (
    <Box backgroundColor="zinc" flex={1} justifyContent="space-between">
      {loading ? (
        <Box flex={1} alignItems="center" justifyContent="center">
          <ActivityIndicator size={30} color="#5ED25C" />
        </Box>
      ) : (
        <Box>
          <Box p="l">
            <Box>
              <Text variant="body" color="shape">
                {formatDate(date)}
              </Text>
            </Box>
          </Box>
          <Box borderWidth={0.2} borderColor="textBody" />
          <Box p="l" justifyContent="space-between">
            {treinoCalendar.map(t => (
              <Box key={t.id}>
                <Image
                  source={{uri: t.treino_id.image}}
                  width={80}
                  height={80}
                />
                <Text variant="body" color="shape">
                  {t.treino_id.name}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>
      )}
      <Box p='l'> 
      <Button
        label="Adicionar"
        borderColor="greenPrimary"
        borderRadius={6}
        borderWidth={1}
        height={50}
        alignItems="center"
        justifyContent="center"
      />
      </Box>
    </Box>
  );
};

export function CalendarC({treinoId}: ICalendar) {
  console.log(treinoId);
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
      renderList={({selectedDay}) => (
        <List selectedDay={selectedDay} treinoId={treinoId} />
      )}
    />
  );
}
