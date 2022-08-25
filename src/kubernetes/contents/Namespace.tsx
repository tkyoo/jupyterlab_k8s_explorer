import React from 'react';
import Table from 'react-bootstrap/Table';

import { requestAPI } from "../../handler";

type NamespaceProps = {
};

type NamespaceState = {
    items: NamespaceObject[]
};

type NamespaceObject = {
    metadata: {
        name: string
    }
};

class NamespaceComponent extends React.Component<NamespaceProps, NamespaceState> {
    constructor(prop: NamespaceProps) {
        super(prop);
        this.state = {
            items: []
        }
    }

    async getNamespace() {
        const data = await requestAPI<NamespaceObject[]>("k8s/get_namespace_list");

        this.setState({
            items: data
        })

    }

    render(): JSX.Element {
        this.getNamespace();

        const rows = this.state.items.map((item, index) =>
            <tr className="cursor-pointer" onClick={()=> console.log(item)}>
                <td>{index}</td>
                <td>{item.metadata.name}</td>
                <td>Labels</td>
                <td>Age</td>
                <td>Status</td>
            </tr>
        );

        return (
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
        )
    }
}

export {NamespaceObject, NamespaceComponent};
