"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Notification from "../components/notification_component/notification";
import Verification from "@/components/verification_components/verification";

export default function Home() {
  return (
    <Verification/>
  )
  
  // const router = useRouter();

  // useEffect(() => {
  //   router.replace("/news");
  // }, [router]);
  // return <></>;
}
