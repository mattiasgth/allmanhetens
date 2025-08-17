import React, { useState, useEffect, useRef } from "react";
import { Search } from 'lucide-react';
import { Heading, Button, Stack, Card } from "@chakra-ui/react";
export default function RinkManager() {
  const [allRinks, setAllRinks] = useState([]);
  const [selectedRinks, setSelectedRinks] = useState([]);
  const [currentScreen, setCurrentScreen] = useState("main"); // "main" or "select"
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
        const res = await fetch("/api/rinks"); // replace with your endpoint
        const data = await res.json();
        data.sort((a, b) => a.name.localeCompare(b.name)); // alphabetical sort
        setAllRinks(data);
      } catch (err) {
        console.error("Error fetching rinks:", err);
      }
    }
    fetchRinks();
  }, []);

  // Focus filter input when entering selection screen
  useEffect(() => {
    if (currentScreen === "select" && filterInputRef.current) {
      filterInputRef.current.focus();
    }
  }, [currentScreen]);

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

  if (currentScreen === "select") {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
        <h1 className="text-xl font-bold mb-4 text-gray-800">Select Rinks</h1>

        {/* Filter input */}
        <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search rinks..."
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          ref={filterInputRef}
            className="w-full pl-10 pr-4 py-3 text-lg border-2 border-gray-200 rounded-xl bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:border-blue-400 focus:outline-none transition-colors"
          />
        </div>

        {filteredRinks.length === 0 ? (
          <p className="text-gray-500">No rinks match your search.</p>
        ) : (
          <Stack>
            {filteredRinks.map((rink) => (
              <Card.Root key={rink.id} size="sm">
                <Card.Header>
                  <Heading>
                    {rink.name}
                  </Heading>
                </Card.Header>
                <Card.Body>
                  <p className="text-sm text-gray-500">{rink.address}</p>
                  <input
                    type="checkbox"
                    checked={selectedIds.has(rink.id)}
                    onChange={() => toggleRinkSelection(rink)}
                    className="mr-3"
                  />
                </Card.Body>
              </Card.Root>
            ))}
          </Stack>
        )}

        <div className="mt-4">
          <Button onClick={() => setCurrentScreen("main")}>
            Back
          </Button>
        </div>
      </div>
    );
  }

  // Main screen
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-xl font-bold mb-4 text-gray-800">Selected Rinks</h1>
      {selectedRinks.length === 0 ? (
        <p className="text-gray-500 mb-4">No rinks selected yet.</p>
      ) : (
        <ul className="divide-y divide-gray-200 mb-4">
          {selectedRinks.map((rink) => (
            <li key={rink.id} className="p-3">
              <p className="font-medium text-gray-900">{rink.name}</p>
              <p className="text-sm text-gray-500">{rink.address}</p>
            </li>
          ))}
        </ul>
      )}

      <Button variant="surface" onClick={() => setCurrentScreen("select")}>Välj ishallar</Button>
    </div>
  );
}
