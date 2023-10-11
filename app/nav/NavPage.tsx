"use client";

import { Grid } from "semantic-ui-react";
import React from "react";
import TopMenu from "../../components/TopMenu.tsx";
import DataDisplay from "./DataDisplay.tsx";
import Footer from "@/components/Footer.tsx";

const NavPage = ({
  data,
  userData,
  projectData,
  fileData,
  page,
}: {
  data: any;
  userData: any;
  projectData: any;
  fileData: any;
  page?: any;
}) => {
  return (
    <>
      <div>
        <TopMenu data={data} userData={userData} />
      </div>
      <div>
        <Grid padded centered className="pageStyle">
          <Grid.Row>
            <Grid.Column width={1} className="pageContainer"></Grid.Column>
            <Grid.Column
              width={8}
              className="pageContainer"
              style={{ minWidth: "700px" }}
            >
              <DataDisplay
                data={data}
                userData={userData}
                fileData={fileData}
                projectData={projectData}
                page={page}
              />
            </Grid.Column>
            <Grid.Column width={1} className="pageContainer"></Grid.Column>
          </Grid.Row>
        </Grid>
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
};

export default NavPage;
