import React from 'react';

import {
  ClusterRoleComponent,
  ClusterRoleBindingComponent,
  RoleComponent,
  RoleBindingComponent,
  PodSecurityPolicyComponent,
  ServiceAccountComponent
} from './access-control/Component';
import {
  ConfigMapComponent,
  HPAComponent,
  LimitRangeComponent,
  PodDisruptionBudgetComponent,
  PriorityClassComponent,
  ResourceQuotaComponent,
  SecretComponent
} from './config/Component';
import {
  EndpointComponent,
  IngressComponent,
  NetworkPolicyComponent,
  ServiceComponent
} from './network/Component';
import {
  PVComponent,
  PVCComponent,
  StorageClassComponent
} from './storage/Component';
import {
  CronJobComponent,
  DaemonSetComponent,
  DeploymentComponent,
  JobComponent,
  PodComponent,
  ReplicaSetComponent,
  StatefulSetComponent
} from './workloads/Component';
import { NamespaceComponent } from './Namespace';
import { NodeComponent } from './Node';
import { ContextComponent } from './Context';

type ContentManagerProps = {
  currentContent?: string;
};

type ContentManagerState = {
  currentItem: any;
  openModal: boolean;
};

function EmptyContent() {
  return <div> Blank Page </div>;
}

class ContentManagerComponent extends React.Component<
  ContentManagerProps,
  ContentManagerState
> {
  constructor(prop: ContentManagerProps) {
    super(prop);
    this.state = {
      currentItem: null,
      openModal: false
    };
  }

  setCurrentItem = (item: any): void => {
    this.setState(prevState => ({
      currentItem: {
        ...prevState.currentItem,
        ...item
      },
      openModal: true
    }));
  };

  render(): JSX.Element {
    const currentContent = this.props.currentContent;

    let content;

    switch (currentContent) {
      case 'context': {
        content = (
          <ContextComponent clickItem={this.setCurrentItem} />
        );
        break;
      }
      case 'pod': {
        content = (
          <PodComponent
            objectName={currentContent}
            clickItem={this.setCurrentItem}
          />
        );
        break;
      }
      case 'deployment': {
        content = (
          <DeploymentComponent
            objectName={currentContent}
            clickItem={this.setCurrentItem}
          />
        );
        break;
      }
      case 'daemon_set': {
        content = (
          <DaemonSetComponent
            objectName={currentContent}
            clickItem={this.setCurrentItem}
          />
        );
        break;
      }
      case 'stateful_set': {
        content = (
          <StatefulSetComponent
            objectName={currentContent}
            clickItem={this.setCurrentItem}
          />
        );
        break;
      }
      case 'replica_set': {
        content = (
          <ReplicaSetComponent
            objectName={currentContent}
            clickItem={this.setCurrentItem}
          />
        );
        break;
      }
      case 'job': {
        content = (
          <JobComponent
            objectName={currentContent}
            clickItem={this.setCurrentItem}
          />
        );
        break;
      }
      case 'cron_job': {
        content = (
          <CronJobComponent
            objectName={currentContent}
            clickItem={this.setCurrentItem}
          />
        );
        break;
      }
      case 'config_map': {
        content = (
          <ConfigMapComponent
            objectName={currentContent}
            clickItem={this.setCurrentItem}
          />
        );
        break;
      }
      case 'secret': {
        content = (
          <SecretComponent
            objectName={currentContent}
            clickItem={this.setCurrentItem}
          />
        );
        break;
      }
      case 'resource_quota': {
        content = (
          <ResourceQuotaComponent
            objectName={currentContent}
            clickItem={this.setCurrentItem}
          />
        );
        break;
      }
      case 'limit_range': {
        content = (
          <LimitRangeComponent
            objectName={currentContent}
            clickItem={this.setCurrentItem}
          />
        );
        break;
      }
      case 'horizontal_pod_autoscaler': {
        content = (
          <HPAComponent
            objectName={currentContent}
            clickItem={this.setCurrentItem}
          />
        );
        break;
      }
      case 'pod_disruption_budget': {
        content = (
          <PodDisruptionBudgetComponent
            objectName={currentContent}
            clickItem={this.setCurrentItem}
          />
        );
        break;
      }
      case 'priority_class': {
        content = (
          <PriorityClassComponent
            objectName={currentContent}
            clickItem={this.setCurrentItem}
          />
        );
        break;
      }
      case 'service': {
        content = (
          <ServiceComponent
            objectName={currentContent}
            clickItem={this.setCurrentItem}
          />
        );
        break;
      }
      case 'endpoints': {
        content = (
          <EndpointComponent
            objectName={currentContent}
            clickItem={this.setCurrentItem}
          />
        );
        break;
      }
      case 'ingress': {
        content = (
          <IngressComponent
            objectName={currentContent}
            clickItem={this.setCurrentItem}
          />
        );
        break;
      }
      case 'network_policy': {
        content = (
          <NetworkPolicyComponent
            objectName={currentContent}
            clickItem={this.setCurrentItem}
          />
        );
        break;
      }
      case 'persistent_volume_claim': {
        content = (
          <PVCComponent
            objectName={currentContent}
            clickItem={this.setCurrentItem}
          />
        );
        break;
      }
      case 'persistent_volume': {
        content = (
          <PVComponent
            objectName={currentContent}
            clickItem={this.setCurrentItem}
          />
        );
        break;
      }
      case 'storage_class': {
        content = (
          <StorageClassComponent
            objectName={currentContent}
            clickItem={this.setCurrentItem}
          />
        );
        break;
      }
      case 'service_account': {
        content = (
          <ServiceAccountComponent
            objectName={currentContent}
            clickItem={this.setCurrentItem}
          />
        );
        break;
      }
      case 'cluster_role': {
        content = (
          <ClusterRoleComponent
            objectName={currentContent}
            clickItem={this.setCurrentItem}
          />
        );
        break;
      }
      case 'role': {
        content = (
          <RoleComponent
            objectName={currentContent}
            clickItem={this.setCurrentItem}
          />
        );
        break;
      }
      case 'cluster_role_binding': {
        content = (
          <ClusterRoleBindingComponent
            objectName={currentContent}
            clickItem={this.setCurrentItem}
          />
        );
        break;
      }
      case 'role_binding': {
        content = (
          <RoleBindingComponent
            objectName={currentContent}
            clickItem={this.setCurrentItem}
          />
        );
        break;
      }
      case 'pod_security_policy': {
        content = (
          <PodSecurityPolicyComponent
            objectName={currentContent}
            clickItem={this.setCurrentItem}
          />
        );
        break;
      }
      case 'namespace': {
        content = (
          <NamespaceComponent
            objectName={currentContent}
            clickItem={this.setCurrentItem}
          />
        );
        break;
      }
      case 'node': {
        content = (
          <NodeComponent
            objectName={currentContent}
            clickItem={this.setCurrentItem}
          />
        );
        break;
      }
      default: {
        content = <EmptyContent />;
        break;
      }
    }

    return <div className="inner-content-wrapper">{content}</div>;
  }
}

export { ContentManagerComponent };
