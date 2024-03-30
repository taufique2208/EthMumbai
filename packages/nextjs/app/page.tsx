"use client";

import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import {  RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useEffect } from "react";
import { useRouter } from 'next/navigation';

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const router = useRouter();

  useEffect(() => {
    console.log("Connected Address:", connectedAddress);
    if (connectedAddress) {
      if (connectedAddress.toLowerCase() === "0xA99AE32AA00d67bD9d1acD9b96c704AD0dEb66B1") { // Ensure case-insensitive check
        router.push("/admin"); // Navigate to admin page
      } else {
        router.push("/student"); // Navigate to student page
      }
    }
  }, [connectedAddress,router]);

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-3xl font-bold">Admin</span>
          </h1>
          <div className="flex justify-center items-center space-x-2">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>
          <div className="grid place-items: center"> {/* Added container with centering */}
            <RainbowKitCustomConnectButton />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
