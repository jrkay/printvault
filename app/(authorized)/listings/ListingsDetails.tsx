import { ModelProps } from "@/utils/appTypes"
import React from "react"

const ListingsDetails = ({ modelDetails }: { modelDetails: ModelProps[] }) => {
  return (
    <div>
      {modelDetails ? (
        <>
          {modelDetails.map((model: ModelProps) => (
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
