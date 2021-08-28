import React, {Component, Fragment} from "react";
import Header from "../../components/Apps/Header/Header";
import UsersList from "../../components/UserDetails/UsersList/UsersList";
import Apps from "../../components/Apps/Apps";
import PasscodeConfirmation from "../Passcode/PasscodeConfirmation/PasscodeConfirmation";
import Modal from "../../components/UI/Modal/Modal"
import {DELETE_APP, DELETE_USER, EDIT_USER} from "./PasswordManagerActions";


class PasswordManager extends Component {

    // Should be replaced with external data
    state = {
        userInputLength: 0,
        deleteAppConfirmationPending: false,
        isGetPassword: false,
        userToBeLoaded: '',
        userArrayToLoad: [],
        pinNeeded: false,
        actionType: '',
        appToBeDeleted: '',
        userToBeModified: '',
        passToBeModified: '',
        pin: '',
        /*apps: [],
        userDetails: []*/
        apps: ['Test'],
        userDetails: [
            {
                app: 'Test',
                users: {
                    user: ['TestUser'],
                    pwd: ['TestPassword']
                }
            },]
    }

    componentDidMount() {
        console.log('Before DB Call: ')
        console.log(this.state)
        this.getFromDB()
        console.log('After DB Call: ')
        console.log(this.state)
    }

    getFromDB = () => {
        /*axios.get(' http://192.168.0.14:5000/apps/')
            .then(r => {
                this.setState({
                    apps: r.data[0].apps,
                    userDetails: r.data[0].userDetails
                }, () => {console.log(this.state.apps)})
            })*/
    }

    /*componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(prevState.apps !== this.state.apps)
        console.log(prevState.userDetails !== this.state.userDetails)
        if((prevState.apps !== this.state.apps) || (prevState.userDetails !== this.state.userDetails)) {
            console.log('Component Did Update: ')
            console.log(this.state)
            this.postToDB()
        }
    }*/

    postToDB = () => {
        console.log('Post DB Method called...')
        /*axios.post(' http://192.168.0.14:5000/apps/add', this.state)
            .then(r => {
                if(r.status === 200) {
                    //setTimeout(this.getFromDB(),500)
                } else {
                    throw new DOMException ('DB Connection Failed')
                }
            })*/

    }

    userInputHandler = (inputText) => {
        if (inputText.length !== this.state.userInputLength) {
            this.setState({
                isGetPassword: false,
                userToBeLoaded: '',
                userInputLength: inputText.length
            }, () => {
            })
        }
    }

    passwordHandler = (app) => {
        let pwdDisplay = true
        if (app === '') {
            pwdDisplay = false
        }
        this.setState({
            isGetPassword: pwdDisplay,
            userToBeLoaded: app,
        })
    }

    addAppHandler = (app) => {
        console.log(this.state.userDetails)
        this.state.apps.push(app)
        const newApp = {
            app: app,
            users: {
                user: [],
                pwd: []
            }
        }
        /* const usrDetailClone = [...this.state.userDetails].map(a => {
             return {...a}.map((b, c) => {return [...b], [...c]})
         })*/
        this.state.userDetails.push(newApp)
        this.setState({
            isGetPassword: true,
            userToBeLoaded: app,
        }, () => {
            console.log(this.state.userDetails)
        })
    }

    deleteAppHandler = (app) => {
        this.getFromDB()
        let appFilter = [...this.state.apps].filter(elt => {
            return elt.toLowerCase() !== app.toLowerCase()
        })

        this.setState({
            apps: appFilter,
            userDetails: this.state.userDetails.filter(elt => {
                return elt.app.toLowerCase() !== app.toLowerCase()
            }),
            isGetPassword: false,
            deleteAppConfirmationPending: false,
            userToBeLoaded: '',
            pinNeeded: true
        }, () => {
        })
    }

    addUserHandler = (newUser, newPassword) => {
        this.getFromDB()
        let usersFilter = this.state.userDetails.filter(elt => {
            return elt.app.toLowerCase() === this.state.userToBeLoaded.toLowerCase()
        })[0].users
        usersFilter.user.push(newUser)
        usersFilter.pwd.push(newPassword)
        this.setState({
            isGetPassword: true
        }, () => {
        })
    }

    editUserHandler = (userName, newPassword) => {
        this.getFromDB()
        let usersFilter = this.state.userDetails.filter(elt => {
            return elt.app.toLowerCase() === this.state.userToBeLoaded.toLowerCase()
        })[0].users
        usersFilter.pwd[usersFilter.user.indexOf(userName)] = newPassword
        this.setState({
            isGetPassword: true
        }, () => {
        })
    }

