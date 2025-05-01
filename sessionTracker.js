// sessionTracker.js
import { doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "./firebase";

// Track session when user logs in
const trackUserSession = async (user) => {
  const sessionRef = doc(db, "userSessions", user.uid);
  await setDoc(sessionRef, {
    email: user.email,
    loginTime: serverTimestamp(),
    status: "online",
    lastSeen: serverTimestamp(),
  });
};

// End session on logout or tab close
const endSession = async (uid) => {
  const sessionRef = doc(db, "userSessions", uid);
  await updateDoc(sessionRef, {
    status: "offline",
    lastSeen: serverTimestamp(),
  });
};

// Auth state listener
export const initSessionTracking = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      trackUserSession(user);
      // Track tab/browser close
      window.addEventListener("beforeunload", () => {
        endSession(user.uid);
      });
    }
  });
};
