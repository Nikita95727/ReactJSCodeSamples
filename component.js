import { CommonComponent } from 'components/common-component';
import {TemplateController} from "./template-controller";
import {Requests} from "./requests";
import {Events} from "./events";

export class DashboardInvalidCredentialsModal extends CommonComponent {
    constructor(props) {
        super(props);
        this.state = {
          form: {
              credentials: []
          },
        };
        this.templateController = new TemplateController(this);
        this.requests = new Requests(this);
        this.events = new Events(this);
        this.requests.loadSSOData();
    }

    componentDidUpdate(prevProps) {
        this.toggleModal();
    }

    componentWillUnmount() {
        $(`#${this.props.uid}`).modal('hide');
    }

    toggleModal() {
        const {
            show = false,
            uid = '',
            mainId = '',
            onShown = () => {},
            onHidden = () => {}
        } = this.props;

        $(`#${uid}`).modal(show ? 'show' : 'hide');
        show ? onShown() : onHidden();

        if(mainId) {
            document.getElementById(mainId).scrollTo(0,0);
        }
    }
}

utils.REACT.domrender(DashboardInvalidCredentialsModal, $('[component=DashboardInvalidCredentialsModal]'));
