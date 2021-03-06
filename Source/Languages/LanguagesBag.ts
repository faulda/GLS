/// <reference path="CSharp.ts" />
/// <reference path="Language.ts" />
/// <reference path="Python.ts" />
/// <reference path="Ruby.ts" />
/// <reference path="TypeScript.ts" />

namespace GLS.Languages {
    "use strict";

    /**
     * A quick lookup of standard languages.
     */
    export class LanguagesBag {
        /**
         * An instance of the CSharp class.
         */
        public CSharp: CSharp = new CSharp();

        /**
         * An instance of the CSharp class.
         */
        public Python: Python = new Python();

        /**
         * An instance of the Ruby class.
         */
        public Ruby: Ruby = new Ruby();

        /**
         * An instance of the TypeScript class.
         */
        public TypeScript: TypeScript = new TypeScript();

        /**
         * Known languages, keyed by name.
         */
        private languagesByName: { [i: string]: Language } = {
            "CSharp": this.CSharp,
            "Python": this.Python,
            "Ruby": this.Ruby,
            "TypeScript": this.TypeScript
        };

        /**
         * Adds a language to the listing.
         * 
         * @param name   The name of the language.
         * @param language   The language to add.
         */
        public addLanguage(name: string, language: Language): void {
            this.languagesByName[name] = language;
        }

        /**
         * @param name   A name of a language.
         * @returns The language under that name.
         */
        public getLanguage(name: string): Language {
            if (!this.languagesByName.hasOwnProperty(name)) {
                throw new Error(`Unknown language name: '${name}'.'`);
            }

            return this.languagesByName[name];
        }
    }
}
