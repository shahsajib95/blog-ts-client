import { createContext, useReducer, Dispatch, useEffect } from "react";
import { getAPI } from "../utils/FetchData";
import { Children } from "../utils/Typescript";
import reducers, { State, StateAction } from "./Reducer";

export const token = localStorage.getItem("token");

type StateProps = {
  state: State;
  dispatch: Dispatch<StateAction>;
};

const initialState = {
  notify: {},
  user: {},
};

export const DataContext = createContext<StateProps>({
  state: initialState,
  dispatch: () => null,
});

export const DataProvider = ({ children }: Children) => {
  const [state, dispatch] = useReducer(reducers, initialState);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        dispatch({ type: "NOTIFY", payload: { loading: true } });
        const res = await getAPI("accessToken", JSON.parse(token));
        dispatch({ type: "USER", payload: res.data });
        dispatch({ type: "NOTIFY", payload: { loading: false } });
      };
      getUser();
    }
  }, [token]);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
