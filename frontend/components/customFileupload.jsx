import { Image } from "next/image";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Tooltip } from "primereact/tooltip";
import { ProgressBar } from "primereact/progressbar";
import { useEffect, useState } from "react";
import { imageUpload } from "@/services/productServices";

const FileUploadCust = ({ filename }) => {
  const [fName, setFname] = useState(null);

  useEffect(() => {
    setFname(filename);
  }, [filename]);

  const onUploadImage = () => {
    console.log(fName);
    
  };
  const chooseOptions = {
    icon: "pi pi-fw pi-images",
    iconOnly: true,
    className: "custom-choose-btn p-button-rounded p-button-outlined",
  };
  const uploadOptions = {
    icon: "pi pi-fw pi-cloud-upload",
    iconOnly: true,
    className:
      "custom-upload-btn p-button-success p-button-rounded p-button-outlined",
  };
  const cancelOptions = {
    icon: "pi pi-fw pi-times",
    iconOnly: true,
    className:
      "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined",
  };

  const headerTemplate = (options) => {
    const { className, chooseButton, uploadButton, cancelButton } = options;

    return (
      <div
        className={className}
        style={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
        }}>
        {chooseButton}
        {uploadButton}
        {cancelButton}
      </div>
    );
  };

  const itemTemplate = (file, props) => {
    return (
      <div className="flex align-items-center flex-wrap">
        <div className="flex align-items-center" style={{ width: "40%" }}>
          <Image
            alt={file.name}
            role="presentation"
            src={file.objectURL}
            width={100}
            height={80}
          />
          <span className="flex flex-column text-left ml-3">
            {file.name}
            <small>{new Date().toLocaleDateString()}</small>
          </span>
        </div>

        <Button
          type="button"
          icon="pi pi-times"
          className="p-button-outlined p-button-rounded p-button-danger ml-auto"
          onClick={() => onTemplateRemove(file, props.onRemove)}
        />
      </div>
    );
  };

  return (
    <div className="field">
      <label htmlFor="name">Image</label>

      <Tooltip target=".custom-choose-btn" content="Choose" position="bottom" />
      <Tooltip target=".custom-upload-btn" content="Upload" position="bottom" />
      <Tooltip target=".custom-cancel-btn" content="Clear" position="bottom" />

      <FileUpload
        id="image"
        maxFileSize={2000000}
        accept="image/*"
        multiple={false}
        // url="/api/upload"
        chooseOptions={chooseOptions}
        uploadOptions={uploadOptions}
        cancelOptions={cancelOptions}
        onUpload={onUploadImage}
      />
    </div>
  );
};

export default FileUploadCust;
