import React from "react";
import styled from "styled-components";
import InputLabel from "@material-ui/core/InputLabel";
import { Avatar } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const StyledInput = styled(TextField)`
  width: 100%;
  margin-bottom: 16px;
`;

export const EditProfile = ({
  name,
  onNameChange,
  image,
  handleImageUpload,
  onUpdateButtonClick,
  disabled = false,
}) => {
  return (
    <>
      <StyledInput
        label="Name"
        value={name}
        onChange={onNameChange}
        disabled={disabled}
      />
      <div>
        <InputLabel style={{ marginBottom: 16 }}>Icon image</InputLabel>
        {image === "" && (
          <div>
            <input
              accept="image/*"
              id="button-file"
              type="file"
              style={{ display: "none" }}
              onChange={handleImageUpload}
              disabled={disabled}
            />
            <label htmlFor="button-file">
              <Button
                variant="outlined"
                color="primary"
                disableElevation
                component="span"
                style={{ minWidth: 240, width: "100%" }}
                disabled={disabled}
              >
                Select Image
              </Button>
            </label>
          </div>
        )}
        {image !== "" && (
          <div style={{ marginBottom: 16 }}>
            <input
              accept="image/*"
              id="image-file"
              type="file"
              style={{ display: "none" }}
              onChange={handleImageUpload}
              disabled={disabled}
            />
            <label htmlFor="image-file">
              <Avatar
                src={image}
                style={{ width: 82, height: 82, cursor: "pointer" }}
              />
            </label>
          </div>
        )}
        {image !== "" && name !== "" && (
          <Button
            variant="outlined"
            color="primary"
            disableElevation
            component="span"
            style={{ minWidth: 240, width: "100%" }}
            onClick={onUpdateButtonClick}
            disabled={disabled}
          >
            Update Your Info
          </Button>
        )}
      </div>
    </>
  );
};
