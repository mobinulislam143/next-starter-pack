"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ChevronDown, Menu } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { navigationData } from "@/types/fakeWebData"

// Navigation data structure

// Animation variants
const navbarVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
}

const menuItemVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
}

const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: -10,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: { duration: 0.15, ease: "easeIn" },
  },
}

const dropdownItemVariants = {
  hidden: { x: -10, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
}

const mobileMenuVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
}

const collapsibleVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: "auto",
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      staggerChildren: 0.05,
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  },
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({})
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const navbarRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = (title: string) => {
    setOpenDropdowns((prev) => {
      // Close all other dropdowns and toggle the current one
      const newState: { [key: string]: boolean } = {}
      Object.keys(prev).forEach((key) => {
        newState[key] = key === title ? !prev[key] : false
      })
      newState[title] = !prev[title]
      return newState
    })
  }

  const closeAllDropdowns = () => {
    setOpenDropdowns({})
  }

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node

      // Check if click is outside navbar
      if (navbarRef.current && !navbarRef.current.contains(target)) {
        closeAllDropdowns()
        return
      }

      // Check if click is outside any open dropdown
      let clickedInsideDropdown = false
      Object.keys(openDropdowns).forEach((key) => {
        if (openDropdowns[key] && dropdownRefs.current[key]) {
          if (dropdownRefs.current[key]?.contains(target)) {
            clickedInsideDropdown = true
          }
        }
      })

      // If clicked outside all dropdowns, close them
      if (!clickedInsideDropdown) {
        const hasOpenDropdowns = Object.values(openDropdowns).some(Boolean)
        if (hasOpenDropdowns) {
          closeAllDropdowns()
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [openDropdowns])

  // Close dropdowns when pressing Escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeAllDropdowns()
      }
    }

    document.addEventListener("keydown", handleEscapeKey)
    return () => {
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [])

  return (
    <motion.nav
      ref={navbarRef}
      className="bg-white border-b border-gray-200 sticky top-0 z-50"
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div className="flex-shrink-0" variants={menuItemVariants}>
            <Link href="/" className="text-xl font-bold text-gray-900" onClick={closeAllDropdowns}>
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {navigationData.logo}
              </motion.span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <motion.div className="ml-10 flex items-baseline space-x-8" variants={menuItemVariants}>
              {navigationData.menuItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  variants={menuItemVariants}
                  custom={index}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  ref={(el:any) => {
                    if (item.hasDropdown) {
                      dropdownRefs.current[item.title] = el
                    }
                  }}
                >
                  {item.hasDropdown ? (
                    <div className="relative">
                      <motion.button
                        className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium flex items-center gap-1 transition-colors duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => toggleDropdown(item.title)}
                      >
                        {item.title}
                        <motion.div
                          animate={{ rotate: openDropdowns[item.title] ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </motion.div>
                      </motion.button>

                      <AnimatePresence>
                        {openDropdowns[item.title] && (
                          <motion.div
                            className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-50"
                            variants={dropdownVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                          >
                            <div className="py-1">
                              {item.subItems?.map((subItem) => (
                                <motion.div key={subItem.title} variants={dropdownItemVariants}>
                                  <Link
                                    href={subItem.href}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
                                    onClick={closeAllDropdowns}
                                  >
                                    <motion.span
                                      whileHover={{ x: 4 }}
                                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    >
                                      {subItem.title}
                                    </motion.span>
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
                      onClick={closeAllDropdowns}
                    >
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        {item.title}
                      </motion.span>
                    </Link>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Login Button */}
          <motion.div className="hidden md:block" variants={menuItemVariants}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 transition-colors duration-200"
                onClick={closeAllDropdowns}
              >
                Log In
              </Button>
            </motion.div>
          </motion.div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button variant="ghost" size="icon" onClick={closeAllDropdowns}>
                    <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                      <Menu className="h-6 w-6" />
                    </motion.div>
                    <span className="sr-only">Open menu</span>
                  </Button>
                </motion.div>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle className="text-left">{navigationData.logo}</SheetTitle>
                </SheetHeader>
                <motion.div className="mt-6 space-y-2" variants={mobileMenuVariants} initial="hidden" animate="visible">
                  {navigationData.menuItems.map((item, index) => (
                    <motion.div key={item.title} variants={menuItemVariants} custom={index}>
                      {item.hasDropdown ? (
                        <Collapsible open={openDropdowns[item.title]} onOpenChange={() => toggleDropdown(item.title)}>
                          <CollapsibleTrigger asChild>
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                              <Button variant="ghost" className="w-full justify-between text-left font-normal">
                                {item.title}
                                <motion.div
                                  animate={{ rotate: openDropdowns[item.title] ? 180 : 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <ChevronDown className="h-4 w-4" />
                                </motion.div>
                              </Button>
                            </motion.div>
                          </CollapsibleTrigger>
                          <AnimatePresence>
                            {openDropdowns[item.title] && (
                              <CollapsibleContent forceMount>
                                <motion.div
                                  className="space-y-1 ml-4 overflow-hidden"
                                  variants={collapsibleVariants}
                                  initial="hidden"
                                  animate="visible"
                                  exit="exit"
                                >
                                  {item.subItems?.map((subItem, subIndex) => (
                                    <motion.div key={subItem.title} variants={dropdownItemVariants} custom={subIndex}>
                                      <Link
                                        href={subItem.href}
                                        className="block py-2 px-4 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-150"
                                        onClick={() => {
                                          setIsOpen(false)
                                          closeAllDropdowns()
                                        }}
                                      >
                                        <motion.span
                                          whileHover={{ x: 4 }}
                                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                        >
                                          {subItem.title}
                                        </motion.span>
                                      </Link>
                                    </motion.div>
                                  ))}
                                </motion.div>
                              </CollapsibleContent>
                            )}
                          </AnimatePresence>
                        </Collapsible>
                      ) : (
                        <Link
                          href={item.href}
                          className="block py-2 px-4 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-150"
                          onClick={() => {
                            setIsOpen(false)
                            closeAllDropdowns()
                          }}
                        >
                          <motion.span
                            whileHover={{ scale: 1.02, x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                          >
                            {item.title}
                          </motion.span>
                        </Link>
                      )}
                    </motion.div>
                  ))}
                  <motion.div className="pt-4 border-t border-gray-200" variants={menuItemVariants}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200"
                        onClick={() => {
                          setIsOpen(false)
                          closeAllDropdowns()
                        }}
                      >
                        Log In
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
