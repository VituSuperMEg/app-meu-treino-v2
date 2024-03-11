import {Barbell, User, Users} from 'phosphor-react-native';
import {Dimensions, Image, TouchableOpacity, View} from 'react-native';
import {Text} from './Text';
import {useEffect, useState} from 'react';
import {useUser} from '@store/auth';
import {api} from '@services/api';
import {INoticafion} from 'src/interfaces/interfaces';
import {ModalComponent} from './Modal';
import {Box} from './Box';
import {Header} from './Header';
import {Button} from './Button';
import {formatDate} from '@utils/utils';

export function Notification() {
  const [count, setCount] = useState(0);
  const [nofications, setNofications] = useState<INoticafion[] | []>([]);
  const [enabledNotifications, setEnabledNotifications] = useState(false);
  const user = useUser(u => u.user);
  const width = Dimensions.get('window').width;

  async function getNotification() {
    const response = await api.get(`notifications/${user.id}`);
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
            <Box p="s" flex={1}>
              {nofications.map((i, index) => (
                <TouchableOpacity
                  activeOpacity={1}
                  key={index}
                  style={{
                    backgroundColor: '#18181b',
                    width: width - 20,
                    height: 60,
                    marginBottom: 10,
                    borderRadius: 5,
                    justifyContent: 'center',
                  }}>
                  <Box
                    flexDirection="row"
                    p="s"
                    gap="l"
                    alignItems="center"
                    justifyContent="space-between">
                    <Box flexDirection="row" alignItems="center" gap="l">
                      {i.sender.foto ? (
                        <Image
                          source={{uri: i.sender?.foto}}
                          width={30}
                          height={30}
                          style={{borderRadius: 30}}
                        />
                      ) : (
                        <Box
                          width={30}
                          height={30}
                          alignItems="center"
                          justifyContent="center">
                          <User color="#fff" />
                        </Box>
                      )}
                      <Box>
                        <Text variant="body" color="shape">
                          {i.sender.name}
                        </Text>
                        <Text variant="bodyMin" color="textBody">
                          {i.message}
                        </Text>
                      </Box>
                    </Box>
                    <Button label="aceitar" marginRight="s" />
                  </Box>
                </TouchableOpacity>
              ))}
            </Box>
          </Box>
        }
      />
    </>
  );
}
