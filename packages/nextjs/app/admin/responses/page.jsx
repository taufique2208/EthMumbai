"use client"

import { useScaffoldContractRead } from '~~/hooks/scaffold-eth';

const page = () => {
    const address = "0x6Dc26ba4aec470149d0596B2DC9F5fC4213a9830"
    const { data: totalCounter } = useScaffoldContractRead({
        contractName: "YourContract",
        functionName: "getUserResponses",
        args: [address]
      });
      console.log(totalCounter)
  return (
    <div>   
      {totalCounter}
      
    </div>
  )
}

export default page
