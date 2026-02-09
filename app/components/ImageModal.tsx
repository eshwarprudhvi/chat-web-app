"use client";

import { Fragment } from "react";
import { Dialog, DialogPanel, Transition } from "@headlessui/react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";

interface ImageModalProps {
  isOpen: boolean;
  src?: string;
  onClose: () => void;
}

export default function ImageModal({ isOpen, src, onClose }: ImageModalProps) {
  if (!src) return null;
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
          <div className="fixed inset-0 bg-black/80" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="relative max-w-4xl w-full">
              <button
                onClick={onClose}
                className="absolute -top-10 right-0 text-white hover:text-gray-300 transition"
              >
                <IoClose size={30} />
              </button>

              <div className="relative w-full h-[80vh]">
                <Image
                  src={src}
                  alt="Message image"
                  fill
                  className="object-contain rounded-md"
                />
              </div>
            </DialogPanel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
