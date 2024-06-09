// src/context/UserContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
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
const savedUser = localStorage.getItem("currentUser");

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const updateUser = async (user) => {
    setCurrentUser(user);
    if (user) {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        setFavorites(userDoc.data().favorites || []);
      } else {
        setFavorites([]);
      }
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      setFavorites([]);
      localStorage.removeItem("currentUser");
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
