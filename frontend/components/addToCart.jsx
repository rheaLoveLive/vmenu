import { InputNumber } from "primereact/inputnumber";
import { useEffect, useState } from "react";
import NumberInput from "./custumNumInp";

const AddTrans = ({ data, categ }) => {
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [dataCart, setDataCart] = useState([]);

  useEffect(() => {
    setProduct(data);
    setQty(1);
  }, [data]);

  const handleCounter = (name) => {
    if (name == "plus") {
      setQty(qty + 1);
    } else {
      if (qty !== 1) {
        setQty(qty - 1);
      }
    }
  };

  const handleAddToCart = () => {
    let storeData = {
      id_product: product.id,
      nm_product: product.nm_product,
      id_categ: product.id_categ,
      price_product: product.price_product,
      gtotal: product.price_product * qty,
      qty: qty,
    };

    console.log(qty);

    setDataCart((prevDataCart) => {
      const existingProductIndex = prevDataCart.findIndex(
        (item) => item.id_product === product.id
      );

      if (existingProductIndex >= 0) {
        const updatedCart = prevDataCart.map((item, index) => {
          const tQty = item.qty + qty;
          return index === existingProductIndex
            ? {
                ...item,
                qty: tQty,
                gtotal: product.price_product * tQty,
              }
            : item;
        });
        return updatedCart;
      } else {
        return [...prevDataCart, storeData];
      }
    });
  };

  const handleEditItemCart = (v, id) => {
    setDataCart((prevDataCart) => {
      const existingProductIndex = prevDataCart.findIndex(
        (item) => item.id_product === id
      );

      // jika item ditemukan
      if (existingProductIndex >= 0) {
        let updatedCart;
        // return kosong
        if (v == 0 || !v) {
          updatedCart = prevDataCart.filter(
            (_, index) => index !== existingProductIndex
          );
        } else {
          updatedCart = prevDataCart.map((item, index) => {
            return index === existingProductIndex
              ? {
                  ...item,
                  qty: v,
                  gtotal: item.price_product * v,
                }
              : item;
          });
        }

        // jika data tidak ada tutup modal
        if (updatedCart.length == 0) {
          document.getElementById("closeModal4").click();
        }

        return updatedCart;
      }

      return prevDataCart;
    });
  };

  // menyimpan
  const handlePaying = () => {
    console.log(dataCart);
  };

  return (
    <>
      {/* adding */}
      <dialog id="my_modal_3" className="modal modal-bottom">
        <div className="modal-box bg-[#282828] rounded-none text-white">
          {/* tombol close */}
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute top-0 right-0 mt-2 mr-3 sm:mr-4 hover:bg-[#ffffff5d] text-white">
              ✕
            </button>
          </form>
          {/* harga total */}
          <h4 className="absolute text-white top-0 right-0 mt-6 mr-4 sm:mr-5">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(product?.price_product * qty)}
          </h4>
          {/* nama product */}
          <div className="border-b-[1px]">
            <h3 className="font-bold text-lg text-white">
              {product?.nm_product.toUpperCase()}
            </h3>
            <p className="pt-4 pb-1">{product?.descr_product}</p>
          </div>

          {/* actions */}
          <div className="flex mt-4 justify-between">
            {/* input */}
            <div className="join items-center">
              <div className="indicator">
                <button
                  onClick={() => handleCounter("minus")}
                  className="btn join-item h-[30px] min-h-[30px]">
                  <i className="pi pi-minus"></i>
                </button>
              </div>
              <input
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(parseInt(e.target.value))}
                className="input h-[30px] w-[20%] join-item text-black"
              />
              <div className="indicator">
                <button
                  onClick={() => handleCounter("plus")}
                  className="btn h-[30px] min-h-[30px] join-item">
                  <i className="pi pi-plus"></i>
                </button>
              </div>
            </div>

            {/* add to cart */}
            <div className="w-[30%]">
              <form method="dialog">
                <button
                  className="btn h-[30px] min-h-[30px] bg-slate-300 w-[100%]"
                  onClick={() => {
                    handleAddToCart();
                  }}>
                  Add
                </button>
              </form>
            </div>
          </div>
        </div>
      </dialog>

      {/* info cart */}
      {dataCart?.length !== 0 ? (
        <section>
          <div className="fixed inset-x-0 bottom-0 mx-auto p-4">
            <button
              className="relative flex items-center justify-between gap-4 rounded-lg bg-[#15112a] px-4 py-3 w-full text-white shadow-lg hover:scale-[.998] hover:cursor-pointer"
              onClick={() => document.getElementById("my_modal_4").showModal()}>
              <div>
                <p className="text-sm font-medium">
                  kamu memiliki {dataCart?.length} pesanan
                </p>
                <p className="text-left">
                  Total :{" "}
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(
                    dataCart?.reduce((total, item) => total + item.gtotal, 0)
                  )}
                </p>
              </div>
              <i className="pi pi-shopping-cart"></i>
            </button>
          </div>
        </section>
      ) : (
        ""
      )}

      {/* cart */}
      <dialog id="my_modal_4" className="modal modal-bottom ">
        <div className="modal-box bg-[#282828] rounded-none text-white h-[60%] overflow-y-auto">
          {/* tombol close */}
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute top-0 right-0 mt-3 mr-3 sm:mr-4 hover:bg-[#ffffff5d] text-white">
              ✕
            </button>
          </form>
          <h3 className="text-white font-bold text-xl absolute top-0 left-0 mt-3 ml-4">
            Pesanan anda
          </h3>
          {/* pesanan */}
          <div className="mt-[35px]">
            {/* items */}
            <div className="flex flex-col gap-2">
              {dataCart?.map((d) => (
                <div
                  key={d.id_product}
                  className="bg-[#6969695e] py-2 relative px-3 rounded-md shadow shadow-[#5e5e5e] flex justify-between items-center">
                  {/* left */}
                  <div className="">
                    <h4 className="text-white font-semibold text-lg p-0 m-0">
                      {d.nm_product}
                    </h4>
                    <p className="text-[12px]">
                      {categ.map((c) => d.id_categ == c.id && c.nm_categ)}
                    </p>
                  </div>
                  {/* right */}
                  <div className="">
                    <p className="text-end">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(d.gtotal)}
                    </p>
                    {/* input */}
                    <div className="join items-center w-min">
                      <div className="indicator">
                        <button
                          onClick={() =>
                            handleEditItemCart(
                              parseInt(d.qty) - 1,
                              d.id_product
                            )
                          }
                          className="btn join-item h-[25px] min-h-[25px] px-[5px]">
                          <i className="pi pi-minus text-[10px]"></i>
                        </button>
                      </div>
                      <input
                        type="number"
                        min={1}
                        value={d.qty}
                        onChange={(e) =>
                          handleEditItemCart(
                            parseInt(e.target.value),
                            d.id_product
                          )
                        }
                        className="h-[25px] outline-none w-[32px] px-2 text-black"
                      />
                      <div className="indicator">
                        <button
                          onClick={() =>
                            handleEditItemCart(
                              parseInt(d.qty) + 1,
                              d.id_product
                            )
                          }
                          className="btn h-[25px] min-h-[25px] px-[5px] join-item">
                          <i className="pi pi-plus text-[10px]"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <hr className="my-4" />
            {/* utilities */}
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-white">
                  Total :{" "}
                  {new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  }).format(
                    dataCart?.reduce((total, item) => total + item.gtotal, 0)
                  )}
                </h4>
              </div>

              <div>
                <button
                  className="btn h-[40px] min-h-[40px] px-7"
                  onClick={() => handlePaying()}>
                  Bayar
                </button>
              </div>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button className="cursor-default" id="closeModal4">
            close
          </button>
        </form>
      </dialog>
    </>
  );
};

export default AddTrans;
