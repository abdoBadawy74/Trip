// import { useEffect, useState } from "react";
// import "./Walaa.css";
// import { BASE } from '/src/API/Api.js';
// import locationIcon from "../assets/location-icon.svg";

// //  import { motion } from "framer-motion"

// function Walaa() {

//     console.log(BASE);
//     const[products , setproducts] = useState([]);

//     // const[Catogery , setCatogery] = useState([]);

//     const getdata = () => {
//         axios.get(`${BASE}/hotels`).then((res)=>{
//             setproducts(data);
//             console.log(res.data);
//         }).catch((err)=>{
//             console.log(err)
//         })
//     }

//     // const getdata = () => {
//     //     axios.get(`${BASE}/hotels`).then((res)=>{
//     //         setproducts(data);
//     //         console.log(res.data);
//     //     }).catch((err)=>{
//     //         console.log(err)
//     //     })
//     // }
//     // useEffect(()=>{
//     //     axios.get(`${BASE}/hotels`).then((res)=>{
//     //         setproducts(data);
//     //         console.log(res.data);
//     //     }).catch((err)=>{
//     //         console.log(err)
//     //     })

//     // })
//     useEffect (()=> {
//         getdata();
//  },[])

//     return (

//         <>
//     <div className="container">

// {/* {Catogery.map((cat) =>{
//             return(
//           <motion.button

//               layout
//               animate={{ transform: "scale(1)" }}
//               initial={{ transform: "scale(0)" }}
//               transition={{ type: "spring" ,damping:8}}
//                key={cat} onClick={() => {
//                 getproductcatogry(cat)
//               }}

//               className="btn btn-primary namm">  {cat}</motion.button>

//             );
//         }) } */}

// <div className="row">

// <p>uuuu</p>

// {products.map((product, index) => (
//                 <div key={index}>

//                     {/* <p>{product.data[0].description}</p>
//                     <p>Location: {product.location}</p>
//                     <p>Rating: {product.rating}</p>
//                     <p>Price: {product.ticket_price_from} - {product.ticket_price_to}</p>
//                     <div>
//                         {product.images.map(image => (
//                             <img key={image.id} src={image.url} alt={product.name} />
//                         ))}
//                     </div> */}
//     <div className="content d-flex flex-wrap flex-md-nowrap gap-4 my-3 justify-content-center">
//           <div className="box col-md-4 bg-white p-2 rounded">
//             <div className="image p-2">
//                     {product.data[index].images[index].map(image => (
//                             <img key={image.id} src={image.url} alt={product.name} className="w-100 rounded"/>
//                         ))}
//             </div>
//             <div className="text px-2">
//               <div className="d-flex align-items-center">
//                 <h3 className="fw-bold">{product.data[index].name}</h3>
//                 <p
//                   className="ms-auto fs-2 fw-bold"
//                   style={{
//                     color: "#F77A40",
//                   }}
//                 >
//                   45 DH
//                 </p>
//               </div>
//               <p
//                 style={{
//                   color: "#6B7A85",
//                 }}
//               >
//                 <img src={locationIcon} className="px-1" alt="location" />
//                 {product.data[index].location}
//               </p>
//               <div className="rating">
//                 <div>
//                   <i className="fa-solid fa-star text-warning mx-1"></i>
//                   <i className="fa-solid fa-star text-warning mx-1"></i>
//                   <i className="fa-solid fa-star text-warning mx-1"></i>
//                   <i className="fa-solid fa-star text-warning mx-1"></i>
//                   <i className="fa-solid fa-star mx-1 text-secondary"></i>
//                 </div>
//               </div>
//             </div>
//           </div>

//         </div>

//                 </div>
//             ))}

//   </div>
//   </div>
//         </>
//     )

// }

// export default Walaa;

import { useEffect, useState } from "react";
import axios from "axios";
import "./Walaa.css";
import { BASE } from "/src/API/Api.js";
import locationIcon from "../assets/location-icon.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";

function Walaa() {
  const [products, setProducts] = useState([]);
  const [state, setState] = useState("Abu Dhabi");
  const [searchState, setSearchState] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const getData = () => {
    axios
      .get(`${BASE}/hotels`)
      .then((res) => {
        setProducts(res.data.data);
        const initialFiltered = res.data.data.filter(
          (product) => product.state.name === state
        );
        setFilteredProducts(initialFiltered);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) => product.state.name === state);
    setFilteredProducts(filtered);
  }, [state, products]);

  const handleSearch = () => {
    if (searchState === "") {
      const filtered = products.filter(
        (product) => product.state.name === state
      );
      setFilteredProducts(filtered);
    } else {
      const filtered = products.filter((product) =>
        product.state.name.toLowerCase().includes(searchState.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="walaa">
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between align-items-start mb-4 mt-4 pt-4">
            <div>
              <h2
                className="text-uppercase"
                style={{
                  fontWeight: 600,
                  letterSpacing: "2px",
                  fontSize: "24px",
                  color: " #42A7C3",
                }}
              >
                All Hotels
              </h2>
            </div>
            <div>
              <button
                className={`btn ${
                  state === "Abu Dhabi" ? "bg-dark text-white" : "btn-light"
                } mx-2`}
                onClick={() => setState("Abu Dhabi")}
              >
                Abu Dhabi
              </button>
              <button
                className={`btn ${
                  state === "Dubai" ? "bg-dark text-white" : "btn-light"
                } mx-2`}
                onClick={() => setState("Dubai")}
              >
                Dubai
              </button>
            </div>
          </div>

          <div className="search container mt-5 d-flex ">
            <input
              type="text"
              className="form-control m-2"
              placeholder="Search by state"
              style={{
                backgroundColor: " #F8F9F9",
                border: "none",
                outline: "none",
              }}
              value={searchState}
              onChange={(e) => setSearchState(e.target.value)}
            />
            <button
              className="btn m-2"
              style={{ backgroundColor: "#42A7C3", color: "#ffff" }}
              onClick={handleSearch}
            >
              Search
            </button>
          </div>

          {filteredProducts.map((product, index) => (
            <motion.div
              layout
              animate={{ transform: "scale(1)" }}
              initial={{ transform: "scale(0)" }}
              transition={{ type: "spring", damping: 8 }}
              className="col-md-4 pt-4"
              key={index}
            >
              <div className="box bg-white p-2 rounded">
                <div className="image p-2">
                  {product.images.length > 0 && (
                    <img
                      src={product.images[0].url}
                      alt={product.name}
                      className="w-100 rounded"
                    />
                  )}
                </div>
                <div className="text px-2">
                  <div className="d-flex align-items-center">
                    <h3 className="fw-bold">{product.name}</h3>
                    <p
                      className="ms-auto fs-2 fw-bold"
                      style={{ color: "#F77A40" }}
                    >
                      45HD
                    </p>
                  </div>
                  <p style={{ color: "#6B7A85" }}>
                    <img src={locationIcon} className="px-1" alt="location" />
                    {product.location}
                  </p>
                  <div className="rating">
                    <div>
                      {[...Array(5)].map((star, i) => (
                        <i
                          key={i}
                          className={`fa-solid fa-star ${
                            i < product.rating
                              ? "text-warning"
                              : "text-secondary"
                          } mx-1`}
                        ></i>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Walaa;
