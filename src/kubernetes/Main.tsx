// import { Message } from '@lumino/messaging';
import React from 'react';
import { ReactWidget } from '@jupyterlab/apputils';

import { ContentManagerComponent } from "./contents/ContentManager";
import { MenuComponent } from "./menu/Menu"

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
      return <div className="k8s-explorer-wrapper">
          <div className="menu-sidebar">
            <MenuComponent setMenu={this.setCurrentMenu} />
          </div>
          <div className="content">
            <ContentManagerComponent currentContent={this.state.currentMenu} />
          </div>
        </div>
    }
}

class KuberentesMainWidget extends ReactWidget {
    render(): JSX.Element {
      return <KubernetesMainComponent />;
    }
}

export default KuberentesMainWidget;
