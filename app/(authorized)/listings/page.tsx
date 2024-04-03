import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"
import { getListings } from "@/api/listing/getListings.tsx"
import { getModelDetails } from "@/utils/helpers/modelHelpers.tsx"
import ListingsGrid from "./ListingsGrid.tsx"

async function Listings() {
  const serverClient = createServerComponentClient<Database>({
    cookies: () => cookies(),
  })
  const userDataResponse = await serverClient.auth.getUser()
  const userData = userDataResponse.data

  const listingsData = await getListings(userData)

  // map over listings data and extract model IDs
  const modelIds = listingsData.map((listing) => listing.model_id)
  const modelDetails = await getModelDetails(modelIds)

  return (
    <ListingsGrid listingsData={listingsData} modelDetails={modelDetails} />
  )
}

export default Listings
