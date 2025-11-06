import React from "react";
import { Container, Row, Col, Card, Image } from "react-bootstrap";

const ChatMessages = ({ messages }) => {
  return (
    <Container fluid className="flex-grow-1 overflow-auto py-3">
      <Row className="justify-content-center">
        <Col md={8}>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`d-flex mb-3 ${
                msg.type === "sent" ? "justify-content-end" : "justify-content-start"
              }`}
            >
              {msg.type === "received" && (
                <Image
                  src="https://i.pinimg.com/1200x/88/68/d7/8868d7b09e6eff73db538eee5e077816.jpg"
                  roundedCircle
                  width={40}
                  height={40}
                  className="me-2"
                />
              )}
              <div>
                <Card
                  className={`p-2 px-3 border-0 ${
                    msg.type === "sent" ? "bg-info text-dark" : "bg-dark text-white"
                  }`}
                  style={{
                    maxWidth: "420px",
                    borderRadius: "0.75rem",
                    borderBottomLeftRadius:
                      msg.type === "received" ? "0" : "0.75rem",
                    borderBottomRightRadius:
                      msg.type === "sent" ? "0" : "0.75rem",
                  }}
                >
                  {msg.text}
                </Card>
                <small
                  className="text-muted d-block mt-1"
                  style={{ fontSize: "0.75rem", color: "#eff5f8ff" }}
                >
                  {msg.time}
                </small>
              </div>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default ChatMessages;
