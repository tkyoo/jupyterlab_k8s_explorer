import React from 'react';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';

import { getObjectList, readObject } from "../../../handler";
import { CodeMirrorComponent } from "../../../common/CodeMirror";
import { DetailComponent } from "../../../common/Detail";

type ServiceProps = {
    clickItem: Function,
    objectName: string
};

type ServiceState = {
    items: any[],
    currentItem: any,
};

type ServiceObject = {
    metadata: any,
    spec: any,
    status: any
};

class ServiceComponent extends React.Component<ServiceProps, ServiceState> {
    child: React.RefObject<DetailComponent>;
    objectName: string;

    constructor(prop: ServiceProps) {
        super(prop);
        this.state = {
            items: [],
            currentItem: null,
        };
        this.child = React.createRef();
        this.objectName = this.props.objectName;
        this.getItemList();
    }

    async getItemList() {
        const data = await getObjectList(this.objectName);

        this.setState({
            ...this.state,
            ["items"]: data.items
        })
    }

    async updateCurrentItem(item: any) {
        const data = await readObject(this.objectName, item.metadata.namespace, item.metadata.name);

        this.setState({
            ...this.state,
            ["currentItem"]: data
        })
    }

    conditions(item: any) {
        if ( item.status.hasOwnProperty("conditions") ) {
            return "Pending"
        } else {
            return "Active"
        }
    }

    externalIPs(item: any) {
        if (item.spec.hasOwnProperty("external_i_ps")) {
            return item.spec.external_i_ps.join(",");
        } else {
            return "-";
        }
    }

    ports(item: any) {
        const portList : string[] = [];

        item.spec.ports.forEach( (port : any) => {
            if ( port.port == port.target_port ) {
                portList.push(port.port.toString() + "/" + port.protocol);
            } else {
                portList.push(port.port.toString() + ":" + port.target_port.toString() + "/" + port.protocol);
            }
        });

        return portList.join(",");
    }

    selector(item: any) {
        if ( item.spec.hasOwnProperty("selector") ) {
            const selector = item.spec.selector;
            const selectorKeys = Object.keys(selector);
            const result : any[] = [];

            selectorKeys.forEach( (key: string) => {
                result.push(<Button variant="secondary">{key}={selector[key]}</Button>);
            });

            return result
        } else {
            return "";
        }
    }

    drawDetailContents(): JSX.Element {
        let detailRows = Object.keys(this.state.currentItem).map( (key) => {
            const values = this.state.currentItem[key];

            if ( values != null ) {
                if ( typeof (values) == "object" ) {
                    const innerRows = Object.keys(values).map( (key) => {
                        return <tr>
                            <td>{key}</td>
                            <td className="table-content">{JSON.stringify(values[key])}</td>
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

        const props = {
            "headers": this.state.currentItem.metadata.name,
            "body": (
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
                        <CodeMirrorComponent code={this.state.currentItem} />
                    </Tab>
                </Tabs>
            ),
            "openModal": true,
            "confirmEvent": () => { alert("Test!") ;}
        }

        return <DetailComponent ref={this.child} headers={props.headers} body={props.body} openModal={true} confirmEvent={props.confirmEvent} />
    }

    render(): JSX.Element {
        console.log(typeof(this.state.items), this.state.items);
        const rows = this.state.items.map((item, index) =>
            <tr className="cursor-pointer" onClick={()=> {this.props.clickItem(item); this.updateCurrentItem(item); this.child.current?.openModal(true) }}>
                <td>{index}</td>
                <td>{item.metadata.name}</td>
                <td>{item.metadata.namespace}</td>
                <td>{item.spec.type}</td>
                <td>{item.spec.cluster_ip}</td>
                <td>{this.ports(item)}</td>
                <td>{this.externalIPs(item)}</td>
                <td>{this.selector(item)}</td>
                <td>{item.metadata.creation_timestamp}</td>
                <td>{this.conditions(item)}</td>
            </tr>
        );

        let detailContent;
        const drawDetailContent = this.state.currentItem != null;

        console.log(this.state);

        if ( drawDetailContent ) {
            detailContent = this.drawDetailContents();
        } else {
            detailContent = null;
        }

        return (
            <div>
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Namespace</th>
                            <th>Type</th>
                            <th>Cluster IP</th>
                            <th>Ports</th>
                            <th>External IP</th>
                            <th>Selector</th>
                            <th>Age</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </Table>
                {detailContent}
            </div>
        )
    }
}

export {ServiceObject, ServiceComponent};
