import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Agenda, Calendar} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import {Box} from './Box';
import {Text} from './Text';
import {
  ICalendarProps,
  ITreinoCalendar,
  ITreinos,
} from 'src/interfaces/interfaces';
import {api} from '@services/api';
import {useUser} from '@store/auth';
import {DEFAULT_ICON, formatDate} from '@utils/utils';
import {Barbell, Dot, Timer} from 'phosphor-react-native';
import {Button} from './Button';
import {ModalComponent} from './Modal';

interface ICalendar {
  treinoId: string;
}

const List = ({treinoId, selectedDay}: ICalendarProps) => {
  const date = new Date(selectedDay);
  const user = useUser(state => state.user);
  const [treinoCalendar, setTreinoCalendar] = useState<ITreinoCalendar[] | []>(
    [],
  );
  const [findTreino, setFindTreino] = useState<ITreinos[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);

  const width = Dimensions.get('window').width;

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
      setLoading(false);
    } catch (error) {
      Alert.alert('Error', error.messsage);
    }
  }

  async function getFindTreino() {
    try {
      const res = await api.get(`treinos/${treinoId}`);
      setFindTreino(res.data);
      console.log(res.data);
    } catch (error) {
      Alert.alert('Error', error.messsage);
    }
  }

  useEffect(() => {
    getCalendar();
  }, [treinoId, selectedDay]);
  useEffect(() => {
    getFindTreino();
  }, [treinoId]);

  return (
    <>
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
            {treinoCalendar.length === 0 && (
              <Box alignItems="center" justifyContent="center" mt="xl">
                <Barbell color="#858585" size={50} weight="thin" />
                <Text variant="body" color="textBody">
                  Você não tem nenhum treino
                </Text>
              </Box>
            )}
            <Box p="l" justifyContent="space-between">
              <TouchableOpacity>
                {treinoCalendar.map(t => (
                  <Box
                    key={t.id}
                    flexDirection="row"
                    gap="m"
                    height={100}
                    justifyContent="space-between"
                    // backgroundColor='dangerPrimary'
                  >
                    <Box flexDirection="row" gap="s">
                      <Image
                        source={{uri: t.treino_id.image}}
                        width={100}
                        height={100}
                        style={{objectFit: 'fill'}}
                      />
                      <Box>
                        <Text variant="body" color="shape">
                          {t.treino_id.name}
                        </Text>
                        <Text variant="bold" color="textBody">
                          {t.treino_id.rep}
                        </Text>
                        {t.treino_id.exercise.slice(0, 2).map(t => (
                          <Text key={t} variant="bodyMin" color="textBody">
                            {t}
                          </Text>
                        ))}
                      </Box>
                    </Box>
                    <Box gap="s" justifyContent="space-between">
                      <Box flexDirection="row" justifyContent="space-between">
                        <Timer color="#5ED25C" />
                        <Text variant="body" color="textBody">
                          {t.treino_id.interval_exercise}
                        </Text>
                        {DEFAULT_ICON[t.treino_id.volume_exercise]}
                      </Box>
                      <Box>
                        <Text variant="bold" color="textBody">
                          {t.status}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </TouchableOpacity>
            </Box>
          </Box>
        )}
        <Box p="l">
          <Button
            label="Adicionar"
            borderColor="greenPrimary"
            borderRadius={6}
            borderWidth={1}
            height={50}
            alignItems="center"
            justifyContent="center"
            onPress={() => setModal(true)}
          />
        </Box>
      </Box>
      <ModalComponent
        animationType="slide"
        transparent={true}
        show={modal}
        setShow={setModal}
        backgroundColor="transparent"
        children={
          <Box
            flex={1}
            alignItems="center"
            justifyContent="space-between"
            p="l">
            <Text variant="body" color="shape">
              Adicionar a este dia {date.getDay()}
            </Text>
            <Button
              label="Voltar"
              borderColor="greenPrimary"
              borderRadius={6}
              borderWidth={1}
              height={50}
              width={width - 50}
              alignItems="center"
              justifyContent="center"
              onPress={() => setModal(false)}
            />
          </Box>
        }
      />
    </>
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
