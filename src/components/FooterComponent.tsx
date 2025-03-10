import "../assets/footer.css"

const Footer = () => {
    return (
      <footer className="text-light text-center py-3 mt-auto bg-color">
        <p className="mb-0 bg-color">&copy; {new Date().getFullYear()} </p>
      </footer>
    );
  };
  
  export default Footer;
  