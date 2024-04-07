
const error = () => {

    const mainErrorPage = {
      minHeight: "600px",
      margin: "0px auto",
      width: "auto",
      maxWidth: "560px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection:"column"
    };
    const errorTitle =  {
      maxWidth: "529px",
      fontFamily: "Roboto",
      fontSize: "38px",
      fontWeight: "bold",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "normal",
      textAlign: "center",
      color:"#4b4b62",
      marginBottom: "16px"
    }
  return (
    <div>
      <div style={mainErrorPage}>
      <h1 style={errorTitle}>Woops! <br />Something went wrong :(</h1>
    </div>
    </div>
  )
}

export default error
