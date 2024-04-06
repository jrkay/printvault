import { ModelData } from "@/utils/appTypes"
import React from "react"

const ListingsDetails = ({ modelDetails }: { modelDetails: ModelData[] }) => {
  return (
    <div>
      {modelDetails ? (
        <>
          {modelDetails.map((model: ModelData) => (
            <div key={model.id}>{model.name}</div>
          ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default ListingsDetails
