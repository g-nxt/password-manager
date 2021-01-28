import React, {Component, Fragment} from "react";
import classes from './Apps.module.css'
import Button from "../UI/Button/Button";
import AutoComplete from "../../containers/AutoComplete/AutoComplete";

class Apps extends Component {

    state = {
        displayGetPassword: false,
        displayAddApp: false,
        userInput: '',
        deleteAppConfirmation: false,
        addingNewApp: false
    }
    /*let reactSelectOptions = [{name: 'Gmail', label: 'Gmail'}, {name: 'Outlook', label: 'Outlook'}, {
        name: 'Facebook',
        label: 'Facebook'
    }, {name: 'Instagram', label: 'Instagram'}]*/

    /*const reactSelectOptions = props.apps.map(app => {
        return {name: app, label: app}
    })*/

    /*let selectedApp;*/

    changeHandler = (userInput) => {
        /*if(this.props.disableAppChange) {
            this.setState({
                displayGetPassword: false,
                displayAddApp: false,
            })
        } else {*/
        const userInputLowerCase = userInput.toLowerCase()
        if (this.props.apps.map(v => v.toLowerCase()).indexOf(userInputLowerCase) > -1) {
            this.setState({
                displayGetPassword: true,
                displayAddApp: false,
                userInput: userInput,
                deleteAppConfirmation: false,
                addingNewApp: false
            })
            this.props.usersInput(userInput)
        } else if (userInputLowerCase.toString().length > 0) {
            this.setState({
                displayGetPassword: false,
                displayAddApp: true,
                userInput: userInput,
                deleteAppConfirmation: false,
                addingNewApp: false
            })
            this.props.usersInput(userInput)
        } else {
            this.props.pwdHandler('')
            this.setState({
                displayGetPassword: false,
                displayAddApp: false,
                userInput: '',
                deleteAppConfirmation: false,
                addingNewApp: false
            })
            this.props.usersInput('')
        }
        /*}*/
    }

    addAppHandler = () => {
        this.props.addApp(this.state.userInput)
        this.setState({
            addingNewApp: true,
            displayGetPassword: true
        })
    }

    deleteAppConfirmationHandler = () => {
        if (!this.props.isModalOpen) {
            this.setState({deleteAppConfirmation: true})
            this.props.pwdHandler(this.state.userInput)
            this.props.deleteAppConfirmationPending(true)
        }
    }

    deleteAppCancellationHandler = () => {
        if (!this.props.isModalOpen) {
            this.setState({deleteAppConfirmation: false})
            this.props.deleteAppConfirmationPending(false)
        }
    }


    deleteAppHandler = () => {
        if (!this.props.isModalOpen) {
            this.props.deleteApp(this.state.userInput)
            this.setState({
                deleteAppConfirmation: false,
                displayGetPassword: false,
                displayAddApp: true
            })
        } else {
            this.setState({deleteAppConfirmation: true})
            this.props.pwdHandler(this.state.userInput)
            this.props.deleteAppConfirmationPending(true)
        }
    }


    render() {

        let delConfirmButtons
        let appStyle = [classes.Apps]
        if (this.state.deleteAppConfirmation) {
            appStyle = [classes.Apps, classes.deleteApp]
            delConfirmButtons =
                <Fragment>
                    <Button btnType="Success"
                            clicked={this.deleteAppCancellationHandler}>Cancel</Button>
                    <Button btnType="Danger" clicked={this.deleteAppHandler}>Confirm Delete</Button>
                </Fragment>
        }

        let getPasswordButton
        if (this.state.displayGetPassword) {
            getPasswordButton =
                <Fragment>
                    <Button btnType="Danger" clicked={this.deleteAppConfirmationHandler}>Delete</Button>
                    <Button btnType="Success"
                            clicked={() => this.props.pwdHandler(this.state.userInput)}>Details</Button>
                </Fragment>
        } else {
            getPasswordButton = null
        }

        let addAppButton
        if (this.state.displayAddApp) {
            addAppButton =
                <Button btnType="Danger" clicked={this.addAppHandler}>Add App</Button>
        } else {
            addAppButton = null
        }

        let actionTakerButton
        if (this.props.disableAppChange) {
            actionTakerButton = null
        } else if (this.state.deleteAppConfirmation) {
            actionTakerButton = delConfirmButtons
        } else if (getPasswordButton) {
            actionTakerButton = getPasswordButton
        } else {
            actionTakerButton = addAppButton
        }

        return (
            <div className={appStyle.join(' ')}>
                <form>
                    <h3>Search/Add</h3>
                    <AutoComplete
                        suggestions={this.props.apps}
                        userInputDetail={this.changeHandler}
                        addingNewApp={this.state.addingNewApp}
                    />
                </form>
                {actionTakerButton}
            </div>

        )
    }
}

export default Apps;