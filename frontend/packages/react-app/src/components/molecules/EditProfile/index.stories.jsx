import React, { useState } from "react";
import { EditProfile } from "./index";

export default {
  title: "Molecules/EditProfile",
  component: EditProfile,
};

const Template = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [isSigned, setIsSigned] = useState(false);

  const handleImageUpload = (e) => {
    const image = URL.createObjectURL(e.target.files[0]);
    setImage(image);
  };

  return (
    <>
      <EditProfile
        name={name}
        onNameChange={(e) => setName(e.target.value)}
        image={image}
        handleImageUpload={handleImageUpload}
        onUpdateButtonClick={() => console.log("Update")}
        disabled={isSigned}
      />
    </>
  );
};

export const Default = Template.bind({});
