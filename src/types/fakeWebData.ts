export const navigationData = {
  logo: "LOGO",
  menuItems: [
    {
      title: "Home",
      href: "/",
      hasDropdown: false,
    },
    {
      title: "Car",
      href: "/car",
      hasDropdown: true,
      subItems: [
        { title: "Temporary Car Insurance", href: "/car/temporary" },
        { title: "One day Car Insurance", href: "/car/one-day" },
        { title: "Monthly Car Insurance", href: "/car/monthly" },
        { title: "Weekly Car Insurance", href: "/car/weekly" },
        { title: "Hourly Car Insurance", href: "/car/hourly" },
        { title: "Impound Car Insurance", href: "/car/impound" },
      ],
    },
    {
      title: "Van",
      href: "/van",
      hasDropdown: true,
      subItems: [
        { title: "Temporary Van Insurance", href: "/van/temporary" },
        { title: "One day Van Insurance", href: "/van/one-day" },
        { title: "Monthly Van Insurance", href: "/van/monthly" },
        { title: "Weekly Van Insurance", href: "/van/weekly" },
        { title: "Hourly Van Insurance", href: "/van/hourly" },
        { title: "Impound Van Insurance", href: "/van/impound" },
      ],
    },
    {
      title: "More Insurance",
      href: "/more-insurance",
      hasDropdown: true,
      subItems: [
        { title: "Home Insurance", href: "/more-insurance/home" },
        { title: "Travel Insurance", href: "/more-insurance/travel" },
        { title: "Life Insurance", href: "/more-insurance/life" },
        { title: "Health Insurance", href: "/more-insurance/health" },
        { title: "Business Insurance", href: "/more-insurance/business" },
      ],
    },
    {
      title: "About Us",
      href: "/about",
      hasDropdown: false,
    },
    {
      title: "Contact Us",
      href: "/contact",
      hasDropdown: false,
    },
  ],
}
