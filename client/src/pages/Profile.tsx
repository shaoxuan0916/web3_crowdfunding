import React, { useEffect, useState } from "react"
import { DisplayCampaigns } from "../components"
import { useStateContext } from "../context"
import { CampaignType } from "../type/CampaignType"

const Profile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [campaigns, setCampaigns] = useState<CampaignType[]>([])

  const { address, contract, getUserCampaigns } = useStateContext()

  const fetchCampaigns = async () => {
    setIsLoading(true)
    const data = await getUserCampaigns()
    setCampaigns(data)
    setIsLoading(false)
  }

  useEffect(() => {
    if (contract) fetchCampaigns()
  }, [address, contract])

  return (
    <>
      <DisplayCampaigns
        title="All Campaigns"
        isLoading={isLoading}
        campaigns={campaigns}
      />
    </>
  )
}

export default Profile
