import React from 'react'

const verify = () => {

  const sendEmailPage = {
      minHeight: "600px",
      margin: "0px auto",
      width: "auto",
      maxWidth: "560px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection:"column"
    };
    const emailTitle =  {
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
    <div style={sendEmailPage}>
      <h1 style={emailTitle}>Verification Link sent <br/>to your Email ID</h1>
    </div>
  )
}

export default verify
