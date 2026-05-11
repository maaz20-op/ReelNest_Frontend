export const Upgrade = () => {
  const packages = [
    {
      name: "Starter",
      price: "$5/mo",
      features: [
        "HD Video Uploads",
        "Basic Profile Badge",
        "5 GB Cloud Storage",
        "Priority Support",
      ],
    },
    {
      name: "Pro",
      price: "$15/mo",
      features: [
        "Unlimited Uploads",
        "Verified Badge",
        "50 GB Cloud Storage",
        "Ad-Free Experience",
      ],
    },
    {
      name: "Creator",
      price: "$25/mo",
      features: [
        "Premium Analytics",
        "Monetization Features",
        "Custom Themes",
        "Faster Video Processing",
      ],
    },
    {
      name: "Enterprise",
      price: "$50/mo",
      features: [
        "Team Collaboration",
        "Unlimited Storage",
        "24/7 Premium Support",
        "Advanced Security",
      ],
    },
  ];

  return (
    <div className="w-full h-full overflow-y-auto bg-(--bg-primary)">
      {/* Heading */}
      <div className="w-full px-4 py-6 sm:px-6 lg:px-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-(--text-primary)">
          Upgrade
        </h1>

        <p className="text-(--text-secondary) mt-2 text-sm sm:text-base">
          Choose the perfect package for your experience.
        </p>
      </div>

      {/* Cards */}
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-5
          px-4
          sm:px-6
          lg:px-10
          pb-10
        "
      >
        {packages.map((pkg, indx) => (
          <div
            key={indx}
            className="
              rounded-3xl
              border
              border-(--border-color)
              bg-(--bg-secondary)
              p-5
              flex
              flex-col
              justify-between
              hover:scale-[1.02]
              transition-all
              duration-300
            "
          >
            {/* Top */}
            <div>
              <h2 className="text-2xl font-semibold text-(--text-primary)">
                {pkg.name}
              </h2>

              <h3 className="text-3xl font-bold mt-3 text-blue-500">
                {pkg.price}
              </h3>

              {/* Features */}
              <ul className="mt-5 flex flex-col gap-3">
                {pkg.features.map((feature, i) => (
                  <li
                    key={i}
                    className="
                      text-sm
                      sm:text-base
                      text-(--text-secondary)
                      flex
                      items-center
                      gap-2
                    "
                  >
                    <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Button */}
            <button
              className="
                mt-8
                w-full
                rounded-full
                bg-blue-600
                hover:bg-blue-700
                text-white
                py-3
                text-sm
                sm:text-base
                font-medium
                transition-colors
              "
            >
              Upgrade Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
