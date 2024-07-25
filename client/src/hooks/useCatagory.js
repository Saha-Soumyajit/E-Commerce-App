import { useState, useEffect } from "react";
import axios from "axios";

export default function useCatagory() {
  const [catagories, setCatagories] = useState([]);

  // Get Catagories
  const getCatagories = async() => {
    try {
      const {data} = await axios.get("http://localhost:8000/api/v1/catagory/get-catagory");
      setCatagories(data?.catagory);
        
    } catch (error) {
      console.log("Error Occurred", error);
    }
  }

  useEffect(() => {
    getCatagories();
  }, []);

  return catagories;
}