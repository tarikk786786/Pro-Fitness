"use client";

import { AuthProvider } from "@/context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

export function Providers({ children }: { children: React.ReactNode }) {
  // Use a fallback Client ID for development if not provided in ENV
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "739343033621-euv2sq9n4e37eqbheg74h2t2aab00e2a.apps.googleusercontent.com"; // Provide a generic dummy or fallback for now

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
