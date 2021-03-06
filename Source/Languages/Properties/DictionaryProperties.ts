namespace GLS.Languages.Properties {
    "use strict";

    /**
     * Metadata on a language's dictionaries.
     */
    export class DictionaryProperties {
        /**
         * The name of the dictionary class.
         */
        public className: string;

        /**
         * Whether dictionaries are initialized as class instances using "new".
         */
        public initializeAsNew: boolean;

        /**
         * How to end initializing a new dictionary's values.
         */
        public initializeEnd: string;

        /**
         * How to start initializing a new dictionary's values.
         */
        public initializeStart: string;

        /**
         * How to start an in-place pair initialization.
         */
        public initializePairLeft: string;

        /**
         * Characters in the middle of an in-place pair initialization.
         */
        public initializePairMiddle: string;

        /**
         * How to end an in-place pair initialization.
         */
        public initializePairRight: string;

        /**
         * The name of the function to check if a key exists.
         */
        public keyChecker: string;
    }
}
