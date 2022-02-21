import React, { useState } from "react";
import SignUpInfo from "./SignUpInfo";
import PersonalInfo from "./PersonalInfo";
import OtherInfo from "./OtherInfo";
import axios from '../api/axios';


const TUTOR_URL = '/api/tutor';

function TutorForm() {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    zemlja_porekla: "",
    oblast_predavanja: "",
    picture: null,
  });
  const formica = new FormData()
  const FormTitles = ["Sign Up", "Personal Info", "Other"];

  const PageDisplay = () => {
    if (page === 0) {
      return <SignUpInfo formData={formData} setFormData={setFormData} />;
    } else if (page === 1) {
      return <PersonalInfo formData={formData} setFormData={setFormData} />;
    } else {
      return <OtherInfo formData={formData} setFormData={setFormData} />;
    }
  };

  return (
    <div className="form">
      <div className="progressbar">
        <div
          style={{ width: page === 0 ? "33.3%" : page == 1 ? "66.6%" : "100%" }}
        ></div>
      </div>
      <div className="form-container">
        <div className="header">
          <h1>{FormTitles[page]}</h1>
        </div>
        <div className="body">{PageDisplay()}</div>
        <div className="footer">
          <button
            disabled={page == 0}
            onClick={() => {
              setPage((currPage) => currPage - 1);
            }}
          >
            Prev
          </button>
          <button
            onClick={async () => {
              if (page === FormTitles.length - 1) {

                formica.append("zemlja_porekla", formData.zemlja_porekla)
                formica.append("oblast_predavanja", formData.oblast_predavanja)
                formica.append("picture", formData.picture)

                const response = await axios.post(TUTOR_URL,
                  formica,
                  {
                      withCredentials: true
                  }
              );
              console.log(response.data)
              } else {
                setPage((currPage) => currPage + 1);
              }
            }}
          >
            {page === FormTitles.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TutorForm;