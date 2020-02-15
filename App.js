import React from 'react';
import './App.css';
import blogIcon from './blog-icon.png';
import {Contact} from './Contact.ts';
import editIcon from './Edit-icon.png';
import deleteIcon from './delete-icon.png';
import DetailsForm from './DetailsForm';

var contacts = [];
var contact = new Contact(2,"teeksha.n@gmail.com","Teeksha","9703506166","123456789","www.teemad.com","Tanuku");
contacts.push(contact);
contact = new Contact(1,"madhuri.c@technovert.net","Madhuri","8919747429","12345678","www.technovert.com","Hyderabad");
contacts.push(contact);

class Home extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {viewForm : false, shouldDisplaySelectedContact : false, displayAllContacts : true};
    this.actionSelected = null;
    this.addContact = this.addContact.bind(this);
    this.home = this.home.bind(this);
    this.horizontalNavBar = true;
  }

  addContact(event)
  {
    event.preventDefault();
    this.actionSelected = <DetailsForm action="Add" contacts={contacts} onContactUpsert={this.onContactUpsert}  />;
    this.setState({viewForm : true, shouldDisplaySelectedContact : false});
  }

  home(event)
  {
    event.preventDefault();
    this.setState({viewForm : false});
  }

  onContactUpsert = (newProps,id)=>
  {
    contacts = newProps;
    this.setState({displayAllContacts : true});
    if(id!==undefined) this.displayContact(id);
  }

  displayContact=(id)=>
  {
    this.setState({viewForm : false, shouldDisplaySelectedContact : true});
    this.id = id;
  }

  listItems = []
  render()
  {
    return(
          <div className="pageContent">
            <div className="mainHeading">
                Address Book
            </div>

            <div className="horizontalNavigationBar">
                <ul>
                    <li><a onClick={this.home} href="/">Home</a></li>
                    <li><a onClick={this.addContact} href="/">+Add</a></li>
                    <li><img src={blogIcon} alt="bing-logo"/></li>
                </ul>
            </div>

            {/* <div className="contactList">
              <p className="contactHeading">CONTACTS</p>
                <ul>
                    {this.listItems}
                </ul>
            </div> */}

            {this.state.displayAllContacts ? <ContactsList displayContact={this.displayContact} /> : ''}
            {this.state.shouldDisplaySelectedContact ? <DisplaySelectedContact contact={contacts.find(obj=>obj.id===this.id)} onContactUpsert={this.onContactUpsert} /> : ''}
            <div>
              {this.state.viewForm ? this.actionSelected : ''}
            </div>
            </div>
    );
  }
}

class ContactsList extends React.Component{

  constructor(props)
  {
    super(props);
    //this.state = { shouldDisplaySelectedContact : false };
  }

  listItems = []
  render(){
    this.listItems = contacts.map(contact => 
      (
       <div>
         <li onClick={this.props.displayContact.bind(this,contact.id)} className = "listItem" key={contact.name}>
           <p className='name'>{contact.name}</p>
           <p>{contact.email}</p>
           <p>{contact.mobile}</p>
         </li>
       </div>
     )
   )
  return(
    <div className="contactList">
        <p className="contactHeading">CONTACTS</p>
          <ul>
            {this.listItems}
          </ul>
    </div>
  );
}
}

class DisplaySelectedContact extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = { viewDetailsForm : false, isContactDeleted : false};
    this.editContact = this.editContact.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
  }

  editContact()
  {
    this.setState({viewDetailsForm : true});
  }

  deleteContact()
  {
    var index = contacts.findIndex(obj=>obj.id==this.props.contact.id);
    contacts.splice(index,1);
    const onContactUpsert = this.props.onContactUpsert;
    onContactUpsert(contacts,undefined);
  }

  render(){
    if(!this.state.viewDetailsForm && !this.state.isContactDeleted){
    return(
    <div id="contactInformation">
      <div className="displaySelectedContact">
         <p>{this.props.contact.name}</p>
         <img className="icons" src={editIcon} alt="edit-icon"/><button id="editContact" onClick={this.editContact}>Edit</button>
         <img className="icons" src={deleteIcon} alt="delete-icon"/><button id="deleteContact" onClick={this.deleteContact}>Delete</button>
     </div>
     <div className="displayEmail">
         <p>Email :  {this.props.contact.email}</p>
     </div>
     <div className="contactDetails">
         <div className="mobile"><p>Mobile : {this.props.contact.mobile}</p></div>
         <div className="landline"><p>Landline :  {this.props.contact.landLine}</p></div>
     </div>
     <div className="website">
         <p>Website :{this.props.contact.website}</p>
     </div>
     <div className="Address">
         <p>Address : {this.props.contact.address}</p>
     </div>
    </div>
  );
    }
    else if(this.state.viewDetailsForm){
      return (<DetailsForm action="Update" contact={this.props.contact} contacts={contacts} onContactUpsert={this.props.onContactUpsert} />);
    }
    else if(this.state.isContactDeleted)
    {
      return <ContactsList />;
    }
  }
}

class Trial extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {viewForm : false};
    this.actionSelected = null;
    this.addContact = this.addContact.bind(this);
    this.editContact = this.editContact.bind(this);
  }

  addContact()
  {
    this.actionSelected = <DetailsForm action="Add" contact={new Contact()} contacts={contacts} />;
    this.setState({viewForm : true});
  }

  editContact()
  {
    this.actionSelected = <DetailsForm action="Update"/>;
    this.setState({viewForm : true});
  }

  render(){
    return(
      <div>
        <input type="button" value="Add Contact" onClick={this.addContact}/>
        <input type="button" value="Edit Contact" onClick={this.editContact}/>
        <div>{this.state.viewForm ? this.actionSelected : ''}</div>
      </div>
    );
  }
}
export default Home;
