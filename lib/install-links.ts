export type AshfallPackId =
  | "ashfall-native-edition"
  | "ashfall-neoforge-edition"
  | "ashfall-standalone-edition";

export function addonInstallLink(addonId: string, pack: AshfallPackId = "ashfall-native-edition") {
  return `echo://install/addon/${encodeURIComponent(addonId)}?pack=${encodeURIComponent(pack)}`;
}

export function packUpdateLink(pack: string) {
  return `echo://update/pack/${encodeURIComponent(pack)}`;
}
