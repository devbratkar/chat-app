import {
  IonAvatar,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";
import "./Homescreen.css";
import { logOutOutline } from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMyChats } from "../../redux/asyncApi";
import { AppDispatch, RootStore } from "../../redux/store";

// const users = [
//   {
//     id: 1,
//     name: "Sapna Kar",
//     phone: "7000689334",
//     imageUrl:
//       "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
//     latestMessage: "Hello",
//   },
//   {
//     id: 2,
//     name: "Kaveri Kar",
//     phone: "799591254",
//     imageUrl:
//       "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
//     latestMessage: "okay",
//   },
// ];

export const DEFAULT_IMG = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"

const Homescreen = () => {
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((store: RootStore) => store.chat);

  const goToChat = (chatId: number, state: any) => {
    history.push(`/chat/${chatId}`, state);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setTimeout(() => {
      history.replace("/auth/login");
    }, 200);
  };

  useIonViewDidEnter(() => {
    dispatch(fetchAllMyChats({ userId: '6404962f8376775434638f9e' }))
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start">Chat App</IonTitle>
          <IonIcon
            icon={logOutOutline}
            slot="end"
            className="user-logout"
            onClick={logoutHandler}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="user-chat-container">
          {users.map((item, index) => (
            <div
              className="user"
              key={item?._id}
              onClick={() => goToChat(item?._id, item)}
            >
              <div className="user-image-container">
                <IonAvatar className="user-image">
                  <img src={item?.imageUrl ?? DEFAULT_IMG} alt={item?.usersId[0]?.name} />
                </IonAvatar>
              </div>
              <div className="user-detail">
                <div className="user-name">
                  <IonText color="dark">{item?.usersId[0]?.name}</IonText>
                </div>
                <div className="user-recent-chat-container">
                  <IonText color="medium" className="user-recent-chat">
                    {item?.latestMessage ?? ""}
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
