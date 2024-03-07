export interface ITreinos {
   name : string;
   author : {
     name : string;
   }
   description : string;
   exercise : string[];
   id : string;
   image : string;
   interval_exercise : string;
   volume_exercise : string;
   usersId : string;
   progress : string;
   reader : string; 
   rep : string;
}

export interface IUserState {
  name : string;
  email : string;
  password : string;
  foto : string;
  preimum : string;
  confirmationPassword : string;
}

export interface IImage {
  name : string;
  type : string;
  uri : string;
}