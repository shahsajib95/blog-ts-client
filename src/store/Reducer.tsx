import { IUser } from "../utils/Typescript";
import { ACTIONS } from "./Actions";
import { Socket } from "socket.io-client";

export type IAlert = {
  success?: string | string[];
  error?: string | string[];
  loading?: boolean;
};

type Notify = {
  type: "NOTIFY";
  payload: IAlert;
};

type User = {
  type: "USER";
  payload: IUser;
};

type Sockets = {
  type: "SOCKET";
  payload: Socket;
};

export type State = {
  notify: IAlert | any;
  user: IUser | any;
  socket: Sockets | any;
};
export type StateAction = Notify | User | Sockets;

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
    case ACTIONS.SOCKET:
      return {
        ...state,
        socket: action.payload,
      };
    default:
      return state;
  }
};

export default reducers;
