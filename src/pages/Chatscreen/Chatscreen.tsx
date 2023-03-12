import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonList,
  IonPage,
  IonText,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import React, { useCallback, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router";
import styles from "./Chatscreen.module.css";
import { send } from "ionicons/icons/";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootStore } from "../../redux/store";
import axios from 'axios';
import { fetchConversation, sendMessageAsync } from "../../redux/asyncApi";
import { DEFAULT_IMG } from "../Homescreen/Homescreen";

type Param = {
  chatId: string;
};

type LocationState = {
  usersId: {
    name: string
  }[];
  imageUrl?: string;
};

type Location = {
  state: LocationState;
};

const MY_ID = "6404962f8376775434638f9e";

const Chatscreen = () => {
  const { chatId } = useParams<Param>();
  const { state }: Location = useLocation<LocationState>();
  const { connection } = useSelector((store: RootStore) => store.socket);
  const { conversations, conversationId, usersId } = useSelector((store: RootStore) => store.chat);

  const [newMsg, setNewMsg] = useState('');

  const dispatch = useDispatch<AppDispatch>();

  const [chats, setChats] = useState({
    senderId: "1",
    receiverId: "16",
    messages: [
      {
        message: "Hello. How are you?",
        senderId: "16",
        receiverId: "1",
        time: "03:56 PM",
      },
      {
        message: "Hii.. I am fine. Wbu ?",
        senderId: "1",
        receiverId: "16",
        time: "04:05 PM",
      },
    ],
  });

  const senderId = useMemo(() => {
    return usersId?.find(id => id === MY_ID)
  }, [chatId]);

  const receiverId = useMemo(() => {
    return usersId?.find(id => id !== MY_ID)
  }, [chatId])

  const fetchConversations = useCallback(async (conversationId: string) => {
    const response = await axios.get(`${process.env.REACT_APP_URL}/conversations/${conversationId}`);
  }, [])

  const sendMessage = useCallback(async () => {
    dispatch(sendMessageAsync({
      conversationId, from: senderId, to: receiverId, message: newMsg
    })).then(res => {
      setNewMsg('');
      dispatch(fetchConversation({ conversationId: chatId }))
    })
  }, [newMsg])

  useIonViewWillEnter(() => {
    // AXIOS CALL FOR DATA FETCHING...
    // I will send my id (sender id) and receiver id (chatId) to backend which will give me back all the data which have these two conditions verified.
    // setChats(data)
    dispatch(fetchConversation({ conversationId: chatId }))
  }, [chatId]);

  // IMPLEMENT SOCKET HERE.
  // Payload to send and add to database is -- {message, senderId, receiverId, time, latestMessage}

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className={styles.userContainer}>
            <IonButtons slot="start">
              <IonBackButton text="" defaultHref="/home" />
            </IonButtons>
            <div className={styles.user}>
              <IonAvatar className={styles.userImage}>
                <img src={state?.imageUrl ?? DEFAULT_IMG} alt={state?.usersId[0]?.name} />
              </IonAvatar>
              <IonText className={styles.username} color="dark">
                {state?.usersId[0]?.name}
              </IonText>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className={styles.chatModule}>
          {conversations.map((msg, index) => {
            if (msg?.from?._id === MY_ID) {
              return (
                <div className={`${styles.me}`}>
                  <div
                    className={`${styles.singleChat}`}
                    data-time={msg?.createdAt}
                  // data-time={`${new Date(msg?.time).toLocaleTimeString("en", {
                  //   hour12: true,
                  //   hour: "2-digit",
                  //   minute: "2-digit",
                  // })}`}
                  >
                    {msg?.message}
                  </div>
                </div>
              );
            }
            return (
              <div className={`${styles.you}`}>
                <div
                  className={`${styles.singleChat}`}
                  data-time={msg?.createdAt}
                // data-time={new Date().toLocaleTimeString("en", {
                //   hour12: true,
                //   hour: "2-digit",
                //   minute: "2-digit",
                // })}
                >
                  {msg?.message}
                </div>
              </div>
            );
          })}
        </div>
      </IonContent>
      <IonFooter>
        <div className={styles.chatKeyboard}>
          <IonInput
            value={newMsg}
            onIonChange={(e) => setNewMsg(e.detail.value ?? '')}
            inputMode="text"
            className={styles.chatInput}
            placeholder="Enter your message.."
          />
          <IonButton className={styles.chatSend} color="success" onClick={sendMessage}>
            <IonIcon icon={send} />
          </IonButton>
        </div>
      </IonFooter>
    </IonPage>
  );
};

export default Chatscreen;
