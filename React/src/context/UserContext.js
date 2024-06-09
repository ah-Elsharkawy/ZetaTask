// src/context/UserContext.js
import React, { createContext, useContext, useState } from "react";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const updateUser = async (user) => {
    setCurrentUser(user);
    if (user) {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        setFavorites(userDoc.data().favorites || []);
      } else {
        setFavorites([]);
      }
    } else {
      setFavorites([]);
    }
  };

  const addToFavorites = async (photoUrl) => {
    if (currentUser) {
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        favorites: arrayUnion(photoUrl),
      });
      setFavorites((prevFavorites) => [...prevFavorites, photoUrl]);
    }
  };

  const removeFromFavorites = async (photoUrl) => {
    if (currentUser) {
      const userDocRef = doc(db, "users", currentUser.uid);
      await updateDoc(userDocRef, {
        favorites: arrayRemove(photoUrl),
      });
      setFavorites((prevFavorites) =>
        prevFavorites.filter((url) => url !== photoUrl)
      );
    }
  };

  const value = {
    currentUser,
    setCurrentUser: updateUser,
    favorites,
    addToFavorites,
    removeFromFavorites,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
