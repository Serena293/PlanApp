import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import AddContactsForm from "./AddContactsForm";

// Create a types.tsx file with all the interfaces
export interface Contact {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
}

const ContactsComponent = () => {
  const [list, setList] = useState<Contact[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  // Retrieve contacts from LocalStorage when the component mounts
  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem("contacts") || "[]");
    setList(savedContacts);
  }, []);

  const removeContact = (value: Contact) => {
    setList(list.filter((item) => item.id !== value.id));
    saveToLocalStorage(value, true);
  };

  const handleSaveContact = (newContact: Contact) => {
    if (newContact.id) {
      // Update existing contact
      setList((prevContacts) =>
        prevContacts.map((contact) =>
          contact.id === newContact.id ? newContact : contact
        )
      );
    } else {
      // Add new contact
      setList((prevContacts) => [...prevContacts, newContact]);
    }
    setShowForm(false);
    setEditingContact(null);
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setShowForm(true);
  };

  const saveToLocalStorage = (newContact: Contact, isDelete: boolean = false) => {
    const existingContacts = JSON.parse(localStorage.getItem("contacts") || "[]");
    if (isDelete) {
      // Remove the deleted contact
      const updatedContacts = existingContacts.filter(
        (contact: Contact) => contact.id !== newContact.id
      );
      localStorage.setItem("contacts", JSON.stringify(updatedContacts));
    } else {
      // Add the new contact
      if (!existingContacts.some((contact: Contact) => contact.id === newContact.id)) {
        existingContacts.push(newContact);
      }
      localStorage.setItem("contacts", JSON.stringify(existingContacts));
    }
  };

  return (
    <div>
      <h1>Contacts</h1>
      <button onClick={() => setShowForm(true)}>Add new contact</button>
      {showForm && (
        <AddContactsForm
          onSave={handleSaveContact}
          editingContact={editingContact}
        />
      )}
      {list.map((item) => (
        <div key={item.id}>
          <span> {item.firstName} </span>
          <span> {item.lastName ?? "No last name"} </span>
          <span> {item.email} </span>
          <button className="m-3">Text now</button>
          <button onClick={() => removeContact(item)} className="m-3">
            X
          </button>
          <button className="m-3" onClick={() => handleEditContact(item)}>
            Edit
          </button>
        </div>
      ))}
    </div>
  );
};

export default ContactsComponent;
