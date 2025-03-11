import { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section>
      <Form className="d-flex flex-column">
        <label>First Name</label>
        <input type="text" min={2} max={25} required />
        <label>Last Name</label>
        <input type="text" min={2} max={25} required />
        <label>Email address</label>
        <input type="email" min={2} max={50} required />
        <label>Insert password</label>
        <input type="password" min={8} max={25} required />
        <label>Insert password again</label>
        <input type="password" min={8} max={25} required />
        <label>Username</label>
        <input type="text" min={2} max={25} required />

        <label>Profile Picture</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleProfilePictureChange} 
        />
        {imagePreview && (
          <img src={imagePreview} alt="Profile Preview" style={{ maxWidth: "100px", maxHeight: "100px", marginTop: "10px" }} />
        )}

        <button type="submit" className="my-3">
          Sign up
        </button>
      </Form>
      <Link to="/login">Already have an account? Log in</Link>
    </section>
  );
};

export default SignUpForm;
