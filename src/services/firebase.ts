import { useEffect, useState } from "react";
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import { firebaseConfig } from "./config";
import { isDev, isDeveloperDev, partnerName } from "../utils";
import { IOrder } from "../interfaces";

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const storage = firebase.storage();

const devPrefix = isDeveloperDev ? "dev" : "";
const orderCollectionName = `${devPrefix}-${partnerName}-nowOrders`;
const ratingCollectionName = `${devPrefix}-${partnerName}-nowRatings`;

export const useStatisticVariables = () => {
  const [statisticVariables, setStatisticVariables] = useState({});

  useEffect(() => {
    if (isDev) console.log("fetch statisticVariables");
    const unsubscribe = firestore
      .collection(partnerName)
      .onSnapshot((snapshot) => {
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

export const useNowOrders = (tableID: string) => {
  const [state, setState] = useState<firebase.firestore.DocumentData[]>([]);
  const [error, setError] = useState({ isError: false, error: "" });
  useEffect(() => {
    const unsubscribe = firestore
      .collection(orderCollectionName)
      .where("tableID", "==", tableID)
      .where("isThisTableFinished", "==", false)
      // .orderBy("updatedAt", "desc")
      .onSnapshot(
        (snapshot) => {
          setState(
            snapshot.docs
              .map((doc) => doc.data())
              .sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1))
          );
        },
        (error) => {
          setError({ isError: true, error: error.name });
        }
      );
    return () => {
      unsubscribe();
    };
  }, [tableID, setState]);
  return { order: state, error };
};
export const useNowRatings = () => {
  const [state, setState] = useState<firebase.firestore.DocumentData[]>([]);
  const [error, setError] = useState({ isError: false, error: "" });
  useEffect(() => {
    const unsubscribe = firestore.collection(ratingCollectionName).onSnapshot(
      (snapshot) => {
        setState(snapshot.docs.map((doc) => [doc.id, doc.data()]));
      },
      (error) => {
        setError({ isError: true, error: error.name });
      }
    );
    return () => {
      unsubscribe();
    };
  }, [setState]);
  return { ratings: state, error };
};

export async function addOrder(order: IOrder) {
  const response = {
    isError: false,
    orderId: "",
    error: "",
  };

  const content = {
    ...order,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    version: "v1",
    paid: false,
    isDev: isDev,
  };
  try {
    const docRef = await firestore.collection(orderCollectionName).add(content);
    response.orderId = docRef.id;
  } catch (error) {
    console.log(error.message);
    response.isError = true;
    response.error = error.code;
  }
  return response;
}

export async function setRating(
  name: string,
  ratedNum: number,
  rating: number
) {
  const response = {
    isError: false,
    error: "",
  };

  const content = { ratedNum, rating };
  try {
    await firestore.collection(ratingCollectionName).doc(name).set(content);
  } catch (error) {
    console.error(error.message);
    response.isError = true;
    response.error = error.code;
  }
  return response;
}

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
