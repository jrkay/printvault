import React from "react"
import { getModelData } from "@/utils/helpers/modelHelpers"

const ListingsDetails = ({ modelDetails }: { modelDetails: any }) => {
  return (
    <div>
      {modelDetails ? (
        <>
          {modelDetails.map((id: any) => (
            <div key={id}>{id.name}</div>
          ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default ListingsDetails
