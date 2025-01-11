export class Events {
    constructor(component) {
        this.component = component;
        utils.REACT.bindClassToMethods(this, [
            'onUpdateCredentials',
            'onChangeClientId',
            'onChangeClientSecret',
            'onChangeParameterValue'
        ]);
    }

    onUpdateCredentials() {
        this.component.requests.updateCredentials();
    }

    onChangeParameterValue(e, key) {
        const { component } = this;
        const { form } = component.state;
        form.credentials[key].value = e.target.value;

        component.setState({form});
    }

    onChangeClientId(e) {
        const { component } = this;
        const form = component.state.form;
        form.client_id = e.target.value;
        component.setState({form});
    }

    onChangeClientSecret(e) {
        const { component } = this;
        const form = component.state.form;
        form.client_secret = e.target.value;
        component.setState({form});
    }
}