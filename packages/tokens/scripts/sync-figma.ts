import { readTokens, writeTokens } from "./utils.js";
import { syncColorTokens } from "./sync-colors.js";
import { syncRadiusTokens } from "./sync-radius.js";
import { syncShadowTokens } from "./sync-shadow.js";
import { syncSpacingTokens } from "./sync-spacing.js";

// ============================================================================
// Main Execution
// ============================================================================

function main(): void {
  try {
    console.log("Reading tokens.json...");
    const tokens = readTokens();

    console.log("\nSyncing color tokens...");
    let updatedTokens = syncColorTokens(tokens);

    console.log("\nSyncing radius tokens...");
    updatedTokens = syncRadiusTokens(updatedTokens);

    console.log("\nSyncing shadow tokens...");
    updatedTokens = syncShadowTokens(updatedTokens);

    console.log("\nSyncing spacing tokens...");
    updatedTokens = syncSpacingTokens(updatedTokens);

    console.log("\nWriting updated tokens to tokens.json...");
    writeTokens(updatedTokens);

    console.log("\n✅ Successfully synced all tokens to tokens.json");
  } catch (error) {
    console.error("❌ Error syncing tokens:", error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

main();

