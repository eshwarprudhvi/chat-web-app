import { IconType } from "react-icons";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface SocialButtonProps {
  provider: "google" | "github";
  text?: string;
  isLoading?: boolean;
  icon?: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  provider,
  text,
  isLoading = false,
  icon,
}: SocialButtonProps) => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const router = useRouter();
  const handleClick = async () => {
    await socialAction("google");
  };

  const config = {
    google: {
      icon: <FcGoogle className="w-5 h-5" />,
      color: "border-gray-300 hover:border-gray-400 bg-white",
      textColor: "text-gray-700",
      defaultText: "Google",
    },
    github: {
      icon: <FaGithub className="w-5 h-5" />,
      color: "border-gray-800 hover:border-gray-900 bg-gray-800",
      textColor: "text-white",
      defaultText: "Continue with GitHub",
    },
  };
  const socialAction = async (provider: string) => {
    try {
      setIsSigningIn(true);
      const result = await signIn(provider, {
        callbackUrl: "/users",
        redirect: false,
      });
      if (result?.error) {
        toast.error("Authentication failed");
      } else if (result?.ok) {
        toast.success("Logged in successfully");
        router.push("/users");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSigningIn(false);
    }
  };
  const currentConfig = config[provider];
  const loading = isLoading || isSigningIn;
  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className={`
        w-full flex items-center justify-center gap-3
        py-3 px-4 rounded-lg border
        transition-all duration-200
        hover:shadow-md active:scale-[0.98]
        cursor-pointer  
        disabled:opacity-50 disabled:cursor-not-allowed
        ${currentConfig.color}
      `}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
      ) : (
        currentConfig.icon
      )}
      <span className={`font-medium ${currentConfig.textColor}`}>
        {loading ? "Connecting..." : text || currentConfig.defaultText}
      </span>
    </button>
  );
};

export default SocialButton;
