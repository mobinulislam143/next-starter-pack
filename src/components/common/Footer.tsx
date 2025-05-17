import Image from "next/image";
import Link from "next/link";

import { Facebook, Linkedin, Github } from "lucide-react";
import logo from "@/assets/logo/logo.jpg";
import applestore from "@/assets/logo/applestore.png";
import playstore from "@/assets/logo/playstore.png";
// import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {  useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";


type FooterLink = {
  label: string;
  href: string;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

// Footer navigation data
const footerSections: FooterSection[] = [
  {
    title: "Quick Share",
    links: [
      { label: "Auctions", href: "/auctions" },
      { label: "Sell a Car", href: "/sell-a-car" },
      { label: "Community", href: "/community" },
      { label: "What's Cars & Bids?", href: "/about" },
    ],
  },
  {
    title: "Policy",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

// Social media links
const socialLinks = [
  { icon: Facebook, href: "https://facebook.com" },
  { icon: Linkedin, href: "https://linkedin.com" },
  { icon: "Flickr", href: "https://flickr.com" },
  { icon: Github, href: "https://github.com" },
];

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});
export default function Footer() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Add your form submission logic here
  }
  return (
    <footer className="border-t border-gray-200 pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo and Subscribe Section */}
          <div className="col-span-1 md:col-span-1">
            <div className="mb-6">
              <div className="relative h-12 w-48">
                <Image src={logo} alt="Logo" fill className="object-contain" />
              </div>
            </div>
            <h3 className="mb-4 text-xl font-bold uppercase">
              Join the community
            </h3>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex items-center gap-3"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="ux.saifur.info@gmail.com"
                          className="h-12 text-base border-gray-300 focus-visible:ring-2 focus-visible:ring-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-sm" />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className=" h-12 text-base font-medium bg-primary hover:bg-primary/95"
                >
                  Subscribe Now
                </Button>
              </form>
            </Form>
            <p className="text-sm text-gray-600">
              By subscribing you agree to with our Privacy Policy
            </p>
          </div>

          {/* Footer Navigation Sections */}
          {footerSections.map((section, index) => (
            <div key={index} className="col-span-1">
              <h3 className="mb-4 text-lg font-medium">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-blue-500"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social Media and App Download */}
          <div className="col-span-1">
            <h3 className="mb-4 text-lg font-medium">Join Social Media</h3>
            <div className="mb-6 flex space-x-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="text-gray-600 hover:text-blue-500"
                >
                  {social.icon === "Flickr" ? (
                    <div className="flex h-6 w-6 items-center justify-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-blue-500 mr-0.5"></div>
                      <div className="h-2.5 w-2.5 rounded-full bg-pink-500"></div>
                    </div>
                  ) : (
                    <social.icon className="h-6 w-6" />
                  )}
                </Link>
              ))}
            </div>
            <h3 className="mb-4 text-lg font-medium">Download App</h3>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <Link href="https://apps.apple.com" className="inline-block">
                <Image
                  src={applestore}
                  alt="Download on App Store"
                  width={140}
                  height={42}
                  className="h-auto"
                />
              </Link>
              <Link href="https://play.google.com" className="inline-block">
                <Image
                  src={playstore}
                  alt="Get it on Google Play"
                  width={140}
                  height={42}
                  className="h-auto"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-200"></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            © 2024 abcdss. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
