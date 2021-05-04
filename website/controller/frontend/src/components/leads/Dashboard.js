import React, { Fragment } from 'react'
import { Grid } from '@material-ui/core'

import Form from "./Form"
import Leads from "./Leads"


export default function Dashboard() {
    return (
        <Fragment>
            <Grid container direction="column" spacing={3}>
                <Grid item xs={12}>
                    <Form />
                </Grid>
                <Grid item xs={12}>
                    <Leads />
                </Grid>
            </Grid>
        </Fragment>
    )
}
