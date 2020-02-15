import React from 'react';
import {Contact} from './Contact';
import Home from './App.js';

class DetailsForm extends React.Component{

    constructor(props)
    {
      super(props);
      if(this.props.contact!==undefined)
      {
        this.state = {
          viewForm : true,
          name : this.props.contact.name,
          email : this.props.contact.email,
          mobile : this.props.contact.mobile,
          landLine : this.props.contact.landLine,
          website : this.props.contact.website,
          address : this.props.contact.address
        };
      }

      else{
      this.state={viewForm : true, name : '', email : '' , mobile : '', 
        landLine : '' , address : '' ,website :''};
      }

      this.submitDetails = this.submitDetails.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.nextPage = null;
      this.newContact = this.props.contact;
    }

    captureName(event)
    {
      this.setState({name : event.target.value});
    }
  
    validate(event)
    {
      console.log(this.state.name);
      if(this.state.name.length==0) 
      {
        console.log("Entered");
        document.setElementById("errorMessage").text="Name Field Cannot be empty";
      }
    }
  
    submitDetails()
    {
      var contact = new Contact(1,this.state.email,this.state.name,this.state.mobile,this.state.landLine,this.state.website,this.state.address);
      if(this.props.contact===undefined){
        contact.id = this.props.contacts.length+1;
        this.props.contacts.push(contact);
    }
    else{
      var index = this.props.contacts.findIndex(obj=>obj.id==this.props.contact.id);
      contact.id = this.props.contact.id;
      this.props.contacts[index]=contact;

      this.setState(
        {
          viewForm : false
        }
      );
      }
      const onContactUpsert = this.props.onContactUpsert;
      onContactUpsert(this.props.contacts,contact.id);
  }
  
    handleChange(event) {
      const target = event.target;
      const name =target.name;
      this.setState({[name] : event.target.value});
    }
  
    render(){
      return (
      <div id="addContactForm" className="detailsForm">
        <form id="addContactDetails">
          <label>Name *</label><br/>
          
          <input type="text" name="name" id="name" value={this.state.name} onChange={this.handleChange} required/><br/>
          <label>Email *</label><br/>
          
          <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required/><br/>
          <div className="table">
              <span className="box">
                  <label>Mobile *</label>
                  <br/>
              </span>
              <span>
                  <label>Landline</label>
              </span>
          </div>
          <span className="box">
              <input type="text" name="mobile" value={this.state.mobile} onChange={this.handleChange} required/>
          </span>
          <span className="box">
              <input type="text" name="landLine" value={this.state.landLine} onChange={this.handleChange} />
          </span><br/>
          <label>Website</label><br/>
          <input type="text" name="website" value={this.state.website} onChange={this.handleChange} /><br/>
          <label>Address</label><br/>
          <textarea name="address" value={this.state.address} onChange={this.handleChange}></textarea><br/><br/>
          <input type="button" className="submitDetailsButton" onClick={this.submitDetails} value={this.props.action}/>
        </form>
    </div>
    );
  }
  
  // else 
  // {
  //   return(
  //     <div>
  //       {this.nextPage}
  //     </div>
  //   );
  // }
    }


  export default DetailsForm;