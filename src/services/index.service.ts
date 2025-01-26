import { BACKEND_DOMAIN } from "@/constants/constant";
import axios from "axios";

export const client = axios.create({
  baseURL: BACKEND_DOMAIN,
});
