export class Requests {
    constructor(component) {
        this.component = component;
        utils.REACT.bindClassToMethods(this, ['loadSSOData', 'updateCredentials']);
    }

    loadSSOData() {
        const { component } = this;

        $.ajax({
            url: laroute.route('v2.dashboard.get-users-sso-credentials'),
            method: 'GET',
            success: function (data) {
                const { form }  = component.state;
                form.credentials = data;
                component.setState({form});
            }
        });
    }

    updateCredentials() {
        const { component } = this;
        const { form } = component.state;
        const { checkCredentials } = component.props;

        $.ajax({
           url: laroute.route('v2.dashboard.update-users-sso-credentials'),
           method: 'PUT',
           data: form,
           success: function () {
               if (typeof checkCredentials === 'function') {
                   checkCredentials();
               }
           }
        });
    }
}
