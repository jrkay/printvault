import React from "react"
import { StlViewer } from "react-stl-viewer"
import { STLViewerProps } from "@/utils/appTypes"

const style: React.CSSProperties = {
  width: "150px",
  height: "150px",
  margin: "-30px 0",
  padding: "0",
}

const STLViewerImage: React.FC<STLViewerProps> = ({ url }) => {
  return (
    <StlViewer
      style={style}
      modelProps={{ scale: 1.2, color: "#864C9B" }}
      shadows
      url={url}
    />
  )
}

export default STLViewerImage
