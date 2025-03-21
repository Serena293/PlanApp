import SignUpForm from "./SignUpForm";


interface SignUpPageProps {
  onSignUp: (token: string) => void;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onSignUp }) => {
  return <SignUpForm onSignUp={onSignUp} />;
};

export default SignUpPage;
