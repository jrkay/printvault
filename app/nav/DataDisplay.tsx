'use client'

import React, { useState, useEffect } from 'react'
import { Grid} from 'semantic-ui-react'
import { AccountPage, FilePage, ProjectPage, ToolsPage, HomePage } from '../helpers/pageHelpers';

export default function Details ({ data, userData, fileData, projectData, page }: { data:any, userData: any, fileData: any, projectData: any, page?: any }) {
    const [activeNavPage, setActiveNavPage] = useState<React.ReactNode>(null);

useEffect(() => {
  setActiveNavPage(() => {
    switch (page) {
      case 'Files':
        return FilePage({fileData, projectData});
    case 'Projects':
      return ProjectPage({fileData, projectData});
    case 'Tools':
      return ToolsPage({fileData, projectData});
    case 'Account':
      return AccountPage({data, userData});
    default:
      return HomePage({fileData, projectData});
    }
  });
}, [page]);

  return (
      <Grid centered>
              <Grid.Row >
                <Grid.Column width={16}>
                    {activeNavPage}
            </Grid.Column>
       </Grid.Row>
    </Grid>
  )
}
