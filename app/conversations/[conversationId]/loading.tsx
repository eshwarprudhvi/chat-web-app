"use client";
import Loader from "@/app/components/Loader";
export default function loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader />
    </div>
  );
}
