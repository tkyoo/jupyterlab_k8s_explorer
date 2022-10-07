import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


type DetailComponentProps = {
    headers?: string
    body?: any,
    confirmEvent: Function,
    openModal: boolean
};

type DetailComponentState = {
    openModal: boolean
};


class DetailComponent extends React.Component<DetailComponentProps, DetailComponentState> {
    constructor(prop: DetailComponentProps) {
        super(prop);
        this.state = {
            openModal: this.props.openModal
        }
    }

    openModal = (state: boolean) => {
        this.setState(
            {
                ...this.state,
                ["openModal"]: state
            }
        )
        console.log(this.state);
    }

    render() {
        return (
        <Modal show={this.state.openModal} dialogClassName="modal-fit-content" onHide={ () => this.openModal(false) } animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>{this.props.headers}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {this.props.body}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={ () => this.openModal(false) }>
                    Close
                </Button>
                <Button variant="primary" onClick={ () => { this.props.confirmEvent(); this.openModal(false) } }>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
        )
    }
}

export {DetailComponent};
