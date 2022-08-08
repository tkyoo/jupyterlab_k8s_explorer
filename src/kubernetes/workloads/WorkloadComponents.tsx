import React from 'react';
import Form from 'react-bootstrap/Form';

import { NamespaceObject, KubernetesWorkload } from './WorkloadManager';

type NamespaceProps = {
    header: string;
};

type NamespaceState = {
    isLoaded: boolean;
    items: NamespaceObject[];
    error?: Error;
}

class NamespaceComponent extends React.Component<NamespaceProps, NamespaceState> {
    constructor(props: NamespaceProps) {
        super(props);
        this.state = {
          error: undefined,
          isLoaded: false,
          items: []
        };
    }

    componentDidMount() {
        const workload = new KubernetesWorkload();

        workload.getNamespace()
        .then( (data) => {
            this.setState({
                isLoaded: true,
                items: data
            });
        })
        .catch( (error) => {
            this.setState({
                isLoaded: true,
                error: error
            });
        })
    }

    render() {
        const {isLoaded, error, items} = this.state;

        if (error) {
          return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div>Loading...</div>;
        } else {
          return (
            <Form.Select aria-label="Default select example">
                {items.map(item => (
                    <option value={item.metadata.name}>{item.metadata.name}</option>
                ))}
            </Form.Select>
          );
        }
      }
}

export {NamespaceComponent};
