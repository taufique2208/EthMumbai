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

  // const { data: totalCounter } = useScaffoldContractRead({
  //   contractName: "TestEvaluation",
  //   functionName: "addQuestion",
  //   args: ["0x6Dc26ba4aec470149d0596B2DC9F5fC4213a9830"],
  // });
  
  

  useEffect(() => {
    console.log("Connected Address:", connectedAddress);
    if (connectedAddress) {
      if (connectedAddress === "0x115Fa80d1D00C38D88D2c024fe5C6f9d5ca34bE3") { // Ensure case-insensitive check
        router.push("/admin"); // Navigate to admin page
      } else {
        router.push("/student"); // Navigate to student page
      }
    }
  }, [connectedAddress]);

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10 align-center justify-center">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-6xl font-bold">DigiTest</span>
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
