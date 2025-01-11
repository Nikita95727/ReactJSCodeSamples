import React from "react";

export class TemplateController {
    default(component) {
        const {uid, selectedProvider, onClose, invalidCredentials} = component.props;
        const providerTitle = selectedProvider.title.toLowerCase();

        if (providerTitle.length > 0 && Object.keys(invalidCredentials).length > 0) {
            return (
                <div id={uid} className="modal modal-fade-in-scale-up invalid-credentials-modal"
                     aria-hidden="true" role="dialog" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header d-flex flex-column">
                                <div className="d-flex justify-content-end w-p100">
                                    <button type="button" className="invalid-credentials-close close modal-close"
                                            data-dismiss="modal"
                                            onClick={onClose}
                                            aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <h4 className="modal-title-text">
                                        {providerTitle.charAt(0).toUpperCase() + providerTitle.slice(1)}
                                    </h4>
                                </div>
                            </div>
                            {this[providerTitle](component)}
                        </div>
                    </div>
                </div>
            );
        }

        return null;
    }

    provider(component) {
        const {credentials} = component.state.form;
        const { onClose } = component.props;
        const {onChangeParameterValue, onUpdateCredentials} = component.events;
        const passwordIndex = credentials.findIndex(credential => credential.parameter.toLowerCase() === 'client_secret');
        const passwordItem = credentials[passwordIndex];

        return (
            <div className="modal-body">
                <p className="modal-text mb-0 ml-20">Please enter your current Provider's password:</p>
                <form>
                    <div className="form-group custom-group">
                        <label htmlFor="password" className="col-sm-6">
                            <span className="small label-text bg-white pl-2 pr-2 required-field"><span
                                className="text-danger">*</span> Password</span>
                        </label>
                        <input
                            type="text"
                            id="password"
                            className="form-control wizard-custom-input wizard-custom-input"
                            onChange={e => onChangeParameterValue(e, passwordIndex)}
                            value={passwordItem.value}
                            required
                        />
                        <span className="ml-20 mt-5 text-danger">Wrong password. Please enter the correct</span>
                    </div>
                    <div className="modal-footer mt-25 ml-10 mr-10">
                        <button
                            type="button"
                            className="btn btn-default modal-close-button"
                            onClick={onClose}
                            data-dismiss="modal">
                            Close
                        </button>
                        <button
                            type="submit"
                            onClick={onUpdateCredentials}
                            className="modal-save-button btn btn-success">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}
