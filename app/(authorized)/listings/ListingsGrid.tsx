"use client"

import React from "react"
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Table,
  Icon,
} from "semantic-ui-react"
import Link from "next/link"
import { ModelProps, ListingProps } from "@/utils/appTypes"

const ListingsGrid = ({
  listingsData,
  modelIds,
}: {
  listingsData: ListingProps[]
  modelIds: string[]
}) => {
  const tableHeaders = ["Active", "Website", "Model Name", "Date Listed"]

  // Trim the website url to only show the domain and remove http/https and www
  const trimWebsite = (url: string) => {
    if (!url) return ""
    const domain = url
      .replace("https://", "")
      .replace("http://", "")
      .replace("www.", "")
      .split(/[/?#]/)[0]
      .toLowerCase()
    return domain
  }

  const modelUrl = (listing: ListingProps) => {
    return modelIds.filter((model: string) => model === listing.model_id)
  }
  const modelName = (listing: ListingProps) => {
    return modelIds.filter((model: string) => model === listing.model_id)[0]
  }

  return (
    <Table
      celled
      padded
      color={"violet"}
      style={{ width: "80%", margin: "20px auto" }}
    >
      <TableHeader>
        <TableRow>
          {tableHeaders.map((header) => (
            <TableHeaderCell singleLine key={header}>
              {header}
            </TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {listingsData.map((listing: ListingProps) => (
          <TableRow key={listing.id}>
            <TableCell style={{ textAlign: "center" }}>
              {/* // display a checkmark if listing is active */}
              {listing.active ? <Icon name='checkmark' /> : null}
            </TableCell>
            <TableCell>
              <a href={listing.website} target='_blank' rel='noreferrer'>
                {trimWebsite(listing.website)}
              </a>
            </TableCell>
            <TableCell>
              {modelIds ? (
                modelIds.find((model: string) => model === listing.model_id) ? (
                  <Link href={`/models/${modelUrl}`}>
                    <>{modelName}</>
                  </Link>
                ) : (
                  <p>Loading...</p>
                )
              ) : null}
            </TableCell>
            <TableCell>
              {listing.date_active ? (
                listing.date_active
              ) : (
                <span style={{ color: "lightgrey" }}>Inactive</span>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default ListingsGrid
