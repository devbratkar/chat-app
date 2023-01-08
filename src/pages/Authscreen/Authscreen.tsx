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
          <Route
            path={`/auth/login`}
            exact={true}
            render={() => <Loginscreen />}
          />
          <Route path={`/auth/signup`} exact={true}>
            <Signupscreen />
          </Route>
          {/* FALLBACK ROUTE */}
          <Route render={() => <Redirect to="/auth/login" />} />
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
