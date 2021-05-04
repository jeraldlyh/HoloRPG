import React, { Component } from 'react'
import { FormControl, Grid, TextField, Typography, withStyles, Button } from '@material-ui/core'
import { connect } from "react-redux"
import PropTypes from 'prop-types'

import { addLead } from "../../actions/leads"

const styles = theme => ({
    textFieldLabel: {
        color: "hsl(0, 0%, 85%)"
    },
    notchedOutline: {
        borderWidth: '1px',
        borderColor: `${theme.palette.primary.light} !important`
    },
    cssFocused: {},
    outlinedInput: {
        '&$cssFocused $notchedOutline': {
            borderColor: `${theme.palette.primary.main} !important`,
        }
    },
})

export class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            email: "",
            message: "",
        }
        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleOnSubmit = this.handleOnSubmit.bind(this)
    }

    static propTypes = {
        addLead: PropTypes.func.isRequired
    }

    handleOnChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleOnSubmit(e) {
        e.preventDefault()
        console.log(this.state)
        const { name, email, message } = this.state
        const lead = { 
            name: name, 
            email: email, 
            message: message 
        }
        this.props.addLead(lead)
        this.setState({
            name: "",
            email: "",
            message: ""
        })
    }

    renderTextField(id, label) {
        const { classes } = this.props
        return (
            <TextField
                InputLabelProps={{
                    classes: {
                        root: classes.textFieldLabel,
                        focused: classes.cssFocused
                    }
                }}
                InputProps={{
                    classes: {
                        root: classes.outlinedInput,
                        focused: classes.cssFocused,
                        notchedOutline: classes.notchedOutline
                    }
                }}
                onChange={this.handleOnChange}
                required={true}
                id={id}
                label={label}
                size="small"
                margin="dense"
                variant="outlined"
            />
            )
        }
        
    render() {
        return (
            <Grid container direction="column" spacing={1}>
                <Grid item xs={12} align="center">
                    <FormControl component="fieldset">
                        <Typography variant="h5">ADD LEAD</Typography>
                        {this.renderTextField("name", "Name")}
                        {this.renderTextField("email", "Email")}
                        {this.renderTextField("message", "Message")}
                        
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color="primary" variant="contained" onClick={this.handleOnSubmit}>Create</Button>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(connect(null, { addLead })(Form))
