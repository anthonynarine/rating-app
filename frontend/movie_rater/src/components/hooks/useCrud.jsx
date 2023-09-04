
import useAxiosWithInterceptor from "../../utility/jwtinterceptor";
import { BASE_URL } from "../../config";
import { useState } from "react"



const useCrud = (initialData, apiURL) => {
    const jwtAxios = useAxiosWithInterceptor();
    const [dataCRUD, setDataCrud] = useState(initialData);
    const [error, setError] = useState(null)
    const [isloading, setIsloading] = useState(false)


    const fetchData = async () => {
        setIsloading(true)
        try {
            const response = await jwtAxios.get(`${BASE_URL}${apiURL}`, {})
            const data = response.data
            console.log("DATA:", data)
            setDataCrud(data)
            setError(null)
            setIsloading(false)
            return data;
            
        } catch (error) {
            if(error.response && error.response.status === 400) {
                setError(new Error("400"))
            }
            console.log("ERROR:", error)
            setIsloading(false)
            throw error;               
        }
    }
    return {fetchData, dataCRUD, error, isloading}

}
export default useCrud;