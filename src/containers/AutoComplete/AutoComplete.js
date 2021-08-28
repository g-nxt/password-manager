import React, {Component, Fragment} from "react";
import classes from './AutoComplete.module.css'


class AutoComplete extends Component {

    static defaultProps = {
        suggestions: []
    };

    constructor(props) {
        super(props);

        this.state = {
            // The active selection's index
            activeSuggestion: 0,
            // The suggestions that match the user's input
            filteredSuggestions: [],
            // Whether or not the suggestion list is shown
            showSuggestions: false,
            // What the user has entered
            userInput: ""
        };
    }

    onChange = e => {
        const {suggestions} = this.props;
        const userInput = e.currentTarget.value.trim();

        // Filter our suggestions that don't contain the user's input
        const filteredSuggestions = suggestions.sort().filter(
            suggestion =>
                suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        );

        // TODO: Fix to fill suggestion and allow to edit
        /*if (filteredSuggestions.length === 1) {
            this.setState({
                activeSuggestion: 0,
                filteredSuggestions,
                showSuggestions: false,
                userInput: filteredSuggestions[0]
            });
            e.currentTarget.value = filteredSuggestions[0]
        } else {*/

        this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput: e.currentTarget.value
        });
        /*}*/
        this.props.userInputDetail(e.currentTarget.value)


    };

    onClick = e => {
        this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: e.currentTarget.innerText
        });
        this.props.userInputDetail(e.currentTarget.innerText)
    };

    onKeyDown = (e) => {
        const {activeSuggestion, filteredSuggestions} = this.state;

        // User pressed the enter key
        if (e.keyCode === "Enter") {
            this.setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: filteredSuggestions[activeSuggestion]
            });
            this.props.userInputDetail(e.currentTarget.value)
        }
        // User pressed the up arrow
        else if (e.key === "ArrowUp") {
            if (activeSuggestion === 0) {
                return;
            }

            this.setState({activeSuggestion: activeSuggestion - 1});
        }
        // User pressed the down arrow
        else if (e.key === "ArrowDown") {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }

            this.setState({activeSuggestion: activeSuggestion + 1});
        }
    };

    setUserInput = (userInput) => {
        if (userInput) {
            this.props.userInputDetail(this.state.userInput)
        }
        /*this.setState((prevState) => {
                if (prevState.userInput !== this.state.userInput) {
                } else {
                    this.props.userInputDetail(this.state.userInput)
                }
            }
        )*/
    }

    render() {
        const {
            onChange,
            onClick,
            onKeyDown,
            state: {
                activeSuggestion,
                filteredSuggestions,
                showSuggestions,
                userInput
            }
        } = this;

        let suggestionsListComponent;

        if (showSuggestions && userInput && !this.props.addingNewApp) {
            if (filteredSuggestions.length) {
                suggestionsListComponent = (
                    <ul className={classes.suggestions}>
                        {filteredSuggestions.map((suggestion, index) => {
                            let className;

                            // Flag the active suggestion with a class
                            if (index === activeSuggestion) {
                                className = classes.suggestionActive;
                            }

                            return (
                                <li className={className} key={suggestion} onClick={onClick}>
                                    {suggestion}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                suggestionsListComponent = (
                    <div className={classes.noSuggestions}>
                        {/*<em>No Apps found!</em>*/}
                    </div>
                );
            }
        }
        //setUserInput()


        return (
            <Fragment>
                <input
                    type="search"
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={userInput}
                    className={classes.Input}
                />
                {suggestionsListComponent}
            </Fragment>
        );
    }
}

export default AutoComplete;