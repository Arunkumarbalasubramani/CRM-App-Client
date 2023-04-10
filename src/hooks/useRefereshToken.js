import useAuth from "./useAuth";
import axios from "axios";

const useRefereshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await axios.po;
  };
  return refresh;
};

export default useRefereshToken;
