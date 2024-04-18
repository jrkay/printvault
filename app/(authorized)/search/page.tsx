import { createServerComponentClient as _createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"
import SearchPage from "./SearchPage"
import {
  getMatchingModels,
  getMatchingProjects,
} from "@/utils/helpers/searchHelpers"
import { getImages } from "@/api/api/imageApi"

async function SearchResults(searchString: string) {
  const [userData] = await Promise.all([
    _createServerComponentClient<Database>({ cookies: () => cookies() })
      .auth.getUser()
      .then((response) => {
        return response.data.user
      }),
  ])

  const imageDataTable = await getImages(userData)
  const modelResults = await getMatchingModels(searchString, userData)
  const projectResults = await getMatchingProjects(searchString, userData)

  return (
    <>
      <SearchPage
        models={modelResults}
        projects={projectResults}
        images={imageDataTable}
        search={searchString}
      />
    </>
  )
}

export default SearchResults
