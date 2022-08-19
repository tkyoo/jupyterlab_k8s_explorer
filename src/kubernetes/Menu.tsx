import React from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import ListGroup from 'react-bootstrap/ListGroup';



type MenuProps = {
    setMenu: Function;
};

type MenuState = {
    currentMenu?: string;
    openWorkloads: boolean,
    openConfig: boolean,
    openNetwork: boolean,
    openStorage: boolean,
    openAccessControl: boolean
}

class MenuComponent extends React.Component<MenuProps, MenuState> {
    constructor(props: MenuProps) {
        super(props);
        this.state = {
            currentMenu: undefined,
            openWorkloads: false,
            openConfig: false,
            openNetwork: false,
            openStorage: false,
            openAccessControl: false
        }
    }

    updateMenu = (menu: string) => {
        this.props.setMenu(menu);
        this.setState(
            {
                currentMenu: menu,
                openWorkloads: this.state.openWorkloads,
                openConfig: this.state.openConfig,
                openNetwork: this.state.openNetwork,
                openStorage: this.state.openStorage,
                openAccessControl: this.state.openAccessControl
            }
        );
    };

    openMenu = (menu:string, state: boolean) => {
        this.setState(
            {
                ...this.state,
                [menu]: state
            }
        ) 
    }

    render() {
        return (
            <div id="menu-items">
                <Button className="menu-item" onClick={(_) => this.updateMenu("cluster")}>
                    Cluster
                </Button>
                <Button className="menu-item" onClick={(_) => this.updateMenu("nodes")}>
                    Nodes
                </Button>
                <Button className="menu-item" onClick={(_) => this.openMenu("openWorkloads", !this.state.openWorkloads)} aria-expanded={this.state.openWorkloads} aria-controls="menu-item-workloads">
                    Workloads
                </Button>
                <Collapse in={this.state.openWorkloads}>
                    <ListGroup className="sub-menu-item">
                        <ListGroup.Item action onClick={(_) => this.updateMenu("pods")} active={this.state.currentMenu == "pods"}> Pods </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("deployments")} active={this.state.currentMenu == "deployments"}> Deployments </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("daemonsets")} active={this.state.currentMenu == "daemonsets"}> DaemonSets </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("statefulsets")} active={this.state.currentMenu == "statefulsets"}> StatefulSets </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("replicasets")} active={this.state.currentMenu == "replicasets"}> ReplicaSets </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("jobs")} active={this.state.currentMenu == "jobs"}> Jobs </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("cronjobs")} active={this.state.currentMenu == "cronjobs"}> CronJobs </ListGroup.Item>
                    </ListGroup>
                </Collapse>
                <Button className="menu-item" onClick={(_) => this.openMenu("openConfig", !this.state.openConfig)} aria-expanded={this.state.openConfig} aria-controls="menu-item-config">
                    Config
                </Button>
                <Collapse in={this.state.openConfig}>
                    <ListGroup className="sub-menu-item">
                        <ListGroup.Item action onClick={(_) => this.updateMenu("configmaps")} active={this.state.currentMenu == "configmaps"}> ConfigMaps </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("secrets")} active={this.state.currentMenu == "secrets"}> Secrets </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("resourceQuotas")} active={this.state.currentMenu == "resourceQuotas"}> Resource Quotas </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("limitRanges")} active={this.state.currentMenu == "limitRanges"}> Limit Ranges </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("hpa")} active={this.state.currentMenu == "hpa"}> HPA </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("podDistruptionBudgets")} active={this.state.currentMenu == "podDistruptionBudgets"}> Pod Disruption Budgets </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("priorityClasses")} active={this.state.currentMenu == "priorityClasses"}> Priority Classes </ListGroup.Item>
                    </ListGroup>
                </Collapse>
                <Button className="menu-item" onClick={(_) => this.openMenu("openNetwork", !this.state.openNetwork)} aria-expanded={this.state.openNetwork} aria-controls="menu-item-network">
                    Network
                </Button>
                <Collapse in={this.state.openNetwork}>
                    <ListGroup className="sub-menu-item">
                        <ListGroup.Item action onClick={(_) => this.updateMenu("services")} active={this.state.currentMenu == "services"}> Services </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("endpoints")} active={this.state.currentMenu == "endpoints"}> Endpoints </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("ingresses")} active={this.state.currentMenu == "ingresses"}> Ingresses</ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("networkPolicies")} active={this.state.currentMenu == "networkPolicies"}> Network Policies </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("portForwarding")} active={this.state.currentMenu == "portForwarding"}> Port Forwarding </ListGroup.Item>
                    </ListGroup>
                </Collapse>
                <Button className="menu-item" onClick={(_) => this.openMenu("openStorage", !this.state.openStorage)} aria-expanded={this.state.openStorage} aria-controls="menu-item-storage">
                    Storage
                </Button>
                <Collapse in={this.state.openStorage}>
                    <ListGroup className="sub-menu-item">
                        <ListGroup.Item action onClick={(_) => this.updateMenu("pvc")} active={this.state.currentMenu == "pvc"}> Persistent Volumn Claims </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("pv")} active={this.state.currentMenu == "pv"}> Persisten Volumes </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("storageClasses")} active={this.state.currentMenu == "storageClasses"}> Storage Classes</ListGroup.Item>
                    </ListGroup>
                </Collapse>
                <Button className="menu-item" onClick={(_) => this.updateMenu("namespaces")}>
                    Namespaces
                </Button>
                <Button className="menu-item" onClick={(_) => this.openMenu("openAccessControl", !this.state.openAccessControl)} aria-expanded={this.state.openAccessControl} aria-controls="menu-item-access-control">
                    Access Control
                </Button>
                <Collapse in={this.state.openAccessControl}>
                    <ListGroup className="sub-menu-item">
                        <ListGroup.Item action onClick={(_) => this.updateMenu("serviceAccounts")} active={this.state.currentMenu == "serviceAccounts"}> Service Accounts </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("clusterRoles")} active={this.state.currentMenu == "clusterRoles"}> Cluster Roles </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("roles")} active={this.state.currentMenu == "roles"}> Roles </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("clusterRoleBindings")} active={this.state.currentMenu == "clusterRoleBindings"}> Cluster Role Bindings </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("roleBindings")} active={this.state.currentMenu == "roleBindings"}> Role Bindings </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("podSecurityPolicies")} active={this.state.currentMenu == "podSecurityPolicies"}> Pod Security Policies </ListGroup.Item>
                    </ListGroup>
                </Collapse>
            </div>
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


/* <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header className="accordion-remove-carrot" onClick={ (event) => this.updateMenu(event, "cluster") }>Cluster</Accordion.Header>
                    <Accordion.Body>
                        <Button variant="primary">Cluster</Button>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header onClick={ (event) => this.updateMenu(event, "nodes") }>Nodes</Accordion.Header>
                    <Accordion.Body>
                        <Button variant="primary">Cluster</Button>
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
            </Accordion> */