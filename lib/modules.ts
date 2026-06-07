import modules from "@/data/modules.json";
import type { ModuleRecord } from "@/components/module-card";

export const allModules = modules as ModuleRecord[];

export function moduleHref(module: Pick<ModuleRecord, "id">) {
  return `/modules/${module.id}`;
}

export function findModule(id: string) {
  return allModules.find((module) => module.id === id);
}

export function adjacentModules(module: ModuleRecord) {
  const index = allModules.findIndex((entry) => entry.id === module.id);
  return {
    previous: index > 0 ? allModules[index - 1] : undefined,
    next: index >= 0 && index < allModules.length - 1 ? allModules[index + 1] : undefined
  };
}

export function resolveDependencies(module: ModuleRecord) {
  return module.dependencies.map((dependencyId) => ({
    id: dependencyId,
    module: findModule(dependencyId)
  }));
}
