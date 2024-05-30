import { createServerComponentClient as _createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/utils/supabase.ts"
import SearchPage from "./SearchPage"
import {
  getMatchingModels,
  getMatchingProjects,
} from "@/utils/helpers/searchHelpers"

export interface SearchResultsProps {
  searchParams: { q: string }
}

async function SearchResults({ searchParams }: SearchResultsProps) {
  try {
    // Fetch user data
    const client = _createServerComponentClient<Database>({
      cookies: () => cookies(),
    })
    const {
      data: { user: activeUser },
    } = await client.auth.getUser()

    if (!activeUser) {
      throw new Error("User not authenticated")
    }

    const [modelResults, projectResults] = await Promise.all([
      getMatchingModels(searchParams.q, activeUser),
      getMatchingProjects(searchParams.q, activeUser),
    ])

    return (
      <SearchPage
        models={modelResults}
        projects={projectResults}
        search={searchParams}
        activeUser={activeUser}
      />
    )
  } catch (error) {
    console.error("Error fetching data:", error)
    return <div>Error loading search results</div>
  }
}

export default SearchResults
