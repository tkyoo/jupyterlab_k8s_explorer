import CodeMirror from '@uiw/react-codemirror';
import { sublime } from '@uiw/codemirror-theme-sublime';
import {StreamLanguage} from "@codemirror/language"
import { yaml as codemirrorYaml } from "@codemirror/legacy-modes/mode/yaml"

import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import yaml from 'js-yaml';

import { requestAPI } from "../../handler";
import { DetailComponent } from "../../common/detail";

type NamespaceProps = {
    clickItem: Function,
};

type NamespaceState = {
    items: NamespaceObject[],
    currentItem: any,
};

type NamespaceObject = {
    metadata: any,
    spec: any,
    status: any
};

class NamespaceComponent extends React.Component<NamespaceProps, NamespaceState> {
    child: React.RefObject<DetailComponent>;

    constructor(prop: NamespaceProps) {
        super(prop);
        this.state = {
            items: [],
            currentItem: null,
        };
        this.child = React.createRef();
    }

    async getNamespace() {
        const data = await requestAPI<NamespaceObject[]>("k8s/get_namespace_list");

        this.setState({
            ...this.state,
            ["items"]: data
        })
    }

    async updateCurrentItem(item: NamespaceObject) {
        const url = "k8s/read_namespace?" + new URLSearchParams({
            name: item.metadata.name
        })

        const data = await requestAPI<NamespaceObject>(url);

        console.log(typeof(data), data);

        this.setState({
            ...this.state,
            ["currentItem"]: data
        })
    }

    render(): JSX.Element {
        this.getNamespace();

        const rows = this.state.items.map((item, index) =>
            <tr className="cursor-pointer" onClick={()=> {this.props.clickItem(item); this.updateCurrentItem(item); this.child.current?.openModal(true) }}>
                <td>{index}</td>
                <td>{item.metadata.name}</td>
                <td>Labels</td>
                <td>Age</td>
                <td>Status</td>
            </tr>
        );

        let detailContent;
        const drawDetailContent = this.state.currentItem != null;

        console.log(this.state);

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
                            <CodeMirror
                                theme={sublime}
                                value={yaml.dump(this.state.currentItem)}
                                height="500px"
                                width="500px"
                                extensions={[StreamLanguage.define(codemirrorYaml)]}
                            />

                        </Tab>
                    </Tabs>
                ),
                "openModal": true,
                "confirmEvent": () => { alert("Test!") ;}
            }

            detailContent = <DetailComponent ref={this.child} headers={props.headers} body={props.body} openModal={true} confirmEvent={props.confirmEvent} />
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
                            <th>Labels</th>
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

export {NamespaceObject, NamespaceComponent};
