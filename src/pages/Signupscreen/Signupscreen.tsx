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
import { Controller, useForm } from "react-hook-form";

const Signupscreen = () => {
  const { control, handleSubmit, getValues } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const signupSubmitHandler = (values: any) => {
    console.log(values);
    // Axios call to post this data to backend
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Signup</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form
          className="auth-form"
          onSubmit={handleSubmit(signupSubmitHandler, (invalid) =>
            console.log(invalid)
          )}
        >
          <Controller
            name="name"
            control={control}
            rules={{
              required: { value: true, message: "This Field is Required." },
            }}
            render={({
              fieldState: { error },
              field: { name, value, onChange },
            }) => (
              <IonItem
                className={`auth-item ${
                  !!error ? "ion-invalid" : "ion-valids"
                }`}
              >
                <IonLabel position="floating">Full Name</IonLabel>
                <IonInput
                  inputmode="tel"
                  autocomplete="new-password"
                  placeholder="Enter your name."
                  name={name}
                  value={value}
                  onIonChange={onChange}
                />
                <IonNote slot="error">{error?.message}</IonNote>
              </IonItem>
            )}
          />
          <Controller
            name="phoneNumber"
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
                className={`auth-item ${
                  !!error ? "ion-invalid" : "ion-valids"
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
                className={`auth-item ${
                  !!error ? "ion-invalid" : "ion-valids"
                }`}
              >
                <IonLabel position="floating">Password</IonLabel>
                <IonInput
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
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: { value: true, message: "This Field is Required." },
              validate: (value) => {
                if (value !== getValues()?.password)
                  return "Password not match.";
                return true;
              },
            }}
            render={({
              fieldState: { error },
              field: { name, value, onChange },
            }) => (
              <IonItem
                className={`auth-item ${
                  !!error ? "ion-invalid" : "ion-valids"
                }`}
              >
                <IonLabel position="floating">Confirm Password</IonLabel>
                <IonInput
                  autocomplete="new-password"
                  inputmode="text"
                  placeholder="Confirm your password."
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

export default Signupscreen;
