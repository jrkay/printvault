import { createServerComponentClient as _createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"
import SearchPage from "./SearchPage"
import {
  getMatchingModels,
  getMatchingProjects,
} from "@/utils/helpers/searchHelpers"
import { getImages } from "@/api/api/imageApi"
import { GetServerSidePropsContext } from "next"

export interface SearchResultsProps {
  searchParams: { q: string }
}

async function SearchResults({ searchParams }: SearchResultsProps) {
  const { q } = searchParams

  const [userData] = await Promise.all([
    _createServerComponentClient<Database>({ cookies: () => cookies() })
      .auth.getUser()
      .then((response) => {
        return response.data.user
      }),
  ])

  const imageDataTable = await getImages(userData)
  const modelResults = await getMatchingModels(searchParams.q, userData)
  const projectResults = await getMatchingProjects(searchParams.q, userData)

  return (
    <>
      <SearchPage
        models={modelResults}
        projects={projectResults}
        images={imageDataTable}
        search={searchParams}
      />
    </>
  )
}

export default SearchResults
