const Footer = (props) => {
  const footerStyles = {
    color: "green",
    fontStyle: "italic",
    fontSize: 16,
  };

  return (
    <div style={footerStyles}>
      <br />
      <em>
        Note app, Department of Computer Science, Unversity of Helsinki 2024
      </em>
    </div>
  );
};

export default Footer;
