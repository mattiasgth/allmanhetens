import React, { useState, useEffect, useRef } from "react";
import { MapPin, Search, ExternalLink } from 'lucide-react';
import { Heading, Text, VStack, Card, InputGroup, Input, Checkbox, Image, Link } from "@chakra-ui/react";
import { RinkResponse } from "../../model/rink-response";

export interface RinkSelectorProps {
  setError: any;
};
export default function RinkSelector({ setError }: RinkSelectorProps) {
  const [allRinks, setAllRinks] = useState<RinkResponse[]>([]);
  const [selectedRinks, setSelectedRinks] = useState<RinkResponse[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [filterText, setFilterText] = useState("");
  const filterInputRef = useRef(null);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("selectedRinks");
    if (saved) {
      const parsed = JSON.parse(saved);
      setSelectedRinks(parsed);
      setSelectedIds(new Set(parsed.map((r) => r.id)));
    }
  }, []);

  // Fetch rinks
  useEffect(() => {
    async function fetchRinks() {
      try {
        const res = await fetch("/api/rinks");
        if (!res.ok) throw res.status;
        const data = await res.json() as RinkResponse[];
        data.sort((a, b) => a.name.localeCompare(b.name)); // alphabetical sort
        setAllRinks(data);
      } catch (err) {
        setError(`Failed to load list of rinks: ${err}.`);
        console.error("Error fetching rinks:", err);
      }
    }
    fetchRinks();
  }, []);

  const toggleRinkSelection = (rink) => {
    setSelectedIds((prev) => {
      const updated = new Set(prev);

      let updatedRinks;
      if (updated.has(rink.id)) {
        updated.delete(rink.id);
        updatedRinks = selectedRinks.filter((r) => r.id !== rink.id);
      } else {
        updated.add(rink.id);
        updatedRinks = [...selectedRinks, rink];
      }

      setSelectedRinks(updatedRinks);
      localStorage.setItem("selectedRinks", JSON.stringify(updatedRinks));

      return updated;
    });
  };

  // Full-text filter: match against name + address
  const filteredRinks = allRinks.filter((rink) =>
    `${rink.name} ${rink.address}`.toLowerCase().includes(filterText.toLowerCase())
  );


  return (
    <Card.Root width="100%" bg="gray.subtle">
      <Card.Header>
        <Heading>Select Rinks</Heading>
      </Card.Header>
      <Card.Body>
        {/* Filter input */}
        <InputGroup startElement={<Search />} marginBottom="8px">
          <Input placeholder="Search rinks..." value={filterText} onChange={(e) => setFilterText(e.target.value)} ref={filterInputRef} />
        </InputGroup>
        {filteredRinks.length === 0 ? (
          <Text>No rinks match your search.</Text>
        ) : (
          <VStack>
            {filteredRinks.map((rink) => (
              <Card.Root width="100%" key={rink.id} flexDirection="row" overflow="hidden" bg="blue.subtle">
                <Card.Body>
                  <Heading>
                    <Checkbox.Root checked={selectedIds.has(rink.id)}
                      onChange={() => toggleRinkSelection(rink)}>
                      <Checkbox.HiddenInput />
                      <Checkbox.Control />
                      <Checkbox.Label>{rink.name}</Checkbox.Label>
                    </Checkbox.Root>
                  </Heading>
                  <Card.Description>
                    <Link href={`https://www.bing.com/maps/?v=2&cp=${rink.latitude}%7E${rink.longitude}&lvl=18.0&sty=c`}>
                      <MapPin /> {rink.address} <ExternalLink />
                    </Link>
                  </Card.Description>
                </Card.Body>
                <Image
                  objectFit="cover"
                  height="120px"
                  width="180px"
                  src={rink.imageUrl}
                />
              </Card.Root>
            ))}
          </VStack>
        )}
      </Card.Body>
    </Card.Root>
  );
}
