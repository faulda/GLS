/// <reference path="../Languages/Language.ts" />
/// <reference path="Command.ts" />
/// <reference path="LineResults.ts" />
/// <reference path="Parameters/Parameter.ts" />
/// <reference path="Parameters/SingleParameter.ts" />
/// <reference path="Parameters/RepeatingParameters.ts" />

namespace GLS.Commands {
    "use strict";

    /**
     * A command for declaring a variable.
     */
    export class VariableCommand extends Command {
        /**
         * Information on parameters this command takes in.
         */
        private static parameters: Parameters.Parameter[] = [
            new Parameters.SingleParameter("name", "The name of the variable.", true),
            new Parameters.SingleParameter("type", "The type of the variable.", true),
            new Parameters.SingleParameter("value", "The starting value of the variable.", true)
        ];

        /**
         * @returns Information on parameters this command takes in.
         */
        public getParameters(): Parameters.Parameter[] {
            return VariableCommand.parameters;
        }

        /**
         * Renders the command for a language with the given parameters.
         * 
         * @param parameters   The command's name, followed by any parameters.
         * @returns Line(s) of code in the language.
         * @remarks Usage: (name, type[, value]).
         */
        public render(parameters: string[]): LineResults {
            this.requireParametersLengthRange(parameters, 2, 3);

            if (parameters.length === 3 && !this.language.properties.variables.declarationRequired) {
                return LineResults.newSingleLine("\0", false);
            }

            let starter: string = this.language.properties.variables.declaration;
            let newParameters: string[] = parameters.slice();
            newParameters[0] = "variable inline";

            let ender: string = this.context.convertParsed(newParameters).commandResults[0].text;

            return LineResults.newSingleLine(starter + ender, true);
        }
    }
}
