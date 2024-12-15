import React, { useEffect, useState } from "react";
import EmailReg from "./EmailReg";

function MultiFormPage() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("");
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [geolocation, setGeolocation] = useState("");
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [updateEmail, setUpdateEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleFormSubmission = async () => {
    if (name.length < 3) {
      setUpdateName("It is having lessthan three characters");
    } else {
      setUpdateName("");
    }
    if (EmailReg(email)) {
      setUpdateEmail("");
    } else {
      setUpdateEmail("It is not a valid email");
    }
    if (phone.length === 10) {
      setMobile("");
    } else {
      setMobile("It is not having 10 digits");
    }
    try {
      const response = await fetch("https://your-xano-api.com/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          addressLine1,
          addressLine2,
          city,
          state,
          pincode,
          country,
          file,
          files,
          geolocation,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setSubmissionMessage("Form submitted successfully!");
      } else {
        setSubmissionMessage("Error occurred during form submission");
      }
    } catch (error) {
      setSubmissionMessage("Error occurred during form submission");
    }
  };

  const handleGetGeolocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setGeolocation(`${latitude}, ${longitude}`);
      },
      (error) => {
        console.error(error);
        setGeolocation("Unable to retrieve geolocation");
      }
    );
  };

  useEffect(() => {
    if (step === 4) {
      handleGetGeolocation();
    }
  }, [step]);
  return (
    <div className="mx-auto pt-5">
      <div className="row">
        <div className="col-12">
          <div className="card max-w-md mx-auto mt-20 p-1">
            <div className="card-title">
              <h3 className="fw-bold text-center">MultiStep Form</h3>
            </div>
            <div className="card=body">
              {step === 1 && (
                <div className="text-center">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className=" me-3"
                  />
                  <span className="text-danger me-2">{updateName}</span>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className=" me-3"
                  />
                  <span className="text-danger me-2">{updateEmail}</span>
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className=" me-3"
                  />
                  <span className="text-danger me-2">{mobile}</span>
                  <div className="d-flex justify-content-end">
                    <button
                      onClick={handleNextStep}
                      className="btn btn-success "
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              {/* step-2 */}
              {step === 2 && (
                <div>
                  <label htmlFor="addressLine1">Address Line 1</label>
                  <input
                    type="text"
                    id="addressLine1"
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    className="me-3"
                  />
                  <label htmlFor="addressLine2">Address Line 2</label>
                  <input
                    type="text"
                    id="addressLine2"
                    value={addressLine2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                    className="me-3"
                  />
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="me-3"
                  />
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="me-3"
                  />
                  <label htmlFor="pincode">Pincode</label>
                  <input
                    type="number"
                    id="pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="me-3"
                  />
                  <label htmlFor="country">Country</label>
                  <select className="mt-3 me-3">
                    {/* <option selected>Open this select menu</option> */}
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="Canada">Canada</option>
                  </select>
                  <div className="mt-3 d-flex justify-content-between">
                    <button
                      onClick={handlePreviousStep}
                      className="btn btn-primary me-3 "
                    >
                      Previous
                    </button>
                    <button
                      onClick={handleNextStep}
                      className="btn btn-success me-3  text-end"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              {/* step-3 */}
              {step === 3 && (
                <div>
                  <label htmlFor="file">File</label>
                  <input
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="me-3"
                  />
                  <div className="mt-3 d-flex justify-content-between">
                    <button
                      onClick={handlePreviousStep}
                      className="btn btn-primary me-3 "
                    >
                      Previous
                    </button>
                    <button
                      onClick={handleNextStep}
                      className="btn btn-success me-3  text-end"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              {/* step-4 */}
              {step === 4 && (
                <div>
                  <label htmlFor="files">Files</label>
                  <input
                    type="file"
                    id="files"
                    multiple
                    onChange={(e) => setFiles(e.target.files)}
                    className="me-3"
                  />
                  <p>Geolocation: {geolocation}</p>
                  <div className="mt-3 d-flex justify-content-between">
                    <button
                      onClick={handlePreviousStep}
                      className="btn btn-primary me-3 "
                    >
                      Previous
                    </button>
                    <button
                      onClick={handleNextStep}
                      className="btn btn-success me-3  text-end"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              {/* step-5 */}
              {step === 5 && (
                <div className="text-center">
                  <p>Form submitted successfully!</p>
                  <button
                    onClick={handlePreviousStep}
                    className="btn btn-primary me-3 "
                  >
                    Previous
                  </button>
                  <button
                    onClick={handleFormSubmission}
                    className="btn btn-success me-3"
                  >
                    Submit Again
                  </button>
                </div>
              )}
              {submissionMessage && (
                <p className="text-red-500">{submissionMessage}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MultiFormPage;
