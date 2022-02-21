import React from "react";

function SignUpInfo({ formData, setFormData }) {
  return (
    <section className="sign-up-container">
      <input
        type="text"
        placeholder="oblast predavanja"
        value={formData.oblast_predavanja}
        onChange={(event) =>
          setFormData({ ...formData, oblast_predavanja: event.target.value })
        }
      />
    </section>
  );
}

export default SignUpInfo;
