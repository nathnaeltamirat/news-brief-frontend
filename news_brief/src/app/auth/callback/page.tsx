"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";

export default function GoogleCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const refreshToken = params.get("refreshToken");

    if (token) {
      localStorage.setItem("token", token);
      if (refreshToken) localStorage.setItem("refreshToken", refreshToken);

      router.push("/"); // redirect to home/dashboard
    } else {
      router.push("/signin"); // fallback if no token
    }
  }, [router]);

  return <p>Signing you in with Google...</p>;
}
