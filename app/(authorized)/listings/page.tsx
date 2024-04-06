import { getListings } from "@/api/api/listingApi"
import { getModelDetails } from "@/utils/helpers/modelHelpers"
import ListingsGrid from "./ListingsGrid"
import { createServerComponentClient as _createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"

async function Listings() {
  const [userData] = await Promise.all([
    _createServerComponentClient<Database>({ cookies: () => cookies() })
      .auth.getUser()
      .then((response) => {
        return response.data.user
      }),
  ])
  if (userData) {
    const listingsData = await getListings(userData)

    // map over listings data and extract model IDs
    const modelIds = listingsData.map((listing) => listing.model_id)
    const modelDetails = await getModelDetails(modelIds)

    return (
      <ListingsGrid
        listingsData={listingsData}
        modelIds={modelDetails.map((model) => model?.id)}
      />
    )
  } else {
    return []
  }
}

export default Listings
