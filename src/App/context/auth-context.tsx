import { ReactNode, createContext, useContext, useMemo, useState } from "react";

interface UserTypes {
  as: string;
  city: string;
  country: string;
  countryCode: string;
  from: string;
  isp: string;
  lat: number;
  lon: number;
  org: string;
  query: string;
  region: string;
  regionName: string;
  status: string;
  timezone: string;
  zip: string;
}

interface AuthContextTypes {
  currentUser: UserTypes;
  setCurrentUser: any;
}

// ----------------------
// Creating Auth Context
// ----------------------
export const AuthContext = createContext({} as AuthContextTypes);

// --------------------
// Creating Custom hook
// --------------------

export const useAuthContext = () => useContext(AuthContext);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<UserTypes>();

  const value = useMemo(() => ({ currentUser, setCurrentUser }), [currentUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
