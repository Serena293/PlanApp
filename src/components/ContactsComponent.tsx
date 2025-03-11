import {useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AddContactsForm from "./AddContactsForm";

//create a types.tsx file with all the interfaces
 export  interface Contact {
        id: string;
        firstName: string;
        lastName?: string;
        email: string;
    }

const ContactsComponent = () => {
    const [list, setList] = useState<Contact[]>([]);
    const [showForm, setShowForm] = useState(false)

    const removeContact = (value: Contact) => {
        setList(list.filter((item) => item.id !== value.id));
    };

    const handleSaveContact = (newContact: Contact) => {
        setList((prevContacts) => [...prevContacts, newContact]);
        setShowForm(false);
    };

   
    
    return (
        <div>
            <h1>Contacts</h1> 
            <button onClick={() => setShowForm(true)}>Add new contact</button>
            {showForm && <AddContactsForm onSave={handleSaveContact} />}
            {list.map((item) => (
                <div key={item.id}>
                    <span> {item.firstName} </span>
                    <span> {item.lastName ?? "No last name"} </span>
                    <span> {item.email} </span>
                    <button >Text now</button>
                    <button onClick={() => removeContact(item)} >X</button>
                </div>
            ))}
        </div>
    );
};

export default ContactsComponent;
