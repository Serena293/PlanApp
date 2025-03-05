import CalenderComponent from "../components/CalenderComponent";
import FormComponent from "../components/FormComponet";

function LoginPage() {
  return (
    <div className="d-flex justify-content-around w-100 align-items-center vh-100">
      <CalenderComponent />
      <FormComponent
        formName="Log in"
        firstLabel="Email"
        secondLabel="Password"
        firstPlaceholder="email@example.com"
        secondPlaceholder="your password"
        secondInputType="email"
        controlSecondId="formPlaintextPassword"
        controlFirstId="formPlaintextEmail"
        btnText="Log in"
      />
    </div>
  );
}

export default LoginPage;
