import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/button'
import React from 'react'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'

export default class SellStockModal extends React.Component {

  state={ currentQuantity: null }

    handleChange = (e) => {
        this.setState({currentQuantity: e.target.value})
        // console.log(this.props.stock.ticker)
        // if(this.state.currentQuantity>this.props.stock.quantity){
        //     this.setState({validationString: "You cannot sell stocks that you dont have!"})
        // } 
        // else {
        //     this.setState({validationString: null})
        // }
    }

  render(){
    return(
        
      <Modal 
        show={this.props.sellModalState} 
        onHide={this.props.shutModal}
      >
      <Modal.Header closeButton>
        <Modal.Title>{this.props.pDB.ticker}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Form.Group >
              <p>Current Price: {this.props.currPrice}</p>
              <p>Money in Wallet: ${Math.round(100*this.props.wallet)/100}</p>
              <Form.Label>Quantity: </Form.Label>
              <Form.Control type="number" onChange={this.handleChange} value={this.state.currentQuantity} placeholder="0"/>           
          </Form.Group>
          { (this.state.currentQuantity>this.props.pDB.quantity) ? <p className='text-danger'>You cannot sell stocks that you dont have!</p> : null}
      </Modal.Body>
      <Modal.Footer>
            <Row>
                <Col>
                    <p>
                        Total: {this.state.currentQuantity ? Math.round(this.props.currPrice*this.state.currentQuantity*100)/100 : 0}
                    </p>
                </Col>
                <Col>
                {(this.state.currentQuantity>this.props.pDB.quantity) && this.state.currentQuantity>0 ?
                    <Button variant="primary" type="submit" disabled>
                        Sell
                    </Button> :
                    <Button variant="primary" type="submit" onClick={() => {
                            this.props.handleSubmit(this.state.currentQuantity, this.props.currentPrice)
                            this.props.closeModal()
                        }}>
                        Sell
                    </Button>}
                </Col>
            </Row>
      </Modal.Footer>
    </Modal>
    )
  }
}