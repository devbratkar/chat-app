import {
  IonLabel,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { Redirect, Route, RouteComponentProps } from "react-router-dom";

import React from "react";
import Loginscreen from "../Loginscreen/Loginscreen";
import Signupscreen from "../Signupscreen/Signupscreen";

const Authscreen: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <IonPage>
      <IonTabs>
        <IonRouterOutlet>
          <Route path={`${match.url}`} exact={true}>
            <Redirect to={`${match.url}/login`} />
          </Route>
          <Route path={`${match.url}/login`} exact={true}>
            <Loginscreen />
          </Route>
          <Route path={`${match.url}/signup`} exact={true}>
            <Signupscreen />
          </Route>
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="login" href={`${match.url}/login`}>
            <IonLabel>Login</IonLabel>
          </IonTabButton>

          <IonTabButton tab="signup" href={`${match.url}/signup`}>
            <IonLabel>Signup</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonPage>
  );
};

export default Authscreen;
