import { create } from "zustand";

interface INoticafion {
  count : number;
  // message: string;
  // type: string;
  // id: number;
  // read: boolean;
  // date: string;
  // title: string;
  // body: string;
  // image: string;
  // link: string;
  // user_id: number;
  // user_name: string;
  // user_avatar: string;
  // user_email: string;
  // user_phone: string;
  // user_address: string;
  // user_city: string;
  // user_state: string;
  // user_country: string;
}
export const useNoticafion = create<INoticafion>((set) => ({
  count : 70,
}));
