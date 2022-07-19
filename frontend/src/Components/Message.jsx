import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { XCircleFill } from "react-bootstrap-icons";

const Message = ({ variant, children, style }) => {
  const [show, setShow] = useState(true);
  return (
    <Alert variant = {variant} show = {show}>
        <div className= { style ? style : "d-flex justify-content-between align-items-center"}>
          {children}
          <div className = {style ? style : "text-end"}>
            <XCircleFill onClick={() => [setShow(false), window.location.reload()]} size = "1.2rem" style={{ cursor: "pointer" }}/>
          </div>
        </div>
    </Alert>
  )
}

Message.defualtProps = {
    variant: "info",
    fill: "#000"
}

export default Message;