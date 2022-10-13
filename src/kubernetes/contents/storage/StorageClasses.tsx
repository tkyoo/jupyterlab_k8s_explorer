import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';

import { getGlobalObjectList, readGlobalObject } from '../../../handler';
import { CodeMirrorComponent } from '../../../common/CodeMirror';
import { DetailComponent } from '../../../common/Detail';

type StorageClassProps = {
  clickItem: Function;
  objectName: string;
};

type StorageClassState = {
  items: any[];
  currentItem: any;
};

type StorageClassObject = {
  metadata: any;
  spec: any;
  status: any;
};

class StorageClassComponent extends React.Component<
  StorageClassProps,
  StorageClassState
> {
  child: React.RefObject<DetailComponent>;
  objectName: string;

  constructor(prop: StorageClassProps) {
    super(prop);
    this.state = {
      items: [],
      currentItem: null
    };
    this.child = React.createRef();
    this.objectName = this.props.objectName;
    this.getItemList();
  }

  async getItemList() {
    const data = await getGlobalObjectList(this.objectName);

    this.setState({
      ...this.state,
      ['items']: data.items
    });
  }

  async updateCurrentItem(item: any) {
    const data = await readGlobalObject(this.objectName, item.metadata.name);

    console.log(typeof data, data);

    this.setState({
      ...this.state,
      ['currentItem']: data
    });
  }

  checkDefault(item: any) {
    if (Object.prototype.hasOwnProperty.call(item.metadata, 'annotations')) {
      if (
        Object.prototype.hasOwnProperty.call(
          item.metadata.annotations,
          'storageclass.kubernetes.io/is-default-class'
        )
      ) {
        if (
          item.metadata.annotations[
            'storageclass.kubernetes.io/is-default-class'
          ] === 'true'
        ) {
          return 'true';
        }
      }
    }

    return 'false';
  }

  drawDetailContents(): JSX.Element {
    const detailRows = Object.keys(this.state.currentItem).map(key => {
      const values = this.state.currentItem[key];

      if (values !== null) {
        if (typeof values === 'object') {
          const innerRows = Object.keys(values).map(key => {
            return (
              <tr>
                <td>{key}</td>
                <td>{JSON.stringify(values[key])}</td>
              </tr>
            );
          });

          return (
            <div>
              <h3>{key}</h3>
              <Table>
                <tbody>{innerRows}</tbody>
              </Table>
            </div>
          );
        } else {
          return (
            <div>
              <h3>{key}</h3>
              <p>{values}</p>
            </div>
          );
        }
      } else {
        return <div></div>;
      }
    });

    const props = {
      headers: this.state.currentItem.metadata.name,
      body: (
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
      openModal: true,
      confirmEvent: () => {
        alert('Test!');
      }
    };

    return (
      <DetailComponent
        ref={this.child}
        headers={props.headers}
        body={props.body}
        openModal={true}
        confirmEvent={props.confirmEvent}
      />
    );
  }

  render(): JSX.Element {
    const rows = this.state.items.map((item, index) => (
      <tr
        className="cursor-pointer"
        onClick={() => {
          this.props.clickItem(item);
          this.updateCurrentItem(item);
          this.child.current?.openModal(true);
        }}
      >
        <td>{index}</td>
        <td>{item.metadata.name}</td>
        <td>{item.provisioner}</td>
        <td>{item.reclaim_policy}</td>
        <td>{this.checkDefault(item)}</td>
        <td>{item.metadata.creation_timestamp}</td>
      </tr>
    ));

    let detailContent;
    const drawDetailContent = this.state.currentItem !== null;

    console.log(this.state);

    if (drawDetailContent) {
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
              <th>Provisioner</th>
              <th>Reclaim Policy</th>
              <th>Default</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
        {detailContent}
      </div>
    );
  }
}

export { StorageClassObject, StorageClassComponent };