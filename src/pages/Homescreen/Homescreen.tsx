import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";
import "./Homescreen.css";

const Homescreen = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({
    name: "Devbrat Kar awdawd awdawdawdawdawd",
    imageUrl:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
  });
  const goToChat = (chatId: number) => {
    history.push(`/chat/${chatId}`, userData);
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start">Chat App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="user-chat-container">
          {[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          ].map((item, index) => (
            <div className="user" key={index} onClick={() => goToChat(item)}>
              <div className="user-image-container">
                <IonAvatar className="user-image">
                  <img
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                    alt="User"
                  />
                </IonAvatar>
              </div>
              <div className="user-detail">
                <div className="user-name">
                  <IonText color="dark">Devbrat Kar</IonText>
                </div>
                <div className="user-recent-chat-container">
                  <IonText color="medium" className="user-recent-chat">
                    Hello. How are
                    you?aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                  </IonText>
                </div>
              </div>
            </div>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Homescreen;
