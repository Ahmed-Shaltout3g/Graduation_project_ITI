import React, { useState } from "react";
import { Button, InputGroup, Form, Modal } from "react-bootstrap";
import LocationMap from "./LocationModal";

const MessageInput = ({ input, setInput, handleSend }) => {
  const [showOptions, setShowOptions] = useState(false);
   const [showMap, setShowMap] = useState(false);

  // Open camera directly
  const handleCameraClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.capture = "environment"; 
    input.click();
  };

  // Open location modal

  const handleLocationClick = () => setShowMap(true);
  const handleSendLocation = (coords) => {
    setInput(`My location: https://www.google.com/maps?q=${coords[0]},${coords[1]}`);
    setShowMap(false);
  };

  return (
    <>
      <div
        className="d-flex align-items-center border-top px-4 py-3 gap-2"
        style={{
          backgroundColor: "rgba(15, 26, 36, 0.9)",
          borderColor: "rgba(177, 93, 93, 0.1)",
        }}
      >
        {/* Mic */}
        <Button
          variant="outline-info"
          className="rounded-circle border-0"
          style={{ backgroundColor: "#1A2C3A" }}
        >
          <i className="bi bi-mic"></i>
        </Button>

        {/* Input */}
        <InputGroup className="flex-grow-1">
          <Form.Control
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-dark text-white border-0"
          />
        </InputGroup>

        {/* Attach icon */}
        <Button
          variant="outline-light"
          className="border-0"
          onClick={() => setShowOptions(!showOptions)}
        >
          <i className="bi bi-paperclip fs-5"></i>
        </Button>

        {/* Send icon */}
        <Button
          variant="info"
          className="text-dark fw-semibold rounded"
          onClick={handleSend}
        >
          <i className="bi bi-send"></i>
        </Button>
      </div>

      {/* Small popover with Camera + Location */}
    {showOptions && (
  <div
    className="position-absolute p-2 rounded"
    style={{
      bottom: "400px", 
      right: "60px", 
      backgroundColor: "#172635",
      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      zIndex: 10,
      display: "flex",
      flexDirection: "column",
      gap: "6px",
    }}
  >
    <Button
      variant="dark"
      className="d-flex align-items-center justify-content-start gap-2 w-100"
      onClick={handleCameraClick}
    >
      <i className="bi bi-camera"></i>
      <span>Camera</span>
    </Button>

    <Button
      variant="dark"
      className="d-flex align-items-center justify-content-start gap-2 w-100"
      onClick={handleLocationClick}
    >
      <i className="bi bi-geo-alt"></i>
      <span>Location</span>
    </Button>
  </div>
)}


    
    {/* Location Modal */}
 <Modal show={showMap} onHide={() => setShowMap(false)} centered size="lg">
        <Modal.Body style={{ backgroundColor: "#0F1A24" }}>
          <LocationMap onSendLocation={handleSendLocation} />
        </Modal.Body>
      </Modal>

    </>
  );
};

export default MessageInput;
