/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import Finland from "@/assets/finland.png";
import Sweden from "@/assets/sweden.png";
import UK from "@/assets/uk.png";
import Image from "next/image";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

function GoogleTranslateProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const addGoogleTranslateScript = () => {
      if (!document.querySelector("#google-translate-script")) {
        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src =
          "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
      }

      window.googleTranslateElementInit = () => {
        if (window.google && !isInitialized) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "en,fi,se",
              layout:
                window.google.translate.TranslateElement.InlineLayout
                  .HORIZONTAL,
            },
            "google_translate_element"
          );
          setIsInitialized(true);
        }
      };
    };

    addGoogleTranslateScript();
  }, [isInitialized]);

  return (
    <>
      <div id="google_translate_element" className="hidden"></div>
      {children}
    </>
  );
}

export default GoogleTranslateProvider;

export function LanguageSwitcher() {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  useEffect(() => {
    // Fetch stored language from localStorage and set default language if not available
    const storedLang = localStorage.getItem("selectedLanguage");
    if (storedLang) {
      setSelectedLanguage(storedLang);
    } else {
      setSelectedLanguage("en"); // Default to English if no language is stored
    }

    // Set the initial googtrans cookie based on stored or default language
    if (storedLang === "en" || !storedLang) {
      document.cookie =
        "googtrans=/en/en; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/";
    } else {
      document.cookie = `googtrans=/en/${storedLang}; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/`;
    }
  }, [selectedLanguage]);

  const handleChange = (newLang: string) => {
    if (!newLang) return;

    setSelectedLanguage(newLang);
    localStorage.setItem("selectedLanguage", newLang);

    if (newLang === "en") {
      document.cookie =
        "googtrans=/en/en; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/";
    } else {
      document.cookie = `googtrans=/en/${newLang}; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/`;
    }

    // Manually trigger the language change in Google Translate
    const select = document.querySelector(
      ".goog-te-combo"
    ) as HTMLSelectElement;
    if (select) {
      select.value = newLang;
      select.dispatchEvent(new Event("change"));
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Select onValueChange={handleChange} value={selectedLanguage}>
        <SelectTrigger className="w-auto !h-6 md:!h-auto rounded-full !border-none font-bold text-black/70 bg-white">
          <SelectValue>
            {{
              en: "English",
              fi: "Suomi",
              se: "Svenska",
            }[selectedLanguage] || "Select a language"}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="en">
            <Image
              src={UK}
              alt="UK"
              width={20}
              height={20}
              className="inline-block mr-2 w-6 h-6"
            />
            English
          </SelectItem>
          <SelectItem value="fi">
            <Image
              src={Finland}
              alt="Finland"
              width={20}
              height={20}
              className="inline-block mr-2 w-6 h-6"
            />
            Suomi
          </SelectItem>
          <SelectItem value="se">
            <Image
              src={Sweden}
              alt="Sweden"
              width={20}
              height={20}
              className="inline-block mr-2 w-6 h-6"
            />
            Svenska
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
