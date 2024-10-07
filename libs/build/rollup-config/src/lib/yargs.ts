/*
 * Copyright © 2024. Anti-Matter Studios.
 */

import yargs from "yargs";


/** List of arguments accepted by the "athena-build" command. */
export const AthenaYargsParser = yargs(process.argv, process.cwd())
    .scriptName("athena-build")
    .string("config")
    .boolean("watch")
    .default("watch", false)
    .help();

// Wrap the text to the terminal width.
AthenaYargsParser.wrap(AthenaYargsParser.terminalWidth());

// Parse the arguments.
const AthenaBuildArguments = AthenaYargsParser.parseAsync();
export default AthenaBuildArguments;
