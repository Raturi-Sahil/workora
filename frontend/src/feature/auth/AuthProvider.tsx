import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { supabase } from "../../supabaseClient";
import { setSession } from "./authSlice";
import type { AppDispatch } from "../../store/store";
import type { Session } from "@supabase/supabase-js";

interface Props {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Initial session check
    supabase.auth.getSession().then(({ data }) => {
      dispatch(setSession(data.session)); // data.session is of type Session | null
    });

    // Listen to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session: Session | null) => {
        dispatch(setSession(session));
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthProvider;
