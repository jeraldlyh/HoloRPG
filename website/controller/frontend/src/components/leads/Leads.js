import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@material-ui/core"

import { getLeads, deleteLead } from "../../actions/leads"


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.primary.dark,
        },
    },
}))(TableRow)

const styles = theme => ({
    table: {
        width: "100%"
    }
})

export class Leads extends Component {
    static propTypes = {
        leads: PropTypes.array.isRequired,
        getLeads: PropTypes.func.isRequired,
        deleteLead: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.getLeads()
    }

    render() {
        const { classes } = this.props
        return (
            <TableContainer className={classes.table} component={Paper}>
                <Table aria-label="custom-table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">ID</StyledTableCell>
                            <StyledTableCell align="center">NAME</StyledTableCell>
                            <StyledTableCell align="center">EMAIL</StyledTableCell>
                            <StyledTableCell align="center">MESSAGE</StyledTableCell>
                            <StyledTableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.leads.map((lead) => (
                            <StyledTableRow key={lead.id}>
                                <StyledTableCell align="center" component="th" scope="row">{lead.id}</StyledTableCell>
                                <StyledTableCell align="center">{lead.name}</StyledTableCell>
                                <StyledTableCell align="center">{lead.email}</StyledTableCell>
                                <StyledTableCell align="center">{lead.message}</StyledTableCell>
                                <StyledTableCell>
                                    <Button variant="contained" onClick={this.props.deleteLead.bind(this, lead.id)}>X</Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}

// state => reducer (leads.js) => state (leads)
const mapStateToProps = state => ({
    leads: state.leads.leads
})
export default withStyles(styles)(connect(mapStateToProps, { getLeads, deleteLead })(Leads))
