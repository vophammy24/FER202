import { useContext } from "react";
import PaymentContext from "../contexts/PaymentContext";

export const usePayment = () => useContext(PaymentContext);