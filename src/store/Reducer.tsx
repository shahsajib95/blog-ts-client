import { IUser } from "../utils/Typescript";
import { ACTIONS } from "./Actions";

export type IAlert = {
  success?: string | string[],
  error?: string | string[],
  loading?: boolean,
} 

type Notify = {
  type: "NOTIFY";
  payload: IAlert
};

type User = {
  type: "USER";
  payload: IUser 
};

export type State = {
  notify: IAlert | any;
  user: IUser | any;
};
export type StateAction = Notify | User;

const reducers = (state: State, action: StateAction) => {
  switch (action.type) {
    case ACTIONS.NOTIFY:
      return {
        ...state,
        notify: action.payload,
      };
    case ACTIONS.USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default reducers;
