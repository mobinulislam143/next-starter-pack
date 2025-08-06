import { NotificationItem } from "./me.type";
import { RiInstagramFill } from "react-icons/ri";
import {  Mail } from "lucide-react";
import UserImg from "@/assets/women.png";
import { StaticImageData } from "next/image";
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

  export const dashboardStats = [
    {
      "id": "total-services",
      "title": "Total Services",
      "value": "154",
      "icon": "briefcase",
      "color": "orange",
      "bgColor": "bg-orange-50",
      "iconColor": "text-orange-600",
      "textColor": "text-gray-600"
    },
    {
      "id": "total-users",
      "title": "Total Users",
      "value": "5,056",
      "icon": "user",
      "color": "green",
      "bgColor": "bg-green-50",
      "iconColor": "text-green-600",
      "textColor": "text-gray-600"
    },
    {
      "id": "total-providers",
      "title": "Total Providers",
      "value": "59",
      "icon": "users",
      "color": "teal",
      "bgColor": "bg-teal-50",
      "iconColor": "text-teal-600",
      "textColor": "text-gray-600"
    },
    {
      "id": "total-earning",
      "title": "Total Earning",
      "value": "$26,816",
      "icon": "wallet",
      "color": "blue",
      "bgColor": "bg-blue-50",
      "iconColor": "text-blue-600",
      "textColor": "text-gray-600"
    }
  ]


interface UserChatInterface {
  id: number;
  name: string;
  location: string;
  lastMessage: string;
  timestamp: string;
  avatar: string | StaticImageData;
}
  export interface MessageInt {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isSent: boolean;
}


 export const UserChat: UserChatInterface[] = [
    {
      id: 1,
      name: "Hasan Habib",
      location: "Dhaka, Bangladesh",
      lastMessage: "Lorem ipsum dolor sit amet,dolor...",
      timestamp: "12:38",
      avatar: UserImg,
    },
    {
      id: 2,
      name: "Hasan Habib",
      location: "Dhaka, Bangladesh",
      lastMessage: "Lorem ipsum dolor sit amet,dolor...",
      timestamp: "12:38",
      avatar: UserImg,
    },
    {
      id: 3,
      name: "Hasan Habib",
      location: "Dhaka, Bangladesh",
      lastMessage: "Lorem ipsum dolor sit amet,dolor...",
      timestamp: "12:38",
      avatar: UserImg,
    },
    {
      id: 4,
      name: "Hasan Habib",
      location: "Dhaka, Bangladesh",
      lastMessage: "Lorem ipsum dolor sit amet,dolor...",
      timestamp: "12:38",
      avatar: UserImg,
    },
  ];

  export const chatmessage: MessageInt[] = [
      {
        id: 1,
        sender: "Hasan Habib",
        content:
          "Happy Weekend gauss see you on next week keep spirit and don't forget to chill",
        timestamp: "04:30 PM",
        isSent: false,
      },
      {
        id: 2,
        sender: "Hasan Habib",
        content:
          "Happy Weekend gauss see you on next week keep spirit and don't forget to chill",
        timestamp: "04:30 PM",
        isSent: false,
      },
      {
        id: 3,
        sender: "You",
        content:
          "Happy Weekend gauss see you on next week keep spirit next week keep spirit",
        timestamp: "04:30 PM",
        isSent: true,
      },
      {
        id: 4,
        sender: "Hasan Habib",
        content:
          "Happy Weekend gauss see you on next week keep spirit and don't forget to chill",
        timestamp: "04:30 PM",
        isSent: false,
      },
    ]


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