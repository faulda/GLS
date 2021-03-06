namespace GLS.Languages.Properties {
    "use strict";

    /**
     * Metadata on a language's lists.
     */
    export class ListProperties {
        /**
         * Whether the language uses flexible arrays.
         */
        public asArray: boolean;

        /**
         * The name of the list class.
         */
        public className: string;

        /**
         * How to retrieve the length of a list.
         */
        public length: NativeCallProperties;

        /**
         * How to add an element to the end of a list.
         */
        public push: NativeCallProperties;
    }
}
