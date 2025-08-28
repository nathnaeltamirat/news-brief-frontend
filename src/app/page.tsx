"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SignInCard from "../../news_brief/src/components/signin_components/siginCard";

export default function Home() {
  // <SignInCard/>
  const router = useRouter();

  useEffect(() => {
    router.replace("/news");
  }, [router]);
  return <></>;
}
