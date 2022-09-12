import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';

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

    openModal = (state: boolean) => {
        this.setState(
            {
                ...this.state,
                ["openModal"]: state
            }
        )
        console.log(this.state);
    }

    render(): JSX.Element {
        const currentContent = this.props.currentContent;

        let content;
        let detailContent;
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

        const drawDetailContent = this.state.currentItem != null;

        if ( drawDetailContent ) {
            let detailRows = Object.keys(this.state.currentItem).map( (key) => {
                const values = this.state.currentItem[key];

                if ( values != null ) {
                    if ( typeof (values) == "object" ) {
                        const innerRows = Object.keys(values).map( (key) => {
                            return <tr>
                                <td>{key}</td>
                                <td>{JSON.stringify(values[key])}</td>
                            </tr>
                        });

                        return (
                            <div>
                                <h3>{key}</h3>
                                <Table>
                                    <tbody>
                                        {innerRows}
                                    </tbody>
                                </Table>
                            </div>
                        )
                    } else {
                        return (
                            <div>
                                <h3>{key}</h3>
                                <p>{values}</p>
                            </div>
                        )
                    }
                } else {
                    return (<div></div>)
                }
            });

            detailContent = (
                <Tabs
                    defaultActiveKey="detail"
                    transition={false}
                    id="detail-tabs"
                    className="mb-3"
                >
                    <Tab eventKey="detail" title="Detail">
                        {detailRows}
                    </Tab>
                    <Tab eventKey="yaml" title="YAML">
                    </Tab>
                </Tabs>
            )
        } else {
            detailContent = null;
        }

        console.log(this.state.currentItem);
        console.log(drawDetailContent, detailContent);

        return <div>
            <div className="inner-content-wrapper">
                { drawNamespaceBar && namespaceFilterComponent }
                { content }
            </div>
            <Modal show={this.state.openModal} onHide={ () => this.openModal(false) } animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {detailContent}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={ () => this.openModal(false) }>
                            Close
                        </Button>
                        <Button variant="primary" onClick={ () => this.openModal(false) }>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
        </div>
      }
}

export {ContentManagerComponent}