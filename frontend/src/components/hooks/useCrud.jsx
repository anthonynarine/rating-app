import useAxiosWithInterceptor from "../../utility/jwtinterceptor";
import { BASE_URL } from "../../config";
import { useState } from "react";

const useCrud = ([], apiURL) => {
  const jwtAxios = useAxiosWithInterceptor();
  const [dataCRUD, setDataCrud] = useState([]);
  const [error, setError] = useState(null);
  const [isloading, setIsloading] = useState(false);

  //READ
  const fetchData = async () => {
    setIsloading(true);
    try {
      const response = await jwtAxios.get(`${BASE_URL}${apiURL}`, {});
      const data = response.data;
      console.log("DATA:", data);
      setDataCrud(data);
      setError(null);
      setIsloading(false);
      return data;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(new Error("400"));
      }
      console.log("ERROR:", error);
      setIsloading(false);
      throw error;
    }
  };
  //CREATE Movie
  const createData = async (newData) => {
    setIsloading(true);
    try {
      const response = await jwtAxios.post(`${BASE_URL}${apiURL}`, newData);

      const data = response.data;
      setDataCrud((prevData) => [...prevData, data]);
      setError(null);
      setIsloading(false);
      return data;
    } catch (error) {
      console.error("Error creating data:", error);
      setIsloading(false);
      setError(error);
      throw error;
    }
  };
  //DELETE
  const deleteData = async (id) => {
    setIsloading(true);
    const fullURL = `${BASE_URL}${apiURL}/${id}`;
    console.log("Deleting resource at URL:", fullURL); // Debugging the URL
    try {
      await jwtAxios.delete(`${BASE_URL}${apiURL}/${id}`);
      setDataCrud((prevData) => prevData.filter((item) => item.id !== id));
      setError(null);
      setIsloading(false);
    } catch (error) {
      console.error("Error deleting data:", error);
      setIsloading(false);
      setError(error);
      throw error;
    }
  };

  const rateMoive = async (id, rating) => {
    const accessToken = localStorage.getItem("accessToken");
    setIsloading(true);
    try {
      const response = await jwtAxios.post(
        `${BASE_URL}${apiURL}${id}`,
        { rating },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    console.log("Movie rated", response.data);
    
    setIsloading(false);
    return response.data
    } catch (error) {
    console.error("Error rating movie", error);
    setIsloading(false)
    setError(error)
    throw error
    }
  };

  return { fetchData, dataCRUD, error, isloading, createData, deleteData, rateMoive };
};
export default useCrud;
