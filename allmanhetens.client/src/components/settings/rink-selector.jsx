import React, { useState, useEffect, useRef } from "react";
import { MapPin, Search, ExternalLink } from 'lucide-react';
import { Heading, Text, VStack, Card, InputGroup, Input, Checkbox, Image, Link } from "@chakra-ui/react";
export default function RinkManager() {
  const [allRinks, setAllRinks] = useState([]);
  const [selectedRinks, setSelectedRinks] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
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
        const data = await res.json();
        data.sort((a, b) => a.name.localeCompare(b.name)); // alphabetical sort
        setAllRinks(data);
      } catch (err) {
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
    <Card.Root width="100%">
      <Card.Header>
        <Heading>Select Rinks</Heading>
      </Card.Header>
      <Card.Body>
        {/* Filter input */}
        <InputGroup startElement={<Search />} marginBottom="8px">
          <Input placeholder="Search rinks..." value={filterText} onChange={(e) => setFilterText(e.target.value)} ref={filterInputRef} />
        </InputGroup>
        {filteredRinks.length === 0 ? (
          <div className="text-gray-500">No rinks match your search.</div>
        ) : (
          <VStack>
            {filteredRinks.map((rink) => (
              <Card.Root width="100%" key={rink.id} flexDirection="row" overflow="hidden">
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

  return (
    <Card.Root width="100%">
      <Card.Header>
        <Heading>Select Rinks</Heading>
      </Card.Header>
      <Card.Body>
        <Card.Description>
          {/* Filter input */}
          <InputGroup startElement={<Search />} marginBottom="8px">
            <Input placeholder="Search rinks..." value={filterText} onChange={(e) => setFilterText(e.target.value)} ref={filterInputRef} />
          </InputGroup>

          {filteredRinks.length === 0 ? (
            <p className="text-gray-500">No rinks match your search.</p>
          ) : (
            <VStack>
              {filteredRinks.map((rink) => (
                <Card.Root key={rink.id} size="sm" width="100%">
                  <Card.Header>
                    <Heading>
                      {rink.name}
                    </Heading>
                  </Card.Header>
                  <Card.Body>
                    <Card.Description>
                      <Text>{rink.address}</Text>
                      <input
                        type="checkbox"
                        checked={selectedIds.has(rink.id)}
                        onChange={() => toggleRinkSelection(rink)}
                        className="mr-3"
                      />
                    </Card.Description>
                  </Card.Body>
                </Card.Root>
              ))}
            </VStack>
          )}
        </Card.Description>
      </Card.Body>
    </Card.Root>
  );


}
