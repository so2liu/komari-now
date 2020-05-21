import { useEffect, useState } from "react";
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import { firebaseConfig } from "./config";
import { isDev, isDeveloperDev, partnerName } from "../utils";
import { IOrder } from "../interfaces";

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const storage = firebase.storage();

export const useStatisticVariables = () => {
  const [statisticVariables, setStatisticVariables] = useState({});

  useEffect(() => {
    if (isDev) console.log("fetch statisticVariables");
    const unsubscribe = db.collection(partnerName).onSnapshot((snapshot) => {
      setStatisticVariables(
        Object.fromEntries(snapshot.docs.map((doc) => [doc.id, doc.data()]))
      );
    });
    return () => {
      unsubscribe();
    };
  }, [setStatisticVariables]);
  return statisticVariables;
};

export const useAddOrder = (content: IOrder) => {
  const initResponse = {
    isError: false,
    pending: true,
    orderId: "",
    error: "",
  };
  const [response, setResponse] = useState(initResponse);
  useEffect(() => {
    if (content) {
      db.collection(`${isDeveloperDev ? "dev" : ""}-${partnerName}-nowOrders`)
        .add({
          ...content,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          version: "v1",
          paid: false,
          isDev: isDev,
        })
        .then((docRef) => {
          setResponse((prev) => ({
            ...prev,
            pending: false,
            orderId: docRef.id,
          }));
          if (isDev) console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          setResponse((prev) => ({
            ...prev,
            pending: false,
            isError: true,
            error,
          }));
        });
    }
  }, [content, setResponse]);
  return response;
};

// export const addOrder(content: IOrder, location: string){
//     const initResponse = {
//     isError: false,
//     pending: true,
//     orderId: "",
//     error: "",
//   };
//   const [response, setResponse] = useState(initResponse);

// }

export const useImageURL = (name: string | null) => {
  const [url, setUrl] = useState({
    isError: false,
    error: "",
    pending: true,
    isURL: false,
    url: "",
  });
  useEffect(() => {
    if (name) {
      storage
        .refFromURL(`gs://komari-lieferung.appspot.com/komari/${name}`)
        .getDownloadURL()
        .then((url) =>
          setUrl((prev) => ({ ...prev, pending: false, isURL: true, url }))
        )
        .catch((error) =>
          setUrl((prev) => ({
            ...prev,
            isError: true,
            error: error.code,
            pending: false,
          }))
        );
    }
  }, [name, setUrl]);
  return url;
};
