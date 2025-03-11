import { Form } from "react-bootstrap";
import { Contact } from "../components/ContactsComponent";
import { useState } from "react";

interface AddContactsFormProps {
  onSave: (contact: Contact) => void;
}

const AddContactsForm = ({ onSave }: AddContactsFormProps) => {
  const [contact, setContact] = useState<Contact>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...contact, id: crypto.randomUUID() });
    setContact({ id: "", firstName: "", lastName: "", email: "" });
    console.log("new contact: ", contact);
  };

  return (
    <Form className="d-flex flex-column" onSubmit={handleSubmit}>
      <label>First Name:</label>
      <input
        type="text"
        name="firstName" 
        minLength={2}
        maxLength={25}
        value={contact.firstName}
        onChange={handleChange}
        required
      />
      <label>Last Name:</label>
      <input
        type="text"
        name="lastName" 
        minLength={2}
        maxLength={25}
        value={contact.lastName} 
      />
      <label>Email:</label>
      <input
        type="email"
        name="email"
        minLength={2}
        maxLength={25}
        value={contact.email} 
        onChange={handleChange}
        required
      />

      <button type="submit" className="mt-2">
        Save contact
      </button>
    </Form>
  );
};

export default AddContactsForm;
