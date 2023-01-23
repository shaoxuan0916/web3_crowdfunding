import React from "react"
import { useNavigate } from "react-router-dom"
import { FundCard } from "."
import { loader } from "../assets"
import { CampaignType } from "../type/CampaignType"

interface DisplayCampaignsProps {
  title: string
  isLoading: boolean
  campaigns: CampaignType[]
}

const DisplayCampaigns: React.FC<DisplayCampaignsProps> = ({
  title,
  isLoading,
  campaigns,
}) => {
  const navigate = useNavigate()

  const handleNavigate = (campaign: CampaignType) => {
    navigate(`./campaign-details/${campaign.title}`, { state: campaign })
  }

  return (
    <div>
      <h1 className="font-epilogue text-white font-semibold text-[18px] text-left">
        {title} ({campaigns?.length})
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img
            src={loader}
            alt="loader"
            className="w-[100px] h-[100px] object-contain "
          />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campaigns yet.
          </p>
        )}

        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign: CampaignType) => (
            <FundCard
              key={campaign.pId}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>
    </div>
  )
}

export default DisplayCampaigns