"use client";
import { User } from "@prisma/client";
import Avatar from "./Avatar";
import axios from "axios";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { CldUploadButton } from "next-cloudinary";
import { HiTrash } from "react-icons/hi";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";

interface ProfileDrawerProps {
  isOpen: boolean;
  currentUser: User;
  onClose: () => void;
}

export default function ProfileDrawer({
  isOpen,
  currentUser,
  onClose,
}: ProfileDrawerProps) {
  const [name, setName] = useState(currentUser.name || "");
  const [image, setImage] = useState(currentUser.image || "");

  const [loading, setLoading] = useState(false);

  const handleUpload = async (result: any) => {
    try {
      console.log("Cloudinary result:", result);

      const imageUrl = result?.info?.secure_url;
      if (!imageUrl) return;

      console.log("Image url from cloudinary:", imageUrl);

      setImage(imageUrl);

      await axios.patch("/api/profile", {
        image: imageUrl,
      });

      toast.success("profile upadated");
      signIn("credentials", { redirect: false });
      window.location.reload();

      onClose();
    } catch (error) {
      toast.error("something went wrong");
      console.error("upload image error", error);
    }
  };

  const onSave = async () => {
    try {
      setLoading(true);
      await axios.patch("/api/profile", { name });
      signIn("credentials", { redirect: false });
      onClose();
    } catch (error) {
      console.log("error in the profildrawer componet", error);
    } finally {
      setLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete("/api/delete-accont");
      signOut();
      onClose();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-md bg-white p-6 shadow-xl">
                  <div className="flex flex-col h-full">
                    <DialogTitle className="text-lg font-semibold">
                      My Profile
                    </DialogTitle>

                    <div className="flex flex-col items-center mt-6">
                      <div className="relative">
                        <Image
                          src={image || "/placeholder.png"}
                          alt="Profile image"
                          width={96}
                          height={96}
                          className="rounded-full object-cover"
                        />

                        <CldUploadButton
                          options={{ maxFiles: 1 }}
                          uploadPreset="qxsqlkbu"
                          onSuccess={(result) => handleUpload(result)}
                        >
                          <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full cursor-pointer">
                            ✎
                          </div>
                        </CldUploadButton>
                      </div>

                      <p className="mt-2 text-sm text-gray-500">
                        {currentUser.email}
                      </p>
                    </div>

                    {/* Form */}
                    <div className="mt-6 space-y-4">
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border rounded-md p-2"
                        placeholder="Your name"
                      />

                      <button
                        onClick={onSave}
                        disabled={loading}
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                      >
                        Save changes
                      </button>

                      <button
                        onClick={onDelete}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-2 rounded-md hover:bg-red-500 hover:text-white transition"
                      >
                        <HiTrash size={18} />
                        Delete account
                      </button>
                    </div>

                    <div className="mt-auto pt-4">
                      <button
                        onClick={onClose}
                        className="w-full py-2 bg-gray-100 rounded-md hover:bg-gray-300 transition"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </DialogPanel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
