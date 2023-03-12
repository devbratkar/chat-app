import {
  IonAlert,
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
  useIonAlert,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Homescreen from "./pages/Homescreen/Homescreen";
import Chatscreen from "./pages/Chatscreen/Chatscreen";
import Authscreen from "./pages/Authscreen/Authscreen";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { useCallback, useEffect, useState } from "react";
import io from 'socket.io-client';
import { useDispatch, useSelector } from "react-redux";
import { initSocket } from "./redux/slices/socketSlice";
import { AppDispatch, RootStore } from "./redux/store";
import { reauthenticateAsync } from "./redux/asyncApi";
import { dismissError } from "./redux/slices/errorSlice";

setupIonicReact();

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return Boolean(token);
};
const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { errorMessage, show } = useSelector((store: RootStore) => store.error)

  const persistAuthorisation = useCallback(() => {
    const token = localStorage.getItem('token');
    const userStorage = localStorage.getItem('user');

    const userId = userStorage && JSON.parse(userStorage)?._id;

    dispatch(reauthenticateAsync(userId))
  }, [])

  useEffect(() => {
    if (localStorage.getItem('token')) persistAuthorisation();

    const newSocket = io(`${process.env.REACT_APP_SOCKET_URL}`);
    dispatch(initSocket(newSocket));

    return () => {
      newSocket.close()
    };
  }, [dispatch]);

  return (
    <IonApp>
      <IonAlert isOpen={show} message={errorMessage} animated onDidDismiss={() => dispatch(dismissError())}></IonAlert>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <IonRouterOutlet id="main">
            <ProtectedRoute
              path="/"
              exact={true}
              render={<Redirect to="/home" />}
            />
            <ProtectedRoute path="/home" exact={true} render={<Homescreen />} />
            <ProtectedRoute
              path="/chat/:chatId"
              exact={true}
              render={<Chatscreen />}
            />

            {!isAuthenticated() ? (
              <>
                <Route
                  path="/auth"
                  render={(props) => <Authscreen {...props} />}
                />
                {/* FALLBACK ROUTE */}
                <Route render={() => <Redirect to="/auth/login" />} />
              </>
            ) : (
              <Route render={() => <Redirect to="/home" />} />
            )}
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
