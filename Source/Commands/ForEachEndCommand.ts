/// <reference path="../Languages/Language.ts" />
/// <reference path="Command.ts" />
/// <reference path="LineResults.ts" />

namespace GLS.Commands {
    "use strict";

    /**
     * A command for the end of a foreach loop.
     */
    export class ForEachEndCommand extends Command {
        /**
         * Renders the command for a language with the given parameters.
         * 
         * @param parameters   The command's name, followed by any parameters.
         * @returns Line(s) of code in the language.
         * @remarks Usage: ().
         */
        public render(parameters: string[]): LineResults {
            this.requireParametersLength(parameters, 0);

            let ender: string = this.language.properties.loops.forEachEnd;

            return new LineResults([new CommandResult(ender, -1)], false);
        }
    }
}
