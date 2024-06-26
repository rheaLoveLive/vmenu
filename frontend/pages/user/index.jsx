import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { classNames } from "primereact/utils";
import React, { useEffect, useRef, useState } from "react";
import {
  createUser,
  delUser,
  getUsers,
  updateUser,
} from "@/services/userServices";
import { Dropdown } from "primereact/dropdown";

const CrudUser = () => {
  let emptyUser = {
    id: null,
    name: "",
    email: "",
    password: "",
    role: "user",
    status: 1,
  };

  const roleOpt = [
    {
      name: "user",
      value: "user",
    },
    {
      name: "admin",
      value: "admin",
    },
  ];

  const statusOpt = [
    {
      name: "active",
      value: 1,
    },
    {
      name: "inactive",
      value: 2,
    },
  ];

  const [users, setUsers] = useState(null);
  const [userDialog, setUserDialog] = useState(false);
  const [errors, setErrors] = useState({});

  const [deleteUserDialog, setDeleteUserDialog] = useState(false);
  const [deleteUsersDialog, setDeleteUsersDialog] = useState(false);

  const [user, setUser] = useState(emptyUser);
  const [selectedUsers, setSelectedUsers] = useState(null);

  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    getUsers().then((res) => {
      if (!res.data.error) {
        setUsers(res.data.data);
      }
      console.log(res.data.data);
    });
  }, []);

  const openNew = () => {
    setUser(emptyUser);
    setSubmitted(false);
    setUserDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setUserDialog(false);
  };

  const hideDeleteUserDialog = () => {
    setDeleteUserDialog(false);
  };

  const hideDeleteUsersDialog = () => {
    setDeleteUsersDialog(false);
  };

  const saveUser = () => {
    setSubmitted(true);

    if (user.name.trim()) {
      let _users = [...users];
      let _user = { ...user };

      // update
      if (user.id) {
        const index = findIndexById(user.id);

        console.log(_user);
        _users[index] = _user;

        // update user
        updateUser(_user)
          .then((res) => {
            if (!res.data.error) {
              toast.current.show({
                severity: "success",
                summary: "Successful",
                detail: "User Updated",
                life: 3000,
              });

              setUsers(_users);
              setUserDialog(false);
              setUser(emptyUser);
            } else {
              setErrors(res.data.data);
              toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "User Failed to be Updated",
                life: 3000,
              });
            }
          })
          .catch((e) => {
            toast.current.show({
              severity: "error",
              summary: "Error",
              detail: "User Failed to be Created",
              life: 3000,
            });
          });

        // create
      } else {
        _users.push(_user);

        console.log(_user);

        // create user
        createUser(_user)
          .then((res) => {
            if (!res.data.error) {
              console.log(_user);
              toast.current.show({
                severity: "success",
                summary: "Successful",
                detail: "User Created",
                life: 3000,
              });

              setUsers(_users);
              setUserDialog(false);
              setUser(emptyUser);
            } else {
              setErrors(res.data.data);

              toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "User Failed to be Created",
                life: 3000,
              });
            }
          })
          .catch((e) => {
            toast.current.show({
              severity: "error",
              summary: "Error",
              detail: "User Failed to be Created",
              life: 3000,
            });
          });
      }
    }
  };

  const editUser = (user) => {
    setUser({ ...user });
    setUserDialog(true);
  };

  const confirmDeleteUser = (user) => {
    setUser(user);
    setDeleteUserDialog(true);
  };

  const deleteUser = () => {
    let _users = users.filter((val) => val.id !== user.id);

    // delete user
    delUser(user.id)
      .then((res) => {
        if (!res.data.error) {
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "User Deleted",
            life: 3000,
          });

          setUsers(_users);
          setDeleteUserDialog(false);
          setUser(emptyUser);
        } else {
          setErrors(res.data.data);

          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "User Failed to be Deleted",
            life: 3000,
          });
        }
      })
      .catch((e) => {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "User Failed to be Deleted",
          life: 3000,
        });
      });
  };

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < users.length; i++) {
      if (users[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const confirmDeleteSelected = () => {
    setDeleteUsersDialog(true);
  };

  const deleteSelectedUsers = () => {
    let _users = users.filter((val) => !selectedUsers.includes(val));

    selectedUsers.map((p) => {
      // delete user
      delUser(p.id)
        .then((res) => {
          if (!res.data.error) {
            toast.current.show({
              severity: "success",
              summary: "Successful",
              detail: "User Deleted",
              life: 3000,
            });

            setUsers(_users);
            setDeleteUsersDialog(false);
            setSelectedUsers(null);
          } else {
            setErrors(res.data.data);

            toast.current.show({
              severity: "error",
              summary: "Error",
              detail: "User Failed to be Deleted",
              life: 3000,
            });
          }
        })
        .catch((e) => {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "User Failed to be Deleted",
            life: 3000,
          });
        });
    });
  };

  // input handle

  const onInputChange = (e, name) => {
    console.log(name);
    const val = (e.target && e.target.value) || "";
    let _user = { ...user };
    _user[`${name}`] = val;

    setUser(_user);
  };

  const onSelectChange = (e, name) => {
    const val = e.value || 0;
    let _user = { ...user };
    _user[`${name}`] = val;

    setUser(_user);
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button
            label="New"
            icon="pi pi-plus"
            severity="sucess"
            className="mr-2"
            onClick={openNew}
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            severity="danger"
            onClick={confirmDeleteSelected}
            disabled={!selectedUsers || !selectedUsers.length}
          />
        </div>
      </React.Fragment>
    );
  };

  const emailBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Email</span>
        {rowData.email}
      </>
    );
  };

  const nameBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Name</span>
        {rowData.name}
      </>
    );
  };

  const roleBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Role</span>
        {rowData.role}
      </>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Status</span>
        <span
          className={`user-badge ${
            rowData.status == 1 ? "text-green-600" : "text-red-600"
          }`}>
          {rowData.status == 2 ? "inactive" : "active"}
        </span>
      </>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          severity="success"
          rounded
          className="mr-2"
          onClick={() => editUser(rowData)}
        />
        <Button
          icon="pi pi-trash"
          severity="warning"
          rounded
          onClick={() => confirmDeleteUser(rowData)}
        />
      </>
    );
  };

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Manage Users</h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );

  const userDialogFooter = (
    <>
      <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" text onClick={saveUser} />
    </>
  );

  const deleteUserDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        text
        onClick={hideDeleteUserDialog}
      />
      <Button label="Yes" icon="pi pi-check" text onClick={deleteUser} />
    </>
  );
  const deleteUsersDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        text
        onClick={hideDeleteUsersDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        text
        onClick={deleteSelectedUsers}
      />
    </>
  );

  return (
    <div className="grid crudUser-demo">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />
          <Toolbar className="mb-4" start={leftToolbarTemplate}></Toolbar>

          <DataTable
            ref={dt}
            value={users}
            selection={selectedUsers}
            onSelectionChange={(e) => setSelectedUsers(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
            globalFilter={globalFilter}
            emptyMessage="No users found."
            header={header}>
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "4rem" }}></Column>
            <Column
              field="email"
              header="Email"
              sortable
              body={emailBodyTemplate}
              headerStyle={{ minWidth: "15rem" }}></Column>
            <Column
              field="name"
              header="Nama user"
              sortable
              body={nameBodyTemplate}
              headerStyle={{ minWidth: "15rem" }}></Column>
            <Column
              field="role"
              header="Role"
              sortable
              body={roleBodyTemplate}
              headerStyle={{ minWidth: "10rem" }}></Column>
            <Column
              field="status"
              header="Status"
              body={statusBodyTemplate}
              sortable
              headerStyle={{ minWidth: "10rem" }}></Column>
            <Column
              body={actionBodyTemplate}
              header="Action"
              headerStyle={{ minWidth: "10rem" }}></Column>
          </DataTable>

          <Dialog
            visible={userDialog}
            style={{ width: "450px" }}
            header="Add User"
            modal
            className="p-fluid"
            footer={userDialogFooter}
            onHide={hideDialog}>
            <div className="field">
              <label htmlFor="name">Name</label>
              <InputText
                id="name"
                value={user.name}
                onChange={(e) => onInputChange(e, "name")}
                required
                autoFocus
                className={classNames({
                  "p-invalid": (submitted && !user.name) || errors.name,
                })}
              />
              {submitted && !user.name ? (
                <>
                  <small className="p-invalid">Name is required.</small> <br />
                </>
              ) : (
                errors.name &&
                errors.name.map((er, _index) => (
                  <>
                    <small key={_index} className="p-invalid">
                      {er}
                    </small>{" "}
                    <br />
                  </>
                ))
              )}
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <InputText
                id="email"
                value={user.email}
                onChange={(e) => onInputChange(e, "email")}
                required
                className={classNames({
                  "p-invalid": (submitted && !user.email) || errors.email,
                })}
              />

              {submitted && !user.email ? (
                <>
                  <small className="p-invalid">email is required.</small> <br />
                </>
              ) : (
                errors.email &&
                errors.email.map((er, _index) => (
                  <>
                    <small key={_index} className="p-invalid">
                      {er}
                    </small>{" "}
                    <br />
                  </>
                ))
              )}
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <Password
                id="password"
                value={user.password}
                onChange={(e) => onInputChange(e, "password")}
                required
                toggleMask
                className={classNames({
                  "p-invalid": (submitted && !user.password) || errors.password,
                })}
              />

              {submitted && !user.password && user.id ? (
                <>
                  <small className="p-invalid">password is required.</small>{" "}
                  <br />
                </>
              ) : (
                errors.email &&
                errors.email.map((er, _index) => (
                  <>
                    <small key={_index} className="p-invalid">
                      {er}
                    </small>{" "}
                    <br />
                  </>
                ))
              )}
            </div>

            <div className="formgrid grid">
              <div className="field col">
                <label htmlFor="role">Role</label>
                <Dropdown
                  id="role"
                  value={user.role}
                  onChange={(e) => onSelectChange(e, "role")}
                  required
                  editable
                  options={roleOpt}
                  optionValue=""
                  optionLabel="name"
                  className={classNames({
                    "p-invalid": (submitted && !user.role) || errors.role,
                  })}
                />

                {submitted && !user.role ? (
                  <>
                    <small className="p-invalid">role is required.</small>{" "}
                    <br />
                  </>
                ) : (
                  errors.email &&
                  errors.email.map((er, _index) => (
                    <>
                      <small key={_index} className="p-invalid">
                        {er}
                      </small>{" "}
                      <br />
                    </>
                  ))
                )}
              </div>

              <div className="field col">
                <label htmlFor="status">Status</label>
                <Dropdown
                  id="status"
                  value={user.status}
                  onChange={(e) => onSelectChange(e, "status")}
                  required
                  editable
                  options={statusOpt}
                  optionLabel="name"
                  className={classNames({
                    "p-invalid": (submitted && !user.status) || errors.status,
                  })}
                />

                {submitted && !user.status ? (
                  <>
                    <small className="p-invalid">status is required.</small>{" "}
                    <br />
                  </>
                ) : (
                  errors.email &&
                  errors.email.map((er, _index) => (
                    <>
                      <small key={_index} className="p-invalid">
                        {er}
                      </small>{" "}
                      <br />
                    </>
                  ))
                )}
              </div>
            </div>
          </Dialog>

          <Dialog
            visible={deleteUserDialog}
            style={{ width: "450px" }}
            header="Confirm"
            modal
            footer={deleteUserDialogFooter}
            onHide={hideDeleteUserDialog}>
            <div className="flex align-items-center justify-content-center">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {user && (
                <span>
                  Are you sure you want to delete <b>{user.name}</b>?
                </span>
              )}
            </div>
          </Dialog>

          <Dialog
            visible={deleteUserDialog}
            style={{ width: "450px" }}
            header="Confirm"
            modal
            footer={deleteUserDialogFooter}
            onHide={hideDeleteUserDialog}>
            <div className="flex align-items-center justify-content-center">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {user && (
                <span>
                  Are you sure you want to delete <b>{user.name}</b>?
                </span>
              )}
            </div>
          </Dialog>

          <Dialog
            visible={deleteUsersDialog}
            style={{ width: "450px" }}
            header="Confirm"
            modal
            footer={deleteUsersDialogFooter}
            onHide={hideDeleteUsersDialog}>
            <div className="flex align-items-center justify-content-center">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {user && (
                <span>Are you sure you want to delete the selected users?</span>
              )}
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default CrudUser;
