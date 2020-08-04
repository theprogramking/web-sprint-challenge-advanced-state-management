import React, { useState } from "react";
import { connect } from "react-redux";
import { postSmurf } from "../reducers";

const SmurfForm = (props) => {
  const [smurf, setSmurf] = useState({
    name: "",
    age: "",
    height: "",
  });

  const handleInput = (event) => {
    setSmurf({ ...smurf, [event.target.name]: event.target.value });
  };

  return (
    <div>
      Name:
      <input type="text" name="name" onChange={handleInput} />
      Age: <input type="text" name="age" onChange={handleInput} />
      Height: <input type="text" name="height" onChange={handleInput} />
      <button
        onClick={() => {
          props.postSmurf(smurf);
        }}
      >
        Submit Form
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    smurfs: state.smurfs,
    isFetching: state.isFetching,
    isUploading: state.isFetching,
    error: state.error,
  };
};

export default connect(mapStateToProps, { postSmurf })(SmurfForm);
