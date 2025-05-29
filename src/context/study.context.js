import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser } from "../services/auth.service";

const StudyContext = createContext();

export const StudyProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const token = localStorage.getItem("token");

  const getUser = async () => {
    if (token) {
      await getCurrentUser()
        .then((response) => {
          if (response?.data?.status) {
            setCurrentUser(response?.data?.data);
          } else {
            handleLogOut();
          }
        })
        .catch((err) => {
          console.log(err);
          handleLogOut();
        });
    }
  };

  const handleLogOut = () => {
    setCurrentUser(null);
    localStorage.removeItem("token");
    window.location.reload();
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <StudyContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </StudyContext.Provider>
  );
};

export const useStudy = () => useContext(StudyContext);
