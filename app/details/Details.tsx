'use client'

import { Grid } from 'semantic-ui-react'
import TopMenu from '../../components/TopMenu';
import DetailsExpanded from './DetailsExpanded';
import { BackLink } from '../helpers/pageHelpers';

export default function Details ({ data, userData, fileData, projectData, page }: { data:any, userData: any, fileData: any, projectData: any, page?: any }) {
    
  return (
   <>
        <div className='mainNavDetails' >
            <TopMenu data={data} userData={userData} />
        </div>
        <Grid padded centered>
            <Grid.Row>
                <Grid.Column width={1} className='pageContainer'>
                    <BackLink />
                </Grid.Column>
                <Grid.Column width={10} className='pageContainer'>
                        <DetailsExpanded data={data} userData={userData} fileData={fileData} projectData={projectData} page={page} />
                </Grid.Column>
                <Grid.Column width={1}>
                </Grid.Column>
            </Grid.Row>
        </Grid>
   </>
  )
}