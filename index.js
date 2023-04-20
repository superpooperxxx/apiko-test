import axios from "axios";
import dotenv from "dotenv";
import { logOrderInfo } from "./utils/logOrderInfo.js";

dotenv.config({ path: "config.env" });

const HOUR = 60 * 60 * 1000;

const { ORDERDESK_STORE_ID, ORDERDESK_API_KEY, BASE_URL } = process.env;

const headers = {
  "ORDERDESK-STORE-ID": ORDERDESK_STORE_ID,
  "ORDERDESK-API-KEY": ORDERDESK_API_KEY,
  "Content-Type": "application/json",
};

let search_start_date = new Date(new Date() - HOUR);

const fetchOrders = async () => {
  const res = await axios.get(`${BASE_URL}/orders`, {
    headers,
    params: { search_start_date },
  });

  const orders = res.data.orders;

  console.log(`${orders.length} orders found`);

  if (orders.length) {
    orders.forEach((order) => logOrderInfo(order));

    search_start_date = new Date(orders[0].date_added);
  }

  return setTimeout(() => {
    fetchOrders();
  }, HOUR);
};

fetchOrders();
