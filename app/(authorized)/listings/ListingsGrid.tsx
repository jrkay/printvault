"use client"

import React from "react"
import {
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Header,
  Table,
  Rating,
  Icon,
} from "semantic-ui-react"
import Link from "next/link"

const ListingsGrid = ({
  listingsData,
  modelDetails,
}: {
  listingsData: any
  modelDetails: any
}) => {
  const tableHeaders = ["Active", "Website(s)", "Model Name", "Date Listed"]

  // Trim the website url to only show the domain and remove http/https and www
  const trimWebsite = (url: string) => {
    // if no url, return empty string
    if (!url) return ""
    const domain = url
      .replace("https://", "")
      .replace("http://", "")
      .replace("www.", "")
      .split(/[/?#]/)[0]
      .toLowerCase()
    return domain
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
        {listingsData.map((listing: any) => (
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
              {modelDetails ? (
                // Find the matching model
                modelDetails.find(
                  (model: { id: any }) => model.id === listing.model_id
                ) ? (
                  <Link
                    href={`/models/${
                      modelDetails.find(
                        (model: { id: any }) => model.id === listing.model_id
                      ).id
                    }`}
                  >
                    <div>
                      {
                        modelDetails.find(
                          (model: { id: any }) => model.id === listing.model_id
                        ).name
                      }
                    </div>
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
