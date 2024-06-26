import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getProducts } from "@/services/productServices";
import { Ripple } from "primereact/ripple";
import { CategSkeleton, ProdSkeleton } from "@/components/skeleton";
import AddTrans from "@/components/addToCart";

const Menu = () => {
  // product sebelum difilter
  const [product, setProduct] = useState(null);
  // product setelah difilter
  const [prodFilt, setProdFilt] = useState(null);
  // data kategori
  const [categ, setCateg] = useState(null);
  // data dari input categ
  const [categInp, setCategInp] = useState(0);
  const [search, setSearch] = useState("");
  // single data untuk mengisi transaksi
  const [singleData, setSingleData] = useState(null);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setLoad(true);
    // ambil data product
    getProducts()
      .then((res) => {
        if (!res.data.error) {
          setLoad(false);
          setCateg(res.data.data.dtCateg);
          setProduct(res.data.data.dtProduct);
          // ambil data untuk kategori all pertama kali
          if (categInp == 0) setProdFilt(res.data.data.dtProduct);
        }
      })
      .finally(() => {
        setLoad(false);
      });
  }, []);

  // handle search
  useEffect(() => {
    filterProducts(categInp, search);
  }, [search, categInp]);

  // handle kategori
  const handleRadio = (e) => {
    const val = parseInt(e.target.value);
    setCategInp(val);
    filterProducts(val, search);
  };

  const filterProducts = (id_categ, searchVal) => {
    let filtered = product;

    // Filter menurut kategori
    if (id_categ !== 0) {
      filtered = product.filter((p) => p.id_categ === id_categ);
    }

    // Filter menurt pencarian
    if (searchVal.length > 0) {
      const x = new RegExp(searchVal, "i");
      filtered = filtered.filter(
        (d) =>
          // menurrt nma kategori
          categ.some((c) => d.id_categ === c.id && x.test(c.nm_categ)) ||
          // menurut nama product
          x.test(d.nm_product) ||
          // menurut desckripsi
          x.test(d.descr_product) ||
          // menurut harga
          x.test(d.price_product)
      );
    }

    setProdFilt(filtered);
  };

  return (
    <main className="bg-[#e8e8e8] w-screen h-screen relative overflow-x-hidden overflow-y-autoflex flex-col">
      {/* nav */}
      <nav className="navbar px-5 py-2 sticky top-0 bg-[#E7E6E1] rounded-b-[20px] z-50 shadow-[#ffffff2e] shadow-md">
        <div className="relative w-full">
          <div className="form-control w-full mr-[20px]">
            <div className="flex w-auto relative">
              <input
                type="text"
                id="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="py-[6px] pl-3 outline-none rounded-s-[8px] bg-white shadow-sm w-full"
              />

              <label
                htmlFor="search"
                className="py-1 px-3 bg-white rounded-e-[8px] flex justify-center items-center cursor-text">
                {search.length == 0 ? (
                  <i className="pi pi-search"></i>
                ) : (
                  <button
                    onClick={() => {
                      setSearch("");
                    }}
                    className="btn btn-sm btn-circle btn-ghost absolute top-[2px] right-[5px] hover:bg-[#ffffff5d] text-black">
                    ✕
                  </button>
                )}
              </label>
            </div>
          </div>
          <h4 className="font-bold mr-[10px] text-[20px] text-nowrap">Menu</h4>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <Image
                  width={100}
                  height={100}
                  alt="Tailwind CSS Navbar component"
                  src={"/uploads/no_image.jpg"}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <a>Login</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* nav end */}

      {/* hero */}
      <section className="hero h-[300px] mt-[-80px] overflow-y-hidden">
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="text-neutral-content pt-[100px]  sm:pt-[120px]">
          <div className="mx-5 text-center md:text-justify md:my-0">
            <h1 className="mb-2 text-5xl font-bold text-white [text-shadow:3px_3px_2px_rgba(0,0,0,0.6);]">
              Selamat Memilih
            </h1>
            <p className="text-white [text-shadow:1px_1px_2px_rgba(0,0,0,0.8);]">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem
              molestiae repellendus, at aspernatur eligendi, odit expedita nemo
              culpa nobis optio velit
            </p>
          </div>
        </div>
      </section>
      {/* hero end */}

      {/* kategori */}
      <section className="">
        <div className="pt-5 pb-3 flex mx-5 gap-1 overflow-x-auto">
          {load ? (
            <CategSkeleton />
          ) : (
            <div className="cursor-pointer flex-shrink-0">
              <input
                type="radio"
                onChange={(e) => handleRadio(e, 0)}
                name="rad"
                value={0}
                id={"all"}
                hidden
              />
              <label
                htmlFor={"all"}
                className="px-2 py-1 flex flex-col justify-center items-center overflow-hidden">
                <Image
                  src={require("@/public/uploads/no_image.jpg")}
                  alt="categ"
                  className={`h-[60px] w-[60px] rounded-[15px] ${
                    0 == categInp ? "shadow-[#cd5b5b4e] shadow-md" : "shadow-lg"
                  }  mb-[10px]`}
                />
                <h4
                  className={`${
                    0 == categInp
                      ? "text-[#e64141] font-semibold"
                      : "text-black"
                  }`}>
                  all
                </h4>
              </label>
            </div>
          )}
          {load ? (
            <CategSkeleton />
          ) : (
            categ?.map((d) => (
              <div key={d.id} className="hover:bg-[] cursor-pointer">
                <input
                  type="radio"
                  onChange={(e) => handleRadio(e, "categ")}
                  name="rad"
                  value={d.id}
                  id={d.id}
                  hidden
                />
                <label
                  htmlFor={d.id}
                  className="px-2 py-1 flex flex-col justify-center items-center overflow-hidden">
                  <Image
                    src={require("@/public/uploads/no_image.jpg")}
                    alt="categ"
                    className={`h-[60px] w-[60px] rounded-[15px] ${
                      d.id == categInp
                        ? "shadow-[#cd5b5b4e] shadow-md"
                        : "shadow-lg"
                    } mb-[10px]`}
                  />
                  <h4
                    className={`${
                      d.id == categInp
                        ? "text-[#e64141] font-semibold"
                        : "text-black"
                    }`}>
                    {d.nm_categ}
                  </h4>
                </label>
              </div>
            ))
          )}
        </div>
      </section>
      {/* kategori end*/}

      {/* menu */}
      <section className="bg-[#e8e8e8] relative pb-[120px]">
        <div className="flex px-5 gap-2 flex-col">
          {load ? (
            <ProdSkeleton />
          ) : prodFilt?.length === 0 ? (
            <h2 className="font-bold">Maaf product tidak ditemukan</h2>
          ) : (
            prodFilt?.map((d) => (
              <div
                key={d.id}
                className="bg-[#ccc] py-2 px-2 flex rounded-[5px] items-center hover:scale-[.995] transition-all hover:bg-[#acacac]"
                onClick={() => {
                  document.getElementById("my_modal_3").showModal();
                  setSingleData(d);
                }}>
                <div className="flex items-center w-full">
                  <Image
                    src={require("@/public/uploads/no_image.jpg")}
                    alt="icon"
                    className="rounded-md shadow-md w-[60px] h-[60px] md:w-[70px] md:h-[70px] object-cover"
                  />

                  <div className="ml-2 grow descCont">
                    <h4 className="font-semibold text-[18px] md:text-[20px]">
                      {d.nm_product}
                    </h4>
                    <p className="text-[14px] font-semibold">
                      {categ.map((c) => d.id_categ == c.id && c.nm_categ)} /{" "}
                      <i>
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        }).format(d.price_product)}
                      </i>
                    </p>
                    <p
                      className={`w-[100px] md:w-[500px] sm:w-[300px] text-[14px] desc overflow-hidden text-ellipsis whitespace-nowrap`}>
                      {d.descr_product}
                    </p>
                  </div>
                </div>

                <div className="">
                  <button
                    className="py-[2px] px-4 border border-[#424242] rounded-md hover:bg-white"
                    onClick={() => {
                      document.getElementById("my_modal_3").showModal();
                      setSingleData(d);
                    }}>
                    add
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
      {/* menu end */}

      {/* trans */}
      <AddTrans data={singleData} categ={categ} />
      {/* trans end */}
    </main>
  );
};

Menu.getLayout = function getLayout(page) {
  return <React.Fragment>{page}</React.Fragment>;
};

export default Menu;
