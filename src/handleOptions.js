import core from "@actions/core";
import inputs from "./inputs.js";

/**
 * Handle Branches Option
 * @returns {{}|{branch: string}}
 */
export const handleBranchesOption = () => {
  const branchesOption = {};
  const branches = core.getInput(inputs.branches);
  const branch = core.getInput(inputs.branch);

  core.debug(`branches input: ${branches}`);
  core.debug(`branch input: ${branch}`);

  // semantic-version > 16 compat
  const strNeedConvertToJson = branches || branch || "";

  if (!strNeedConvertToJson) {
    return branchesOption;
  }

  // use eval instead of JSON.parse to allow single quotes
  const jsonOrStr = eval("" + strNeedConvertToJson);
  core.debug(`Converted branches attribute: ${JSON.stringify(jsonOrStr)}`);
  branchesOption.branches = jsonOrStr;
  return branchesOption;
};

/**
 * Handle DryRun Option
 */
export const handleDryRunOption = () => {
  const dryRun = core.getInput(inputs.dry_run);

  switch (dryRun) {
    case "true":
      // skip CI check in dry run mode
      return { dryRun: true, noCi: true };

    case "false":
    default:
      return { dryRun: false };
  }
};

/**
 * Handle Extends Option
 * @returns {{}|{extends: Array}|{extends: String}}
 */
export const handleExtends = () => {
  const extend = core.getInput(inputs.extends);

  if (extend) {
    return { extends: extend };
  } else {
    return {};
  }
};
