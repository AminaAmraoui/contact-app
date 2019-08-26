import React, { Component } from "react"
import Modal from "react-modal"
import axios from 'axios'
import './Modal.css'

class ModalContact extends Component {
    constructor(props){
        super(props)
        this.state = {
            _id: this.props.contact._id,
            name: this.props.contact.name,
            tel: this.props.contact.tel,
            email: this.props.contact.email
        }
    }

    componentDidUpdate(previousProps, previousState) {
        if (previousProps.contact.name !== this.props.contact.name) { //condition before setState to avoid loop
            this.setState({
                _id: this.props.contact._id,
                name: this.props.contact.name,
                tel: this.props.contact.tel,
                email: this.props.contact.email
            })
        }
    }
 
    getNewInputs = e => {
        this.setState({
          [e.target.name]: e.target.value
        });
      }

    updateData(index,newContact){
        axios.put("http://localhost:8000/modify_contact/"+index, newContact)
            .then(res => { 
            console.log('then response '+res.statusText)
            this.getData()
            })
        .catch(error => {
            console.log('error message '+error.message);
            }) 
    }  

    render(){
        
        console.log('contact props ',this.props.contact)
        console.log('contact stats ',this.state)
        return (
            <div className="container-fluid">
                <Modal
                    ariaHideApp={false}
                    isOpen={this.props.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.props.openModal}
                    contentLabel="Edit Contact"
                >
                    <form>
                        <div className="form-group row">
                            <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" name="name" id="inputName" value={this.state.name}
                                    onChange={(e)=>this.getNewInputs(e)}>
                                </input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputTel" className="col-sm-2 col-form-label">Telephone</label>
                            <div className="col-sm-10">
                                <input type="number" className="form-control" name="tel" id="inputTel" value={this.state.tel}
                                    onChange={(e)=>this.getNewInputs(e)}>
                                </input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
                            <div className="col-sm-10">
                                <input type="email" className="form-control" name="email" id="inputEmail" value={this.state.email}
                                    onChange={(e)=>this.getNewInputs(e)}>
                                </input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-10 form-btns">
                                <input type="button" className="btn btn-info" value="Save" onClick={()=>{
                                    this.props.openModal();
                                    this.updateData(this.state._id,({
                                        name:this.state.name,
                                        tel:this.state.tel,
                                        email:this.state.email
                                    }))
                                }}/>
                                <button type="button" className="btn btn-danger" 
                                    onClick={this.props.openModal}> Close</button>
                            </div>
                        </div>
                </form>
                </Modal>
            </div>
        )
    }
}

export default ModalContact