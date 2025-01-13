import { LuSearch } from "react-icons/lu";
import { InputGroup } from "../ui/input-group";
import { Input } from "@chakra-ui/react/input";
import { useEffect, useState } from "react";
import useDebounce from "@/utils/useDebounce";

interface SearchBoxProps {
  setSearch: (value: string) => void;
  setLoading: (value: boolean) => void;
}

const SearchBox = ({ setSearch, setLoading }: SearchBoxProps) => {
  const [searchToken, setSearchToken] = useState<string | null>(null);
  const debouncedSearchToken = useDebounce(searchToken, 500);

  useEffect(() => {
    setSearch(debouncedSearchToken || "");
  }, [debouncedSearchToken]);

  return (
    <InputGroup flex="1" startElement={<LuSearch />}>
      <Input
        placeholder="Search contacts"
        value={searchToken || ""}
        onChange={(e) => {
          setLoading(true);
          setSearchToken(e.currentTarget.value)
        }
        }
      />
    </InputGroup>
  );
};

export default SearchBox;
