//Thêm sản phẩm vào giỏ hàng

export const addCart = (product) => {
  return {
    type: "ADDITEM",
    payload: product,
  };
};

//Xóa một sản phẩm ở giỏ hàng
export const deleteCart = (product) => {
  return {
    type: "DELITEM",
    payload: product,
  };
};
