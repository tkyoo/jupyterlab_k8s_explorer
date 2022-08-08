import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';


type MenuProps = {
    setMenu: Function;
};

type MenuState = {
    menu?: string;
}

class MenuComponent extends React.Component<MenuProps, MenuState> {
    constructor(props: MenuProps) {
        super(props);
        this.state = {
            menu: undefined
        }
    }

    updateMenu = (event: React.MouseEvent<HTMLElement, MouseEvent>, menu: string) => {
        event.preventDefault();

        this.props.setMenu(menu);
        this.setState({menu: menu});
    };

    render() {
        return (
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header onClick={ (event) => this.updateMenu(event, "cluster") }>Cluster</Accordion.Header>
                    <Accordion.Body>
                        {/* <Button variant="primary">Cluster</Button> */}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header onClick={ (event) => this.updateMenu(event, "nodes") }>Nodes</Accordion.Header>
                    <Accordion.Body>
                        {/* <Button variant="primary">Cluster</Button> */}
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header onClick={ (event) => this.updateMenu(event, "workloads") }>Workloads</Accordion.Header>
                    <Accordion.Body>
                        <Button variant="primary">Pods</Button>
                        <Button variant="primary">Deployments</Button>
                        <Button variant="primary">DaemonSets</Button>
                        <Button variant="primary">StatefulSets</Button>
                        <Button variant="primary">ReplicaSets</Button>
                        <Button variant="primary">Jobs</Button>
                        <Button variant="primary">CronJobs</Button>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header onClick={ (event) => this.updateMenu(event, "config") }>Config</Accordion.Header>
                    <Accordion.Body>
                        <Button variant="primary">ConfigMaps</Button>
                        <Button variant="primary">Secrets</Button>
                        <Button variant="primary">Resource Quotas</Button>
                        <Button variant="primary">Limit Ranges</Button>
                        <Button variant="primary">HPA</Button>
                        <Button variant="primary">Pod Disruption Budgets</Button>
                        <Button variant="primary">Priority Classes</Button>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                    <Accordion.Header onClick={ (event) => this.updateMenu(event, "network") }>Network</Accordion.Header>
                    <Accordion.Body>
                        <Button variant="primary">Services</Button>
                        <Button variant="primary">Endpoints</Button>
                        <Button variant="primary">Ingresses</Button>
                        <Button variant="primary">Network Policies</Button>
                        <Button variant="primary">Port Forwarding</Button>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                    <Accordion.Header onClick={ (event) => this.updateMenu(event, "storage") }>Storage</Accordion.Header>
                    <Accordion.Body>
                        <Button variant="primary">Persistent Volume Claims</Button>
                        <Button variant="primary">Persistent Volumes</Button>
                        <Button variant="primary">Storage Classes</Button>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="6">
                    <Accordion.Header onClick={ (event) => this.updateMenu(event, "namespace") }>Namespaces</Accordion.Header>
                    <Accordion.Body>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        )
    }

    // return (
    //     <Accordion defaultActiveKey="0">
    //       <Accordion.Item eventKey="0">
    //         <Accordion.Header>Accordion Item #1</Accordion.Header>
    //         <Accordion.Body>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    //           eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
    //           minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    //           aliquip ex ea commodo consequat. Duis aute irure dolor in
    //           reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
    //           pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
    //           culpa qui officia deserunt mollit anim id est laborum.
    //         </Accordion.Body>
    //       </Accordion.Item>
    //       <Accordion.Item eventKey="1">
    //         <Accordion.Header>Accordion Item #2</Accordion.Header>
    //         <Accordion.Body>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    //           eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
    //           minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    //           aliquip ex ea commodo consequat. Duis aute irure dolor in
    //           reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
    //           pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
    //           culpa qui officia deserunt mollit anim id est laborum.
    //         </Accordion.Body>
    //       </Accordion.Item>
    //     </Accordion>
    //   );
}

export {MenuComponent};
