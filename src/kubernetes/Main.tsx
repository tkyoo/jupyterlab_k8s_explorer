// import { Message } from '@lumino/messaging';
import React from 'react';
import { ReactWidget } from '@jupyterlab/apputils';

import { MenuComponent } from "./Menu"

type MainProps = {
};

type MainState = {
    currentMenu?: string
}

// Display menu (left-container) and contents (right-container) components with event bus
class KubernetesMainComponent extends React.Component<MainProps, MainState> {
    // readonly workload: KubernetesWorkload;
    // readonly summary: HTMLParagraphElement;

    constructor(prop: MainProps) {
        super(prop);
        this.state = {
          currentMenu: undefined
        }
    }

    setCurrentMenu = (menu:string) => {
      this.setState({currentMenu:menu});
      console.log(menu);
    }

    render(): JSX.Element {
      return <div>
          <div className="menu-sidebar">
            <MenuComponent setMenu={this.setCurrentMenu} />
          </div>
          <div className="content">

          </div>
        </div>
    }
}

// class NamespaceWidget extends ReactWidget {
//     /**
//      * Constructs a new CounterWidget.
//      */
//     constructor() {
//       super();
//       this.addClass('jp-ReactWidget');
//     }
  
//     render(): JSX.Element {
//       return <NamespaceComponent header="Test" />;
//     }
// }

class KuberentesMainWidget extends ReactWidget {
    render(): JSX.Element {
      return <KubernetesMainComponent />;
    }
}

export default KuberentesMainWidget;
