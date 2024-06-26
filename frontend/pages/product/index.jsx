import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { classNames } from "primereact/utils";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  createProduct,
  delProduct,
  getProducts,
  updateProduct,
} from "@/services/productServices";
import FileUploadCust from "@/components/customFileupload";
import { getCategories } from "@/services/categoryServices";

const CrudMenu = () => {
  let emptyProduct = {
    id: null,
    nm_product: "",
    no_product: "",
    img_product: null,
    descr_product: "",
    id_categ: null,
    price_product: 0,
    qty_product: 0,
    status_product: "",
  };

  const [products, setProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});

  const [deleteProductDialog, setDeleteProductDialog] = useState(false);
  const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);

  const [product, setProduct] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);

  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    getProducts().then((res) => {
      if (!res.data.error) {
        setProducts(res.data.data.dtProduct);
      }
      console.log(res.data.data);
    });
    getCategories().then((res) => {
      if (!res.data.error) {
        setCategories(res.data.data);
      }
    });
  }, []);

  const openNew = () => {
    setProduct(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const hideDeleteProductDialog = () => {
    setDeleteProductDialog(false);
  };

  const hideDeleteProductsDialog = () => {
    setDeleteProductsDialog(false);
  };

  const saveProduct = () => {
    setSubmitted(true);

    if (product.nm_product.trim()) {
      let _products = [...products];
      let _product = { ...product };

      // update
      if (product.id) {
        const index = findIndexById(product.id);

        console.log(_product);
        _products[index] = _product;
        console.log(_product);

        // update product
        updateProduct(_product)
          .then((res) => {
            if (!res.data.error) {
              toast.current.show({
                severity: "success",
                summary: "Successful",
                detail: "Product Updated",
                life: 3000,
              });

              console.log(_product);
              setProducts(_products);
              setProductDialog(false);
              setProduct(emptyProduct);
            } else {
              setErrors(res.data.data);

              toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Product Failed to be Updated",
                life: 3000,
              });
            }
          })
          .catch((e) => {
            toast.current.show({
              severity: "error",
              summary: "Error",
              detail: "Product Failed to be Created",
              life: 3000,
            });
          });

        // create
      } else {
        _product.no_product = createId();
        // _product.img_product = ;
        _products.push(_product);

        // create product
        createProduct(_product)
          .then((res) => {
            if (!res.data.error) {
              console.log(_product);
              toast.current.show({
                severity: "success",
                summary: "Successful",
                detail: "Product Created",
                life: 3000,
              });

              setProducts(_products);
              setProductDialog(false);
              setProduct(emptyProduct);
            } else {
              setErrors(res.data.data);

              toast.current.show({
                severity: "error",
                summary: "Error",
                detail: "Product Failed to be Created",
                life: 3000,
              });
            }
          })
          .catch((e) => {
            toast.current.show({
              severity: "error",
              summary: "Error",
              detail: "Product Failed to be Created",
              life: 3000,
            });
          });
      }
    }
  };

  const editProduct = (product) => {
    setProduct({ ...product });
    setProductDialog(true);
  };

  const confirmDeleteProduct = (product) => {
    setProduct(product);
    setDeleteProductDialog(true);
  };

  const deleteProduct = () => {
    let _products = products.filter((val) => val.id !== product.id);

    // delete product
    delProduct(product.id)
      .then((res) => {
        if (!res.data.error) {
          toast.current.show({
            severity: "success",
            summary: "Successful",
            detail: "Product Deleted",
            life: 3000,
          });

          setProducts(_products);
          setDeleteProductDialog(false);
          setProduct(emptyProduct);
        } else {
          setErrors(res.data.data);

          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Product Failed to be Deleted",
            life: 3000,
          });
        }
      })
      .catch((e) => {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Product Failed to be Deleted",
          life: 3000,
        });
      });
  };

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const createId = () => {
    let id = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };

  const confirmDeleteSelected = () => {
    setDeleteProductsDialog(true);
  };

  const deleteSelectedProducts = () => {
    let _products = products.filter((val) => !selectedProducts.includes(val));

    selectedProducts.map((p) => {
      // delete product
      delProduct(p.id)
        .then((res) => {
          if (!res.data.error) {
            toast.current.show({
              severity: "success",
              summary: "Successful",
              detail: "Product Deleted",
              life: 3000,
            });

            setProducts(_products);
            setDeleteProductsDialog(false);
            setSelectedProducts(null);
          } else {
            setErrors(res.data.data);

            toast.current.show({
              severity: "error",
              summary: "Error",
              detail: "Product Failed to be Deleted",
              life: 3000,
            });
          }
        })
        .catch((e) => {
          toast.current.show({
            severity: "error",
            summary: "Error",
            detail: "Product Failed to be Deleted",
            life: 3000,
          });
        });
    });
  };

  // input handle
  const onRadioChange = (e, name) => {
    console.log(name);

    const val = e.value || "";
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
  };

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _product = { ...product };
    _product[`${name}`] = val;

    setProduct(_product);
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
            disabled={!selectedProducts || !selectedProducts.length}
          />
        </div>
      </React.Fragment>
    );
  };

  const codeBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Code</span>
        {rowData.no_product}
      </>
    );
  };

  const nameBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Name</span>
        {rowData.nm_product}
      </>
    );
  };

  const imageBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Image</span>
        <Image
          src={`/uploads/no_image.jpg`}
          alt={rowData.img_product ? "hai" : "hai"}
          className="shadow-2"
          width={100}
          height={100}
        />
      </>
    );
  };

  const priceBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Price</span>
        {rowData.price_product}
      </>
    );
  };

  const categoryBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Category</span>
        {categories.map((c) => rowData.id_categ == c.id && c.nm_categ)}
      </>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Status</span>
        <span className={`product-badge status-${rowData.status_product}`}>
          {rowData.status_product}
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
          onClick={() => editProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          severity="warning"
          rounded
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </>
    );
  };

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Manage Products</h5>
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

  const productDialogFooter = (
    <>
      <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" text onClick={saveProduct} />
    </>
  );

  const deleteProductDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        text
        onClick={hideDeleteProductDialog}
      />
      <Button label="Yes" icon="pi pi-check" text onClick={deleteProduct} />
    </>
  );
  const deleteProductsDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        text
        onClick={hideDeleteProductsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        text
        onClick={deleteSelectedProducts}
      />
    </>
  );

  return (
    <div className="grid crudMenu-demo">
      <div className="col-12">
        <div className="card">
          <Toast ref={toast} />
          <Toolbar className="mb-4" start={leftToolbarTemplate}></Toolbar>

          <DataTable
            ref={dt}
            value={products}
            selection={selectedProducts}
            onSelectionChange={(e) => setSelectedProducts(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
            globalFilter={globalFilter}
            emptyMessage="No products found."
            header={header}>
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "4rem" }}></Column>
            <Column
              field="no_product"
              header="No product"
              sortable
              body={codeBodyTemplate}
              headerStyle={{ minWidth: "15rem" }}></Column>
            <Column
              field="name"
              header="Nama product"
              sortable
              body={nameBodyTemplate}
              headerStyle={{ minWidth: "15rem" }}></Column>
            <Column header="Gambar" body={imageBodyTemplate}></Column>
            <Column
              field="price"
              header="Harga"
              body={priceBodyTemplate}
              sortable></Column>
            <Column
              field="category"
              header="Kategori"
              sortable
              body={categoryBodyTemplate}
              headerStyle={{ minWidth: "10rem" }}></Column>
            <Column
              field="status_product"
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
            visible={productDialog}
            style={{ width: "450px" }}
            header="Add Product"
            modal
            className="p-fluid"
            footer={productDialogFooter}
            onHide={hideDialog}>
            {product.image ? (
              <Image
                src={`/uploads/no_image.jpg`}
                alt={product.image}
                width={150}
                height={150}
                className="mt-0 mx-auto mb-5 block shadow-2"
              />
            ) : (
              <FileUploadCust filename={product.nm_product} />
            )}
            <div className="field">
              <label htmlFor="name">Name</label>
              <InputText
                id="name"
                value={product.nm_product}
                onChange={(e) => onInputChange(e, "nm_product")}
                required
                autoFocus
                className={classNames({
                  "p-invalid":
                    (submitted && !product.nm_product) || errors.nm_product,
                })}
              />
              {submitted && !product.nm_product ? (
                <>
                  <small className="p-invalid">Name is required.</small> <br />
                </>
              ) : (
                errors.nm_product &&
                errors.nm_product.map((er, _index) => (
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
              <label htmlFor="description">Description</label>
              <InputTextarea
                id="description"
                value={product.descr_product}
                onChange={(e) => onInputChange(e, "descr_product")}
                required
                rows={3}
                cols={20}
                className={classNames({
                  "p-invalid":
                    (submitted && !product.descr_product) ||
                    errors.descr_product,
                })}
              />

              {submitted && !product.descr_product ? (
                <>
                  <small className="p-invalid">description is required.</small>{" "}
                  <br />
                </>
              ) : (
                errors.descr_product &&
                errors.descr_product.map((er, _index) => (
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
              <label className="mb-3">Category</label>
              <div className="formgrid grid">
                {categories.map((v) => {
                  return (
                    <div key={v.id} className="field-radiobutton col-6">
                      <RadioButton
                        inputId={v.id}
                        name="category"
                        value={v.id}
                        onChange={(e) => onRadioChange(e, "id_categ")}
                        checked={product.id_categ === v.id}
                        className={classNames({
                          "p-invalid":
                            (submitted && !product.id_categ) || errors.id_categ,
                        })}
                      />
                      <label htmlFor={v.id}>{v.nm_categ}</label>
                    </div>
                  );
                })}
                {submitted && !product.id_categ ? (
                  <>
                    <small className="p-invalid">category is required.</small>{" "}
                    <br />
                  </>
                ) : (
                  errors.id_categ &&
                  errors.id_categ.map((er, _index) => (
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

            <div className="formgrid grid">
              <div className="field col">
                <label htmlFor="price">Price</label>
                <InputNumber
                  id="price"
                  value={product.price_product}
                  onValueChange={(e) => onInputNumberChange(e, "price_product")}
                  mode="currency"
                  currency="IDR"
                  locale="id-ID"
                  className={classNames({
                    "p-invalid":
                      (submitted && !product.price_product) ||
                      errors.price_product,
                  })}
                />
                {errors.price_product &&
                  errors.price_product.map((er, _index) => (
                    <>
                      <small key={_index} className="p-invalid">
                        {er}
                      </small>{" "}
                      <br />
                    </>
                  ))}
              </div>
              <div className="field col">
                <label htmlFor="quantity">Quantity</label>
                <InputNumber
                  id="quantity"
                  value={product.qty_product}
                  onValueChange={(e) => onInputNumberChange(e, "qty_product")}
                  integeronly
                  className={classNames({
                    "p-invalid":
                      (submitted && !product.qty_product) || errors.qty_product,
                  })}
                />
                {errors.qty_product &&
                  errors.qty_product.map((er, _index) => (
                    <>
                      <small key={_index} className="p-invalid">
                        {er}
                      </small>{" "}
                      <br />
                    </>
                  ))}
              </div>
            </div>

            <div className="field">
              <label className="mb-3">Status</label>
              <div className="formgrid grid">
                <div className="field-radiobutton col-6">
                  <RadioButton
                    inputId={"stat1"}
                    name="stat"
                    value={"instock"}
                    onChange={(e) => onRadioChange(e, "status_product")}
                    checked={product.status_product === "instock"}
                    className={classNames({
                      "p-invalid":
                        (submitted && !product.status_product) ||
                        errors.status_product,
                    })}
                  />
                  <label htmlFor={"stat1"}>instock</label>
                </div>
                <div className="field-radiobutton col-6">
                  <RadioButton
                    inputId={"stat2"}
                    name="stat"
                    value={"outofstock"}
                    onChange={(e) => onRadioChange(e, "status_product")}
                    checked={product.status_product === "outofstock"}
                    className={classNames({
                      "p-invalid":
                        (submitted && !product.status_product) ||
                        errors.status_product,
                    })}
                  />
                  <label htmlFor={"stat2"}>outofstock</label>
                </div>
                {submitted && !product.status_product ? (
                  <>
                    <small className="p-invalid">status is required.</small>{" "}
                    <br />
                  </>
                ) : (
                  errors.status_product &&
                  errors.status_product.map((er, _index) => (
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
            visible={deleteProductDialog}
            style={{ width: "450px" }}
            header="Confirm"
            modal
            footer={deleteProductDialogFooter}
            onHide={hideDeleteProductDialog}>
            <div className="flex align-items-center justify-content-center">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {product && (
                <span>
                  Are you sure you want to delete <b>{product.name}</b>?
                </span>
              )}
            </div>
          </Dialog>

          <Dialog
            visible={deleteProductsDialog}
            style={{ width: "450px" }}
            header="Confirm"
            modal
            footer={deleteProductsDialogFooter}
            onHide={hideDeleteProductsDialog}>
            <div className="flex align-items-center justify-content-center">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: "2rem" }}
              />
              {product && (
                <span>
                  Are you sure you want to delete the selected products?
                </span>
              )}
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default CrudMenu;
