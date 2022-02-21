import React from "react";

function PersonalInfo({ formData, setFormData }) {
  return (
    <div >
      <input
        type="text"
        placeholder="zemlja porekla"
        value={formData.zemljaPorekla}
        onChange={(e) => {
          setFormData({ ...formData, zemlja_porekla: e.target.value });
        }}
      />
    </div>
  );
}

export default PersonalInfo;
