import {Barbell, User, Users} from 'phosphor-react-native';
import {TouchableOpacity, View} from 'react-native';
import {Text} from './Text';
import {useEffect, useState} from 'react';
import {useUser} from '@store/auth';
import {api} from '@services/api';
import {INoticafion} from 'src/interfaces/interfaces';
import {ModalComponent} from './Modal';
import {Box} from './Box';
import {Header} from './Header';
import {Button} from './Button';
import { formatDate } from '@utils/utils';

export function Notification() {
  const [count, setCount] = useState(0);
  const [nofications, setNofications] = useState<INoticafion[] | []>([]);
  const [enabledNotifications, setEnabledNotifications] = useState(false);
  const user = useUser(u => u.user);

  async function getNotification() {
    const response = await api.get(`notifications/${user.id}`);
    console.log(response.data);
    setCount(response.data.length);
    setNofications(response.data);
  }
  useEffect(() => {
    getNotification();
  }, [user]);
  return (
    <>
      <View>
        <TouchableOpacity onPress={() => setEnabledNotifications(true)}>
          <Barbell size={40} color="#5ED25C" />
        </TouchableOpacity>
        {count > 0 && (
          <View
            style={{
              backgroundColor: 'red',
              width: 20,
              height: 20,
              position: 'absolute',
              alignItems: 'center',
              right: -5,
              borderRadius: 10,
            }}>
            <Text variant="body" color="shape" fontSize={12}>
              {count >= 100 ? 99 : count}
            </Text>
          </View>
        )}
      </View>
      <ModalComponent
        show={enabledNotifications}
        setShow={setEnabledNotifications}
        backgroundColor="mainBackground"
        children={
          <Box>
            <Header
              style="menu"
              name="Minhas Notificações"
              isModal
              setShow={setEnabledNotifications}
            />
            <Box p="s">
              <TouchableOpacity activeOpacity={1}>
              {nofications.map((i, index) => (
                <Box key={index} padding="m" gap="s">
                  <Box backgroundColor="zinc" flexDirection="row">
                    <Box
                      backgroundColor="greenPrimary"
                      width={50}
                      alignItems="center"
                      justifyContent="center">
                      <Users />
                    </Box>
                    <Box p="m" width={320}>
                      <Text
                        variant="bodyMin"
                        color="textBody"
                        lineBreakMode="clip">
                        {i.sender.name} acabou de enviar uma notificação
                      </Text>
                      <Text variant="body" color="shape">
                        {i.message}
                      </Text>
                      <Text variant="bold" color="greenPrimary">
                        {formatDate(i.createdAt)}
                      </Text>
                      {i.type === 'friend' && (
                        <Box flexDirection="row" gap="s" justifyContent='flex-end' width={265} mt='l'>
                          <Button
                            padding="s"
                            height={40}
                            label="Aceitar"
                            backgroundColor="greenPrimary"
                          />
                          <Button
                             height={40}
                            padding="s"
                            label="Cancelar"
                            backgroundColor="dangerPrimary"
                          />
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              ))}
              </TouchableOpacity>
              
            </Box>
          </Box>
        }
      />
    </>
  );
}
