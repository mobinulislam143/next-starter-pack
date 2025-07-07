import { NotificationItem } from "./me.type";
import { RiInstagramFill } from "react-icons/ri";
import {  Mail } from "lucide-react";

export const transactions = [
  {
    id: "TXN1001",
    date: "2025-07-01",
    description: "Payment received from client",
    amount: 1500.0,
    status: "Completed",
  },
  {
    id: "TXN1002",
    date: "2025-07-02",
    description: "Subscription renewal",
    amount: -49.99,
    status: "Completed",
  },
  {
    id: "TXN1003",
    date: "2025-07-03",
    description: "Payment pending from vendor",
    amount: 250.0,
    status: "Pending",
  },
  {
    id: "TXN1004",
    date: "2025-07-04",
    description: "Refund processed",
    amount: -150.0,
    status: "Completed",
  },
  {
    id: "TXN1005",
    date: "2025-07-05",
    description: "Failed payment attempt",
    amount: -99.99,
    status: "Failed",
  },
  {
    id: "TXN1006",
    date: "2025-07-06",
    description: "Invoice payment received",
    amount: 1100.0,
    status: "Completed",
  },
  {
    id: "TXN1007",
    date: "2025-07-06",
    description: "Manual adjustment",
    amount: 100.0,
    status: "Pending",
  },
  {
    id: "TXN1008",
    date: "2025-07-07",
    description: "Service fee deduction",
    amount: -25.0,
    status: "Completed",
  },
];


export const footerData = {
  companyInfo: {
    description:
      "ListMyCity does not charge booking fees or service fees. All property information is submitted directly by hosts or obtained through public channels. All transactions are handled independently between guest and host.",
    socialLinks: [
      { icon: RiInstagramFill, text: "@listmycity" },
      { icon: Mail, text: "inquiries@listmycity.us" },
    ],
  },
  navigationSections: [
    {
      title: "Quick Menu",
      links: [
        { text: "Home", href: "/" },
        { text: "Explore Stays", href: "/explore-stays" },
        // { text: "Refer & Earn", href: "/refer-earn" },
        { text: "List Your Property", href: "/property-list" },
        { text: "Help and Support", href: "/support" },
        // { text: "Messaging", href: "/messaging" },
        // { text: "Notification", href: "/notification" },
        // { text: "FAQs", href: "/faq" },
      ],
    },
    {
      title: "Information",
      links: [
        { text: "My Account", href: "/account" },
        { text: "Login", href: "/login" },
        { text: "My Properties", href: "/properties" },
        { text: "Save", href: "/saved" },
      ],
    },
    {
      title: "Service",
      links: [
        { text: "Basic Plan", href: "/pricing" },
        { text: "Standard Plan", href: "/pricing" },
        { text: "Premium Plan", href: "/pricing" },
        { text: "Privacy Policy", href: "/privacy-policy" },
        { text: "Terms & Conditions", href: "/terms" },
      ],
    },
  ],
  subscribe: {
    title: "Subscribe",
    description: "Enter your email below to be the first to know about new collections.",
  },
  copyright: "",
}


export const notificationData: NotificationItem[] = [
  {
    id: 1,
    title:
      "Please confirm your email address by clicking on the link we just emailed you. If you cannot find the email, you can request a new confirmation email or change your email address.",
    time: "1 days ago",
    read: false,
  },
  {
    id: 2,
    title: "Your order has been shipped",
    time: "2 days ago",
    read: false,
  },
  {
    id: 3,
    title: "Welcome to our platform!",
    time: "5 days ago",
    read: true,
  },
]