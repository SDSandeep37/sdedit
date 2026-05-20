"use client";

import { createContext, useEffect, useState, ReactNode } from "react";

type User = {
  id: string;
  name: string;
  email: string;
};

type UserAuthContextType = {
  user: User | null;
  loading: boolean;
};

export const UserAuthContext = createContext<UserAuthContextType | null>(null);

type UserAuthProviderProps = {
  children: ReactNode;
};

export function UserAuthProvider({ children }: UserAuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleApiCall();
  }, []);

  const handleApiCall = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/user/session`,
        {
          credentials: "include",
        },
      );

      if (response.ok) {
        const userDetails = await response.json();

        setUser(userDetails.user);
        // console.log(userDetails);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth Context Error:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserAuthContext.Provider value={{ user, loading }}>
      {children}
    </UserAuthContext.Provider>
  );
}
