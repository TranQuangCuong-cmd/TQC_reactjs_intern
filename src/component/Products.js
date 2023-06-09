import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { NavLink } from "react-router-dom";
import "./Footer.css";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  let conponentMouted = true;

  //Lấy dữ liệu từ API
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      if (conponentMouted) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
      }
      return () => {
        conponentMouted = false;
      };
    };
    getProducts();
  }, []);

  //tìm kiếm theo tên
  useEffect(() => {
    const result = filter.filter((filter) => {
      if (input === "") {
        return filter;
      } else if (filter.title.toLowerCase().includes(input.toLowerCase())) {
        return filter;
      }
    });
    setFilter(result);
  }, [input]);

  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height={350} />
          Đang tải
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    );
  };

  //Hàm phân loại từng chức năng sản phẩm
  const filterProduct = (cat) => {
    const updatedList = data.filter((x) => x.category === cat);
    setFilter(updatedList);
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5 pd-5">
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("men's clothing")}
          >
            Men's Clothing
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("women's clothing")}
          >
            Women's Clothing
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("jewelery")}
          >
            Jewelery
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("electronics")}
          >
            Electronic
          </button>
        </div>
        {filter.map((product) => {
          return (
            <>
              <div className="col-md-3 mb-4">
                <div class="card h-100 text-center p-4 " key={product.id}>
                  <img
                    src={product.image}
                    class="card-img-top"
                    alt={product.title}
                    height="250px"
                  />
                  <div class="card-body">
                    <h5 class="card-title mb-0">
                      {product.title.substring(0, 12)}...
                    </h5>
                    <p class="card-text lead fw-bold">${product.price}</p>
                    <NavLink to={`/products/${product.id}`}>
                      <button class="btn btn-outline-dark">
                        Thêm vào giỏ hàng
                      </button>
                    </NavLink>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </>
    );
  };

  return (
    <div className="container my-5 py-5">
      <div className="row mb-5">
        <div className="col-12">
          <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
          <hr />
        </div>
        <div className="search_item">
          <div>Nhập sản phẩm cần tìm</div>
          <input
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="input_text"
            placeholder="Nhập vào đồ cần tìm:"
          />
        </div>
      </div>
      <div className="row justify-content-center">
        {loading ? <Loading /> : <ShowProducts />}
      </div>
    </div>
  );
};
export default Products;
