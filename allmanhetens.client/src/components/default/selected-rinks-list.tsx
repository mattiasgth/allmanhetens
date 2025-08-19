import { VStack } from "@chakra-ui/react";
import RinkCardOld from "./rink-card-old";

import { useState } from "react";
import { RinkSkatingSessions } from "../../model/rink-skating-sessions";

export interface SelectedRinksListProps {
  loading: boolean;
  error: string | null;
  setLoading: any;
  setError: any;
  selectedRinks: RinkSkatingSessions[];
}
function SelectedRinksList({ loading, error, setLoading, setError, selectedRinks }: SelectedRinksListProps) {

  return (
    loading ? (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 animate-pulse">
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 bg-gray-200 dark:bg-gray-600 rounded"></div>
              <div className="flex-1 space-y-3">
                <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
                <div className="h-16 bg-gray-200 dark:bg-gray-600 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : error ? (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
        <div className="text-center space-y-3">
          <div className="text-3xl">⚠️</div>
          <p className="text-red-700 dark:text-red-300 font-medium">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    ) : (
      <VStack width={"100%"}>
        {selectedRinks.map((rink, index) => (
          <RinkCardOld rink={rink} index={index} selectedRinks={selectedRinks} key={index}></RinkCardOld>
        ))}
      </VStack>
    )
  );
}

export default SelectedRinksList;