    deleteUserHandler = (delUser, delPassword) => {
        this.getFromDB()
        let usersFilter = this.state.userDetails.filter(elt => {
            return elt.app.toLowerCase() === this.state.userToBeLoaded.toLowerCase()
        })[0].users
        usersFilter.user = ([...usersFilter.user].filter((val) => {
            return val !== delUser
        }))
        usersFilter.pwd = ([...usersFilter.pwd].filter((val) => {
            return val !== delPassword
        }))
        this.setState({
            isGetPassword: true
        }, () => {
        })
    }

    flipModalVisibility = () => this.setState({pinNeeded: !this.state.pinNeeded})

    deleteAppPassCodeHandler = (app) => this.setState({
        pinNeeded: true,
        actionType: DELETE_APP,
        appToBeDeleted: app
    })

    userModPassCodeHandler = (userName, passwd) => this.setState({
        pinNeeded: true,
        actionType: EDIT_USER,
        userToBeModified: userName,
        passToBeModified: passwd
    })

    delUserPassCodeHandler = (userName, passwd) => this.setState({
        pinNeeded: true,
        actionType: DELETE_USER,
        userToBeModified: userName,
        passToBeModified: passwd
    })

    passCodeConfirmationAction = () => {
        switch (this.state.actionType) {
            case DELETE_APP:
                this.deleteAppHandler(this.state.appToBeDeleted)
                this.flipModalVisibility()
                break
            case EDIT_USER:
                this.editUserHandler(this.state.userToBeModified, this.state.passToBeModified)
                this.flipModalVisibility()
                break
            case DELETE_USER:
                this.deleteUserHandler(this.state.userToBeModified, this.state.passToBeModified)
                this.flipModalVisibility()
                break
            default:
                this.setState({actionType: ''})
        }
        /*this.setState({actionType: ''})*/

    }

    passCodeCancellationAction = () => {
        this.flipModalVisibility()
    }


    render() {
        let userList
        if (this.state.isGetPassword) {
            const toLoad = this.state.userDetails.filter(elt => {
                return elt.app.toLowerCase() === this.state.userToBeLoaded.toLowerCase()
            })
            userList = <UsersList app={this.state.userToBeLoaded}
                                  newUserDetail={(newUser, newPassword) => this.addUserHandler(newUser, newPassword)}
                                  editUserDetail={(userName, newPassword) => this.userModPassCodeHandler(userName, newPassword)}
                                  delUserDetail={(delUser, delPassword) => this.delUserPassCodeHandler(delUser, delPassword)}
                                  delAppConfirmationPending={this.state.deleteAppConfirmationPending}
                                  isUserEmpty={toLoad.map(elt => {
                                      return elt.users.user.length === 0
                                  })[0]}
                                  userList={toLoad.map(elt => {
                                      return elt.users.user
                                  })}
                                  pwdList={toLoad.map(elt => {
                                      return elt.users.pwd
                                  })}/>
        } else {
            /*userList = <div className={classes.pickApp}><input type="image" src={NothingtoSee} alt=""/></div>;*/
            /*userList = <div className={classes.pickApp}>Please pick or add an app for details</div>;*/
        }


        let passCode = null
        if (this.state.pinNeeded) {
            this.passCodeConfirmationAction() // Disable this line and enable below code to ask for the pin
            /*passCode = <PasscodeConfirmation
                pin={this.state.pin}
                show={true}
                modalClosed={this.flipModalVisibility}
                passcodeConfirmed={this.passCodeConfirmationAction}
                passcodeCanceled={this.passCodeCancellationAction}>
            </PasscodeConfirmation>*/
        }

        let completeApp =
            (
                <div>
                    <Header/>
                    <Apps
                        apps={this.state.apps}
                        pwdHandler={this.passwordHandler}
                        addApp={this.addAppHandler}
                        disableAppChange={this.state.disableAppChange}
                        deleteApp={(app) => this.deleteAppPassCodeHandler(app)}
                        usersInput={this.userInputHandler}
                        deleteAppConfirmationPending={(result) => this.setState({deleteAppConfirmationPending: result})}
                        isModalOpen={this.state.pinNeeded}
                    />
                    {/*<hr className={classes.rounded}/>*/}
                    {userList}
                </div>
            )


        return (
            /*this.state.pinNeeded ? passCode :*/
            <Fragment>
                {/*{passCode}*/}
                <Modal show={this.state.pinNeeded} modalClosed={this.flipModalVisibility}>
                    {passCode}
                </Modal>
                {completeApp}
            </Fragment>
        )
    }

}

export default PasswordManager