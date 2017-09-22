import * as React from "react";
import {observer} from "mobx-react";
import Snackbar from "material-ui/Snackbar";
import {SNACK_BAR_STORE} from "./stores/app-stores";
import {injectStore} from "./stores/inject-store";
import {SnackBarStore} from "./stores/snack-bar-store";
import Component = React.Component;

@observer
export class SnackBarView extends Component {

  @injectStore(SNACK_BAR_STORE)
  snackBarStore: SnackBarStore;

  public render() {
    const snackBarStore = this.snackBarStore;
    const message = snackBarStore.message;
    return <Snackbar open={!!message}
                     message={message}
                     autoHideDuration={4000}
                     onRequestClose={() => snackBarStore.clearMessage()}/>;
  }
}