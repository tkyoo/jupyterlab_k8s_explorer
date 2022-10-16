import React from 'react';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';

import { getContext } from '../../handler';
import { CodeMirrorComponent } from '../../common/CodeMirror';
import { DetailComponent } from '../../common/Detail';

type ContextProps = {
  clickItem: Function;
};

type ContextState = {
  items: any[];
  currentItem: any;
  currentContext: any;
};

type ContextObject = {
  metadata: any;
  spec: any;
  status: any;
};

class ContextComponent extends React.Component<
    ContextProps,
    ContextState
> {
  child: React.RefObject<DetailComponent>;

  constructor(prop: ContextProps) {
    super(prop);
    this.state = {
      items: [],
      currentItem: null,
      currentContext: null
    };
    this.child = React.createRef();
    this.getContextList();
  }

  async getContextList() {
    const data = await getContext();

    if ( data !== null ) {
      console.log(this.state);

      this.setState((state:Readonly<ContextState>) => {
        return { 
          items: data[0],
          currentItem: state.currentItem !== null ? Object.assign({}, state.currentItem) : null,
          currentContext: data[1]
        }
      })

    }
  }

  async updateCurrentItem(item: any) {
    this.setState({
      ...this.state,
      ['currentItem']: item
    });
  }

  labels(item: any) {
    const labels = item.metadata.labels;
    const labelsKeys = Object.keys(labels);
    const result: any[] = [];

    labelsKeys.forEach((key: string) => {
      result.push(
        <Button variant="secondary">
          {key}={labels[key]}
        </Button>
      );
    });

    return result;
  }

  checkCurrentContext(item: any) {
    console.log(item);
    console.log(this.state);
    return item.name === this.state.currentContext.name;
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
                <td className="table-content">{JSON.stringify(values[key])}</td>
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
      headers: this.state.currentItem.name,
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
        <td>{item.name}</td>
        <td>{item.context.cluster}</td>
        <td>{item.context.user}</td>
        <td>{this.checkCurrentContext(item) ? "Active" : ""}</td>
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
              <th>Cluster</th>
              <th>User</th>
              <th>Current</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
        {detailContent}
      </div>
    );
  }
}

export { ContextObject, ContextComponent };
