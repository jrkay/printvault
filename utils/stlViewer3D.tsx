import React from "react"
import { StlViewer } from "react-stl-viewer"
import { STLViewerProps } from "@/utils/appTypes"

const style: React.CSSProperties = {
  width: "350px",
  height: "350px",
  margin: "0 auto",
  padding: "0",
}

const STLViewer3D: React.FC<STLViewerProps> = ({ url }) => {
  return (
    <StlViewer
      style={style}
      orbitControls
      showAxes
      modelProps={{ scale: 2, color: "#864C9B" }}
      shadows
      url={url}
    />
  )
}

export default STLViewer3D
