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
import { fetchAllMyChats } from "src/redux/asyncApi";
import { AppDispatch, RootStore } from "../../redux/store";
import { logoutUser } from "src/redux/slices/userSlice";
import { addCircleOutline } from 'ionicons/icons'

export const DEFAULT_IMG = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"

const Homescreen = () => {
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((store: RootStore) => store.chat);
  const { userInfo } = useSelector((store: RootStore) => store.user);


  const goToChat = (chatId: number, state: any) => {
    history.push(`/chat/${chatId}`, state);
  };

  const logoutHandler = () => {
    dispatch(logoutUser());
    history.replace("/auth/login");
    setTimeout(() => {
    }, 200);
  };

  useIonViewDidEnter(() => {
    if (userInfo?._id) dispatch(fetchAllMyChats({ userId: userInfo?._id }))
  }, [userInfo?._id])

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
          {!!users?.length && users?.map((item, index) => (
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
          {!users?.length && <p className="no-chat-avail">No chat available.</p>}
        </div>
        <div className="add-new-chat">
          <IonItem lines="none" detail={false}>
            <IonIcon className="new-chat-icon" slot="start" ios={addCircleOutline} md={addCircleOutline} />
          </IonItem>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Homescreen;
