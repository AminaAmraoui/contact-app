import React, {Component} from 'react'
import axios from 'axios'
import './listContact.css'
import ModalContact from './Modal'

class ListContact extends Component{
  constructor(props) {
    super(props)
    this.state={
      contactsTab:[{
        name:'',
        tel:'',
        email:''
    }],
    lengthTab:0,
    modalIsOpen: false,
    contactModal: { _id:'',name: '', tel: '',email:'' }
    }
  }

  getData(){
    axios.get("http://localhost:8000/contacts")
          .then(res => { 
            console.log('Get then response '+res.data.length)
            this.setState({
              contactsTab: res.data,
              lengthTab:res.data.length
            })
          })
        .catch(error => {
            console.log('Get error message '+error.message);
          }) 
  }

  deleteDate(index){
    axios.delete("http://localhost:8000/delete_contact/"+index)
    .then(res => { 
      console.log('then response '+res.statusText)
      this.getData()
    })
  .catch(error => {
      console.log('error message '+error.message);
    }) 
  }


  openModal = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }
   
setContact = contact =>{
  this.setState({contactModal:contact})
}
  render() {
    this.getData()
  return <div>
    <table className="table table-striped">
  <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Telephone</th>
        <th scope="col">Email</th>
      </tr>
    </thead>
    <tbody>
      { this.state.contactsTab.map((c,index) => (
        <tr key={index}>
          <td>{c.name}</td>
          <td>{c.tel}</td>
          <td>{c.email}</td>
          <td>
                    <span
                      className="fas fa-minus-circle"
                      onClick={()=>this.deleteDate(c._id)}
                    />
                    <span
                      className="fas fa-user-edit"
                      onClick={()=>{this.openModal();
                                    this.setContact(c);
                                    }}
                    />
                  </td>
        </tr>
      )
        )}
    </tbody>

  </table>
  {console.log('contact Modal: ',this.state.contactModal)}
  <ModalContact
      modalIsOpen={this.state.modalIsOpen}
      openModal={this.openModal}
      contact={this.state.contactModal}
    /> 
  </div>

}//end render
}

export default ListContact