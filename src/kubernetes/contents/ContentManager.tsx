import React from 'react';

import { NamespaceComponent } from './Namespace';
// import { CommonWorkloadComponent } from './workloads/Common';
import { DaemonSetComponent } from './workloads/DaemonSets';
import { DeploymentComponent } from './workloads/Deployments';
import { PodComponent } from './workloads/Pods';
import { ReplicaSetComponent } from './workloads/ReplicaSets';
import { StatefulSetComponent } from './workloads/StatefulSets';
import { JobComponent } from './workloads/Jobs';
import { CronJobComponent } from './workloads/CronJobs';
import { ConfigMapComponent } from './config/ConfigMaps';
import { SecretComponent } from './config/Secrets';
import { ResourceQuotaComponent } from './config/ResourceQuotas';
import { LimitRangeComponent } from './config/LimitRange';
import { HPAComponent } from './config/hpa';
import { PodDisruptionBudgetComponent } from './config/PodDistruptionBudget';
import { PriorityClassComponent} from './config/PriorityClass';

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

        console.log(currentContent);
        switch (currentContent) {
            case "pod": {
                content = <PodComponent objectName={currentContent} clickItem={this.setCurrentItem}/>;
                break;
            }
            case "deployment": {
                content = <DeploymentComponent objectName={currentContent} clickItem={this.setCurrentItem}/>;
                break;
            }
            case "daemon_set": {
                content = <DaemonSetComponent objectName={currentContent} clickItem={this.setCurrentItem}/>;
                break;
            }
            case "stateful_set": {
                content = <StatefulSetComponent objectName={currentContent} clickItem={this.setCurrentItem}/>;
                break;
            }
            case "replica_set": {
                content = <ReplicaSetComponent objectName={currentContent} clickItem={this.setCurrentItem}/>;
                break;
            }
            case "job": {
                content = <JobComponent objectName={currentContent} clickItem={this.setCurrentItem}/>;
                break;
            }
            case "cron_job": {
                content = <CronJobComponent objectName={currentContent} clickItem={this.setCurrentItem}/>;
                break;
            }
            case "config_map": {
                content = <ConfigMapComponent objectName={currentContent} clickItem={this.setCurrentItem}/>;
                break;
            }
            case "secret": {
                content = <SecretComponent objectName={currentContent} clickItem={this.setCurrentItem}/>;
                break;
            }
            case "resource_quota": {
                content = <ResourceQuotaComponent objectName={currentContent} clickItem={this.setCurrentItem}/>;
                break;
            }
            case "limit_range": {
                content = <LimitRangeComponent objectName={currentContent} clickItem={this.setCurrentItem}/>;
                break;
            }
            case "horizontal_pod_autoscaler": {
                content = <HPAComponent objectName={currentContent} clickItem={this.setCurrentItem}/>;
                break;
            }
            case "pod_disruption_budget": {
                content = <PodDisruptionBudgetComponent objectName={currentContent} clickItem={this.setCurrentItem}/>;
                break;
            }
            case "priority_class": {
                content = <PriorityClassComponent objectName={currentContent} clickItem={this.setCurrentItem}/>;
                break;
            }
            case "namespace": {
                content = <NamespaceComponent clickItem={this.setCurrentItem}/>;
                break;
            }
            default: {
                content = <EmptyContent />;
                break;
            }
        }

        return (
            <div className="inner-content-wrapper">
                { content }
            </div>
        )
      }
}

export {ContentManagerComponent}