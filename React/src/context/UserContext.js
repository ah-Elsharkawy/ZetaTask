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
import { toast } from "react-toastify";

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

      // check if the photo is already in favorites
      if (favorites.includes(photoUrl)) {
        return;
      }
      await updateDoc(userDocRef, {
        favorites: arrayUnion(photoUrl),
      });
      setFavorites((prevFavorites) => [...prevFavorites, photoUrl]);
    } else {
      toast.error("Please log in first", {
        position: "top-center",
        autoClose: 2000,
      });
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
    } else {
      toast.error("Please log in first", {
        position: "top-center",
        autoClose: 2000,
      });
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
