import React from "react";

function OtherInfo({ formData, setFormData }) {
  const [filename, setFilename] = React.useState("");
  return (
    <div className="other-info-container">
      <input
        type="file"
        placeholder="slika"
        value={filename}
        onChange={(e) => {
          setFormData({ ...formData, picture: e.target.files[0] });
          setFilename(e.target.value)
        }}
      />
    </div>
  );
}

export default OtherInfo;
