import { FaUserNinja } from "react-icons/fa6";
import { MdOutlineAddHomeWork } from "react-icons/md";
import { Users} from "lucide-react";

export const transactions = [
  {
    id: "TX-2305",
    date: "2023-05-15",
    description: "Monthly Subscription",
    amount: 29.99,
    status: "Completed",
  },
  {
    id: "TX-2304",
    date: "2023-05-10",
    description: "Product Purchase",
    amount: 149.99,
    status: "Completed",
  },
  {
    id: "TX-2303",
    date: "2023-05-05",
    description: "Service Fee",
    amount: 19.99,
    status: "Pending",
  },
  {
    id: "TX-2302",
    date: "2023-04-28",
    description: "Refund",
    amount: -49.99,
    status: "Completed",
  },
  {
    id: "TX-2301",
    date: "2023-04-20",
    description: "Premium Plan Upgrade",
    amount: 99.99,
    status: "Failed",
  },
  {
    id: "TX-2300",
    date: "2023-04-15",
    description: "Annual Membership",
    amount: 199.99,
    status: "Completed",
  },
  {
    id: "TX-2299",
    date: "2023-04-10",
    description: "Support Ticket",
    amount: 15.0,
    status: "Pending",
  },
  {
    id: "TX-2298",
    date: "2023-04-05",
    description: "Add-on Purchase",
    amount: 24.99,
    status: "Completed",
  },
  {
    id: "TX-2297",
    date: "2023-03-28",
    description: "Consultation Fee",
    amount: 75.0,
    status: "Completed",
  },
  {
    id: "TX-2296",
    date: "2023-03-20",
    description: "Partial Refund",
    amount: -25.5,
    status: "Completed",
  },
  {
    id: "TX-2295",
    date: "2023-03-15",
    description: "Hardware Purchase",
    amount: 349.99,
    status: "Failed",
  },
  {
    id: "TX-2294",
    date: "2023-03-10",
    description: "Software License",
    amount: 129.99,
    status: "Completed",
  },
];

export const stats = [
  { label: "Total User", value: "1,200", icon: Users },
  { label: "Total Broker", value: "1,200", icon: FaUserNinja },
  { label: "Total Property", value: "1,200", icon: MdOutlineAddHomeWork },
  { label: "Total User", value: "1,200", icon: Users },
];

export const brokers = [
  {
    id: 1,
    name: "Big Kahuna Burger Ltd.",
    email: "tanya.hill@example.com",
    address: "227 Brookview Drive Beaumont, TX 77701",
  },
  {
    id: 2,
    name: "Biffco Enterprises Ltd.",
    email: "jackson.graham@example.com",
    address: "227 Brookview Drive Beaumont, TX 77701",
  },
  {
    id: 3,
    name: "Abstergo Ltd.",
    email: "michael.mitc@example.com",
    address: "227 Brookview Drive Beaumont, TX 77701",
  },
];
