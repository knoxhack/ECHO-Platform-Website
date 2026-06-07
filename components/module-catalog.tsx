"use client";

import { useMemo, useState } from "react";
import { ModuleCard, type ModuleRecord } from "@/components/module-card";

const filters = ["All", "Core", "Interface", "Ashfall", "Platform", "Future"];

export function ModuleCatalog({ modules }: { modules: ModuleRecord[] }) {
  const [active, setActive] = useState("All");
  const filtered = useMemo(
    () => (active === "All" ? modules : modules.filter((module) => module.group === active)),
    [active, modules]
  );

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActive(filter)}
            className={`cyber-button min-h-10 px-3 py-2 text-xs ${
              active === filter ? "cyber-button-primary" : "cyber-button-secondary"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      ) : (
        <div className="cyber-panel rounded-[6px] p-8 text-center text-echo-muted">
          No modules are published in this category yet.
        </div>
      )}
    </div>
  );
}
