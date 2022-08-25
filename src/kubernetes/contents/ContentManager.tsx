import React from 'react';
import { NamespaceComponent } from './Namespace';

type ContentManagerProps = {
    currentContent?: string
};

type ContentManagerState = {
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
        this.state = {}
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
            content = <NamespaceComponent />;
        } else {
            content = <DevelopingContent />;
        }

        return <div className="inner-content-wrapper">
            { drawNamespaceBar && namespaceFilterComponent }
            {content}
          </div>
      }
}

export {ContentManagerComponent}