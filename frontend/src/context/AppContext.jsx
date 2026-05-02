import { createContext, useContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [tab, setTab] = useState("Profile");
  const [friendChat, setFriendChat] = useState({});
  const [groupChat, setGroupChat] = useState({});
  const [tabClick, setTabClick] = useState();
  const [isChatOpened, setIsChatOpened] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [admin, setAdmin] = useState({});
  const [loading, setLoading] = useState(true);
  const [availableClass, setAvailableClass] = useState([]);
  const [joinedClasses, setJoinedClasses] = useState([]);
  const [currentClass, setCurrentClass] = useState({});
  const [placementOption, setPlacementOption] = useState(false);

  useEffect(() => {
    const state = localStorage.getItem("isloggedIn");
    const bool = state === "true";
    setIsLoggedIn(bool);
    console.log(bool);
    const newState = localStorage.getItem("user");
    if (newState) {
      setUser(JSON.parse(newState));
    } else {
      setUser({});
    }
    console.log(typeof newState);
  }, []);

  const logout = () => {
    // Clear all authentication data from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("isloggedIn");
    localStorage.removeItem("token");

    // Reset all state to initial values
    setUser({});
    setIsLoggedIn(false);
    setTab("Profile");
    setFriendChat({});
    setGroupChat({});
    setAvailableClass([]);
    setJoinedClasses([]);
    setCurrentClass({});
    setAdmin({});
    setPlacementOption(false);
    setTabClick(undefined);
  };

  const states = {
    user,
    loading,
    isLoggedIn,
    setIsLoggedIn,
    setUser,
    tab,
    setTab,
    availableClass,
    setAvailableClass,
    joinedClasses,
    setJoinedClasses,
    currentClass,
    logout,
    setCurrentClass,
    friendChat,
    setFriendChat,
    isChatOpened,
    setIsChatOpened,
    groupChat,
    setGroupChat,
    placementOption,
    setPlacementOption,
    admin,
    setAdmin,
    tabClick,
    setTabClick,
  };

  return <AppContext.Provider value={states}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);
