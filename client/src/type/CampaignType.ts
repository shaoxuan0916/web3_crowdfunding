export interface CreateCampaignFormType {
    name: string
    title: string
    description: string
    target: any 
    deadline: any
    image:string
}

export interface CampaignType {
    owner: string
    name: string
    title: string
    description: string
    target: any 
    deadline: any
    image:string
    amountCollected:string
    pId: number
}