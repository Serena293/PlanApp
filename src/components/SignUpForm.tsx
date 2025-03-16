import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  // const [profilePicture, setProfilePicture] = useState<File | null>(null);
  // const [imagePreview, setImagePreview] = useState<string | null>(null);

  // const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     setProfilePicture(file);
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImagePreview(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const userData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      username: formData.get("username") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
      email: formData.get("email") as string,
      // profileImage: formData.get("profileImage"),
    };

    //console.log("📤 Sending user data:", userData);

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      console.log("📩 Response Status:", response.status);

      if (!response.ok) {
        // Read error response
        const errorText = await response.text();
        throw new Error(`Registration failed: ${errorText}`);
      }

      // Determine response type (JSON or plain text)
      const contentType = response.headers.get("content-type");
      const data =
        contentType && contentType.includes("application/json")
          ? await response.json()
          : await response.text();

      console.log("✅ User registered:", data);
      alert("🎉 Registration successful!");
    } catch (error) {
      console.error("🚨 Error:", error);
      alert(`❌ Registration error: ${error}`);
    }
  };

  return (
    <section>
      <Form className="d-flex flex-column" onSubmit={handleRegister}>
        <label>First Name</label>
        <input type="text" minLength={2} maxLength={25} required name="firstName" />

        <label>Last Name</label>
        <input type="text" minLength={2} maxLength={25} required name="lastName" />

        <label>Email address</label>
        <input type="email" minLength={2} maxLength={50} required name="email" />

        <label>Insert password</label>
        <input type="password" minLength={8} maxLength={25} required name="password" />

        <label>Insert password again</label>
        <input type="password" minLength={8} maxLength={25} required name="confirmPassword" />

        <label>Username</label>
        <input type="text" minLength={2} maxLength={25} required name="username" />

        {/* <label>Profile Picture</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleProfilePictureChange} 
        />
        {imagePreview && (
          <img src={imagePreview} alt="Profile Preview" style={{ maxWidth: "100px", maxHeight: "100px", marginTop: "10px" }} />
        )} */}

        <button type="submit" className="my-3">Sign up</button>
      </Form>
      <Link to="/login">Already have an account? Log in</Link>
    </section>
  );
};

export default SignUpForm;
