import React from 'react';

import { NamespaceComponent } from './Namespace';

type ContentManagerProps = {
    currentContent?: string
};

type ContentManagerState = {
    currentItem: any,
    openModal: boolean
}

function EmptyContent() {
    return (
      <div> Blank Page </div>
    );
}

function DevelopingContent() {
    return (
      <div> 개발중 </div>
    );
}

function NamespaceFilterBar() {
    return (
      <div> namespace filter bar </div>
    );
}

class ContentManagerComponent extends React.Component<ContentManagerProps, ContentManagerState> {
    constructor(prop: ContentManagerProps) {
        super(prop);
        this.state = {
            currentItem: null,
            openModal: false
        }
    }

    setCurrentItem = (item:any) => {
        console.log(item);
        // this.setState(
        //     {
        //         ...this.state,
        //         ["currentItem"]: item
        //     }
        // );

        this.setState(prevState => ({
            currentItem: {
              ...prevState.currentItem,
              ...item
            },
            openModal: true
        }));

        // this.openModal(true);
        console.log(this.state);
    }

    render(): JSX.Element {
        const currentContent = this.props.currentContent;

        let content;
        let namespaceFilterComponent = <NamespaceFilterBar />;

        // TODO
        // Add more items which require a namespace filter bar feature
        const namespaceFilterContent = ["pods", "deployments", "daemonsets"]
        const drawNamespaceBar = namespaceFilterContent.includes(currentContent == undefined ? "" : currentContent);

        if ( currentContent == undefined ) {
            content = <EmptyContent />;
        } else if ( currentContent == "namespaces" ) {
            content = <NamespaceComponent clickItem={this.setCurrentItem}/>;
        } else {
            content = <DevelopingContent />;
        }

        console.log(this.state.currentItem);
        return (
            <div className="inner-content-wrapper">
                { drawNamespaceBar && namespaceFilterComponent }
                { content }
            </div>
        )
      }
}

export {ContentManagerComponent}