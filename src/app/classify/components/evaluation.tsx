"use client";

import { useState } from "react";

type Template = {
  [section: string]: {
    [subcategory: string]: { rating: number; description: string }[];
  };
};

type Prescription = {
  [section: string]: {
    [subcategory: string]: number | string;
    description: string;
  }[];
};

interface CourseEvaluationProps {
  template: Template;
  prescription: Prescription;
}

export default function CourseEvaluation({
  template,
  prescription,
}: CourseEvaluationProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="p-10">
      {Object.entries(template).map(([sectionKey, sectionValue]) => {
        // Only render section if there's at least one matching prescription entry
        const sectionPrescriptions = prescription[sectionKey];
        if (!sectionPrescriptions) return null;

        const isOpen = openSections[sectionKey] ?? false; // default open

        return (
          <div key={sectionKey} className="mt-12 ">
            <button
              onClick={() => toggleSection(sectionKey)}
              className="mb-5 flex items-center gap-2 text-4xl capitalize tracking-tighter w-full text-left"
            >
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#1d4ed8"
                >
                  <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#1d4ed8"
                >
                  <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
                </svg>
              )}
              {sectionKey}
            </button>

            {/* Collapsible Content */}
            {isOpen && (
              <div className="ml-8 ">
                {Object.entries(sectionValue).map(([subKey, subValue]) => {
                  // Try to find a prescription entry for this subKey
                  const prescriptionItem = sectionPrescriptions.find(
                    (item) => typeof item[subKey] === "number"
                  );

                  if (!prescriptionItem) return null;

                  const rating = prescriptionItem[subKey] as number | undefined;
                  const matchedDescription = (subValue as any[]).find(
                    (d) => d.rating === rating
                  )?.description;

                  const totalRatings = (subValue as any[]).length;

                  return (
                    <div
                      key={subKey}
                      className=" border-blue-300  pl-7 pr-7 pt-4 pb-4 bg-gray-100"
                    >
                      <h2 className="text-2xl capitalize tracking-tighter mb-1">
                        {subKey}
                      </h2>

                      {/* Rating Bar */}
                      {rating !== undefined && (
                        <div className="flex gap-1">
                          {Array.from({ length: totalRatings - 1 }).map(
                            (_, idx) => (
                              <div
                                key={idx}
                                className={`h-4 flex-1 ${
                                  idx < rating
                                    ? "bg-blue-700"
                                    : "border-blue-700 border"
                                }`}
                              />
                            )
                          )}
                        </div>
                      )}

                      {matchedDescription && (
                        <h3 className="tracking-tighter font-semibold block mt-3 text-lg">
                          {matchedDescription}
                        </h3>
                      )}
                      {prescriptionItem?.description && (
                        <p className="tracking-tighter leading-[1] text-gray-500">
                          {prescriptionItem.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
