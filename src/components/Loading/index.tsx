import Lottie from "lottie-react";
import loadingAnimation from "./loading.json";

export default function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center dark:bg-slate-900">
      <div className="w-28">
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>
    </div>
  );
}
