import React, {Component} from 'react'
import axios from 'axios'
import './addContact.css'

class AddContact extends Component{

    constructor(props) {
        super(props)
        this.state={
            contact:{
                name:'No name',
                tel:99999999,
                email:'test@gmail.com'
            }
        }
    }

    getNewInputs(event){
        event.persist()
        this.setState(prevState => ({
            contact: {                   
                ...prevState.contact, 
                [event.target.name]: event.target.name==="tel" ? Number(event.target.value):event.target.value
            }
        }))
      }

      sendData(){
         console.log(JSON.stringify(this.state.contact))
        axios.post("http://localhost:8000/new_contact", (this.state.contact), {
          })
          .then(res => { 
            console.log('then response '+res.statusText)
          })
        .catch(error => {
            console.log('error message '+error.message);
          }) 
      }

render(){
return <form>
        <div className="form-group row">
            <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
            <div className="col-sm-10">
                <input type="text" className="form-control" name="name" id="inputName" placeholder="Your name"
                    onChange={(e)=>this.getNewInputs(e)}>
                </input>
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="inputTel" className="col-sm-2 col-form-label">Telephone</label>
            <div className="col-sm-10">
                <input type="number" className="form-control" name="tel" id="inputTel" placeholder="(0216) XX XXX XXX"
                    onChange={(e)=>this.getNewInputs(e)}>
                </input>
            </div>
        </div>
        <div className="form-group row">
            <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
                <input type="email" className="form-control" name="email" id="inputEmail" placeholder="email@example.com"
                    onChange={(e)=>this.getNewInputs(e)}>
                </input>
            </div>
        </div>
        <div className="form-group row">
            <div className="col-sm-10 form-btns">
                <input type="button" className="btn btn-info" value="Save" onClick={()=>this.sendData()}/>
                <button type="reset" className="btn btn-danger"> Reset</button>
            </div>
        </div>
    </form>
    }
}

export default AddContact