import { ReservationListProps } from "react-native-calendars/src/agenda/reservation-list";

export interface ITreinos {
  name: string;
  author: {
    name: string;
  };
  description: string;
  exercise: string[];
  id: string;
  image: string;
  interval_exercise: string;
  volume_exercise: string;
  usersId: string;
  progress: string;
  reader: string;
  rep: string;
}

export interface IUserState {
  name: string;
  email: string;
  password: string;
  foto: string;
  preimum: string;
  confirmationPassword: string;
}
export interface IProfile {
  user_id: string;
  age: string;
  sexo: string;
  height: string;
  weight: string;
  focus: string;
  level: string;
  description: string | null;
  private: string;
  followers : string[];
  following : string[];
}
export interface IImage {
  name: string;
  type: string;
  uri: string;
}
export interface IParams {
  name : string;
  params: {
    id: string;
  };
  key : string;
  path?: string | undefined;
}
export interface INoticafion {
  message:string;
  receiverId:string;
  senderId: string;
  status: string,
  type: string;
  sender : {
    name : string;
    email : string;
    foto : string;
  }
  createdAt : string;
}
export interface IFriendRequest {
  id : string;
  receiverId : string;
  senderId : string;
  createdAt : string;
  status : string;
}
export interface IFlowwing {
  id : string;
  foto : string;
  name : string;
  profile  : {
    private : string
  }
}
export interface ICalendarProps extends  ReservationListProps{
  treinoId: string;
}