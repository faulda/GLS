/// <reference path="../Languages/Language.ts" />
/// <reference path="Command.ts" />
/// <reference path="LineResults.ts" />
/// <reference path="Parameters/Parameter.ts" />
/// <reference path="Parameters/SingleParameter.ts" />
/// <reference path="Parameters/RepeatingParameters.ts" />

namespace GLS.Commands {
    "use strict";

    /**
     * A command for printing a comment block line.
     */
    export class CommentBlockCommand extends Command {
        /**
         * Information on parameters this command takes in.
         */
        private static parameters: Parameters.Parameter[] = [
            new Parameters.RepeatingParameters(
                "Contents of the comment block line",
                [
                    new Parameters.SingleParameter("word", "A word in the line.", false)
                ])
        ];

        /**
         * @returns Information on parameters this command takes in.
         */
        public getParameters(): Parameters.Parameter[] {
            return CommentBlockCommand.parameters;
        }

        /**
         * Renders the command for a language with the given parameters.
         * 
         * @param parameters   The command's name, followed by any parameters.
         * @returns Line(s) of code in the language.
         * @remarks Usage: (contents, ...).
         */
        public render(parameters: string[]): LineResults {
            let output: string = "";

            output += this.language.properties.comments.blockLineLeft;
            output += parameters.slice(1).join(" ");
            output += this.language.properties.comments.blockLineRight;

            return LineResults.newSingleLine(output, false);
        }
    }
}
