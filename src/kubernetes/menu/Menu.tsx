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
                <Button className="menu-item" onClick={(_) => this.updateMenu("node")}>
                    Nodes
                </Button>
                <Button className="menu-item" onClick={(_) => this.openMenu("openWorkloads", !this.state.openWorkloads)} aria-expanded={this.state.openWorkloads} aria-controls="menu-item-workloads">
                    Workloads
                </Button>
                <Collapse in={this.state.openWorkloads}>
                    <ListGroup className="sub-menu-item">
                        <ListGroup.Item action onClick={(_) => this.updateMenu("pod")} active={this.state.currentMenu == "pod"}> Pods </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("deployment")} active={this.state.currentMenu == "deployment"}> Deployments </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("daemon_set")} active={this.state.currentMenu == "daemon_set"}> DaemonSets </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("stateful_set")} active={this.state.currentMenu == "stateful_set"}> StatefulSets </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("replica_set")} active={this.state.currentMenu == "replica_set"}> ReplicaSets </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("job")} active={this.state.currentMenu == "job"}> Jobs </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("cron_job")} active={this.state.currentMenu == "cron_job"}> CronJobs </ListGroup.Item>
                    </ListGroup>
                </Collapse>
                <Button className="menu-item" onClick={(_) => this.openMenu("openConfig", !this.state.openConfig)} aria-expanded={this.state.openConfig} aria-controls="menu-item-config">
                    Config
                </Button>
                <Collapse in={this.state.openConfig}>
                    <ListGroup className="sub-menu-item">
                        <ListGroup.Item action onClick={(_) => this.updateMenu("config_map")} active={this.state.currentMenu == "config_map"}> ConfigMaps </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("secret")} active={this.state.currentMenu == "secret"}> Secrets </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("resource_quota")} active={this.state.currentMenu == "resource_quota"}> Resource Quotas </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("limit_range")} active={this.state.currentMenu == "limit_range"}> Limit Ranges </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("horizontal_pod_autoscaler")} active={this.state.currentMenu == "horizontal_pod_autoscaler"}> HPA </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("pod_disruption_budget")} active={this.state.currentMenu == "pod_disruption_budget"}> Pod Disruption Budgets </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("priority_class")} active={this.state.currentMenu == "priority_class"}> Priority Classes </ListGroup.Item>
                    </ListGroup>
                </Collapse>
                <Button className="menu-item" onClick={(_) => this.openMenu("openNetwork", !this.state.openNetwork)} aria-expanded={this.state.openNetwork} aria-controls="menu-item-network">
                    Network
                </Button>
                <Collapse in={this.state.openNetwork}>
                    <ListGroup className="sub-menu-item">
                        <ListGroup.Item action onClick={(_) => this.updateMenu("service")} active={this.state.currentMenu == "service"}> Services </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("endpoints")} active={this.state.currentMenu == "endpoints"}> Endpoints </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("ingress")} active={this.state.currentMenu == "ingress"}> Ingresses</ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("network_policy")} active={this.state.currentMenu == "network_policy"}> Network Policies </ListGroup.Item>
                    </ListGroup>
                </Collapse>
                <Button className="menu-item" onClick={(_) => this.openMenu("openStorage", !this.state.openStorage)} aria-expanded={this.state.openStorage} aria-controls="menu-item-storage">
                    Storage
                </Button>
                <Collapse in={this.state.openStorage}>
                    <ListGroup className="sub-menu-item">
                        <ListGroup.Item action onClick={(_) => this.updateMenu("persistent_volume_claim")} active={this.state.currentMenu == "persistent_volume_claim"}> Persistent Volumn Claims </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("persistent_volume")} active={this.state.currentMenu == "persistent_volume"}> Persisten Volumes </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("storage_class")} active={this.state.currentMenu == "storage_class"}> Storage Classes</ListGroup.Item>
                    </ListGroup>
                </Collapse>
                <Button className="menu-item" onClick={(_) => this.updateMenu("namespace")}>
                    Namespaces
                </Button>
                <Button className="menu-item" onClick={(_) => this.openMenu("openAccessControl", !this.state.openAccessControl)} aria-expanded={this.state.openAccessControl} aria-controls="menu-item-access-control">
                    Access Control
                </Button>
                <Collapse in={this.state.openAccessControl}>
                    <ListGroup className="sub-menu-item">
                        <ListGroup.Item action onClick={(_) => this.updateMenu("service_account")} active={this.state.currentMenu == "service_account"}> Service Accounts </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("cluster_role")} active={this.state.currentMenu == "cluster_role"}> Cluster Roles </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("role")} active={this.state.currentMenu == "role"}> Roles </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("cluster_role_binding")} active={this.state.currentMenu == "cluster_role_binding"}> Cluster Role Bindings </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("role_binding")} active={this.state.currentMenu == "role_binding"}> Role Bindings </ListGroup.Item>
                        <ListGroup.Item action onClick={(_) => this.updateMenu("pod_security_policy")} active={this.state.currentMenu == "pod_security_policy"}> Pod Security Policies </ListGroup.Item>
                    </ListGroup>
                </Collapse>
            </div>
        )
    }
}

export {MenuComponent};
