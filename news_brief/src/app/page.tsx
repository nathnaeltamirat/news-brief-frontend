"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Notification from "../components/notification_component/notification";

export default function Home() {
  
  const router = useRouter();

  useEffect(() => {
    router.replace("/news");
  }, [router]);
  return <></>;
}
