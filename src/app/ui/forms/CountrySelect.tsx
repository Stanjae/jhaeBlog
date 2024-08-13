import React from "react";
import { useCountries } from "use-react-countries";
import { Select, Option } from "@material-tailwind/react";
import Image from "next/image";

export function CountrySelect({country, setCountry}:any) {
  const { countries } = useCountries();

  return (
    <div className="w-full">
      <Select
        size="md"
        name="country"
        value={country}
        onChange={(val) => setCountry(val)}
        selected={(element) =>
          element &&
          React.cloneElement(element, {
            disabled: true,
            className: "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
          })
        }
      >
        {countries.map(({ name, flags }:any) => (
          <Option key={name} value={name} className="flex items-center gap-2">
            <Image
              src={flags.svg}
              width={50}
              height={50}
              alt={name}
              className="h-5 w-5 rounded-full object-cover"
            />
            {name}
          </Option>
        ))}
      </Select>
    </div>
  );
}
