import React from "react";
import { Button, Image } from "react-bootstrap";

const Header = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-between border-bottom px-4 py-3"
      style={{
        backgroundColor: "rgba(15, 26, 36, 0.9)",
        backdropFilter: "blur(8px)",
        borderColor: "rgba(255,255,255,0.1)",
      }}
    >
      <div className="d-flex align-items-center gap-3">
        <Button
          variant="link"
          className="text-light p-0 border-0"
          style={{ color: "#B5BFC4" }}
        >
          <i className="bi bi-arrow-left fs-4"></i>
        </Button>
        <Image
          src="https://i.pinimg.com/1200x/88/68/d7/8868d7b09e6eff73db538eee5e077816.jpg"
          roundedCircle
          width={48}
          height={48}
          className="border border-info"
        />
        <div>
          <h6 className="mb-0 text-white">John Doe</h6>
          <small className="text-info">Online</small>
        </div>
      </div>
    </div>
  );
};

export default Header;
