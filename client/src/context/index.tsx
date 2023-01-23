import React, { useContext, createContext } from "react"
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react"
import { ethers } from "ethers"
import { CreateCampaignFormType, CampaignType } from "../type/CampaignType"
import { StaticHandlerContext } from "@remix-run/router"

interface StateContextValue {
  address: string | undefined
  contract: any
  createCampaign: any
  getCampaigns: any
  getUserCampaigns: any
  connect: any
  donate: any
  getDonations: any
}

// @ts-ignore
const StateContext = createContext<StateContextValue>()

export const StateContextProvider = ({ children }: any) => {
  const { contract } = useContract("0x9fd09DB691CBC931Dd1d12Ae9Bdd4BD78FD2BF60")

  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  )

  const address = useAddress()
  const connect = useMetamask()

  const publishCampaign = async (form: CreateCampaignFormType) => {
    try {
      const data = await createCampaign([
        address, // owner
        form.title,
        form.description,
        form.target,
        new Date(form.deadline).getTime(),
        form.image,
      ])

      console.log("contract call success", data)
    } catch (error) {
      console.log("contract call failure", error)
    }
  }

  const getCampaigns = async () => {
    const campaigns = await contract?.call("getCampaigns")

    const parsedCampaigns = campaigns.map(
      (campaign: CampaignType, i: number) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: campaign.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(
          campaign.amountCollected.toString()
        ),
        image: campaign.image,
        pId: i,
      })
    )

    return parsedCampaigns
  }

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns()

    const filteredCampaigns = allCampaigns.filter(
      (campaign: CampaignType) => campaign.owner === address
    )

    return filteredCampaigns
  }

  const donate = async (pId: string, amount: any) => {
    const data = await contract?.call("donateCampaign", pId, {
      value: ethers.utils.parseEther(amount),
    })

    return data
  }

  const getDonations = async (pId: string) => {
    const donations = await contract?.call("getDonators", pId)

    const numberOfDonations = donations[0].length
    const parsedDonations = []

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i]).toString(),
      })
    }

    return parsedDonations
  }

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext)
