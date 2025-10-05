import { useState } from "react";
import { SearchBar } from "../search-bar";

export default function SearchBarExample() {
  const [value, setValue] = useState("");

  return (
    <div className="p-6 max-w-md">
      <SearchBar
        placeholder="Search products..."
        value={value}
        onChange={setValue}
        testId="input-search"
      />
      {value && (
        <div className="mt-4 text-sm text-muted-foreground">
          Searching for: <span className="font-medium">{value}</span>
        </div>
      )}
    </div>
  );
}
