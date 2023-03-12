import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import "./Loginscreen.css";

import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { loginAsync } from "src/redux/asyncApi";
import { AppDispatch } from "src/redux/store";
import { useCallback } from "react";

const Loginscreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { control, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      phone: "",
      password: "",
    },
  });
  const history = useHistory();

  const loginSubmitHandler = useCallback((values: any) => {
    dispatch(loginAsync(values)).then((res: any) => {
      const status = res?.payload?.data?.status;

      if (status === 'success') {
        localStorage.setItem("token", "token");
        history.replace("/");
      }
    })
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form
          className="auth-form"
          onSubmit={handleSubmit(loginSubmitHandler, (invalid) =>
            console.log(invalid)
          )}
        >
          <Controller
            name="phone"
            control={control}
            rules={{
              required: { value: true, message: "This Field is Required." },
              validate: (value) => {
                if (!!isNaN(Number(value)))
                  return "Phone Number should be a number";
                if (value.length !== 10)
                  return "Phone number should be of 10 characters.";
                return true;
              },
            }}
            render={({
              fieldState: { error },
              field: { name, value, onChange },
            }) => (
              <IonItem
                className={`auth-item ${!!error ? "ion-invalid" : "ion-valids"
                  }`}
              >
                <IonLabel position="floating">Phone Number</IonLabel>
                <IonInput
                  inputmode="tel"
                  autocomplete="new-password"
                  placeholder="Enter your registered phone number."
                  name={name}
                  value={value}
                  onIonChange={onChange}
                />
                <IonNote slot="error">{error?.message}</IonNote>
              </IonItem>
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: { value: true, message: "This Field is Required." },
            }}
            render={({
              fieldState: { error },
              field: { name, value, onChange },
            }) => (
              <IonItem
                className={`auth-item ${!!error ? "ion-invalid" : "ion-valids"
                  }`}
              >
                <IonLabel position="floating">Password</IonLabel>
                <IonInput
                  type="password"
                  autocomplete="new-password"
                  inputmode="text"
                  placeholder="Enter your password."
                  name={name}
                  value={value}
                  onIonChange={onChange}
                />
                <IonNote slot="error">{error?.message}</IonNote>
              </IonItem>
            )}
          />
          <IonButton
            type="submit"
            color="success"
            className="login-submit-button"
          >
            Submit
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Loginscreen;
