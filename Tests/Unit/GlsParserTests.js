var expect = require("chai").expect,
    mocks = require("../mocks.js"),
    GLS = require("../../Distribution/GLS.js");

(() => {
    "use strict";
    
    describe("GlsParser", () => {
        describe("parseCommand", () => {
            it("parses a single command", () => {
                let parser = mocks.mockGlsParser(),
                    language = mocks.mockLanguage(),
                    command = "literal",
                    parameters = "aaa bbb ccc",
                    lineResults = parser.parseCommand(`${command} : ${parameters}`),
                    lines = lineResults.commandResults,
                    result = lines[0];

                expect(lines.length).to.be.equal(1);
                expect(result.indentation).to.be.equal(0);
                expect(result.text).to.be.equal(parameters);
            });
        });
        
        describe("recurseOnCommand", () => {
            it("recurses on a single command", () => {
                let parser = mocks.mockGlsParser(),
                    language = mocks.mockLanguage(),
                    command = "literal",
                    parameters = "aaa bbb ccc",
                    line = `{ ${command} : ${parameters} }`,
                    results = parser.recurseOnCommand(line);

                expect(results).to.be.equal(parameters);
            });
        });
        
        describe("separateLineComponents", () => {
            it("returns a blank name from empty input", () => {
                expect(mocks.mockGlsParser().separateLineComponents("")).to.be.deep.equal([""]);
            });
            
            it("returns a name from a name", () => {
                expect(mocks.mockGlsParser().separateLineComponents("foo")).to.be.deep.equal(["foo"]);
            });
            
            it("returns a name with space after it", () => {
                expect(mocks.mockGlsParser().separateLineComponents("foo ")).to.be.deep.equal(["foo"]);
            });
            
            it("returns a name with one argument", () => {
                expect(mocks.mockGlsParser().separateLineComponents("foo : a")).to.be.deep.equal(["foo", "a"]);
            });
            
            it("returns a name with two arguments", () => {
                expect(mocks.mockGlsParser().separateLineComponents("foo : aa bb")).to.be.deep.equal(["foo", "aa", "bb"]);
            });
            
            it("returns a name with three arguments", () => {
                expect(mocks.mockGlsParser().separateLineComponents("foo : aaa bbb ccc")).to.be.deep.equal(["foo", "aaa", "bbb", "ccc"]);
            });
            
            it("returns a name with a single simple parenthesis escaped argument", () => {
                expect(mocks.mockGlsParser().separateLineComponents("foo : (aaa bbb)")).to.be.deep.equal(["foo", "aaa bbb"]);
            });
            
            it("returns a name with complicated parenthesis escaped arguments", () => {
                expect(mocks.mockGlsParser().separateLineComponents("foo : (aaa bbb ccc) ddd")).to.be.deep.equal(["foo", "aaa bbb ccc", "ddd"]);
            });
            
            it("returns a name with multiple complicated parenthesis escaped arguments", () => {
                expect(mocks.mockGlsParser().separateLineComponents("foo : (aaa bbb ccc) (ddd eee fff ggg) hhh")).to.be.deep.equal(["foo", "aaa bbb ccc", "ddd eee fff ggg", "hhh"]);
            });
            
            it("returns a name with a single simple brace escaped argument", () => {
                expect(mocks.mockGlsParser().separateLineComponents("foo : { aaa bbb }")).to.be.deep.equal(["foo", "{ aaa bbb }"]);
            });
            
            it("returns a name with complicated brace escaped arguments", () => {
                expect(mocks.mockGlsParser().separateLineComponents("foo : { aaa bbb ccc } ddd")).to.be.deep.equal(["foo", "{ aaa bbb ccc }", "ddd"]);
            });
            
            it("returns a name with multiple complicated brace escaped arguments", () => {
                expect(mocks.mockGlsParser().separateLineComponents("foo : { aaa bbb ccc } { ddd eee } fff")).to.be.deep.equal(["foo", "{ aaa bbb ccc }", "{ ddd eee }", "fff"]);
            });
        });
        
        describe("trimEndCharacters", () => {
            it("trims strings of length 0", () => {
                expect(mocks.mockGlsParser().trimEndCharacters("")).to.be.equal("");            
            });
            
            it("trims strings of length 1", () => {
                expect(mocks.mockGlsParser().trimEndCharacters("a")).to.be.equal("");
            });
            
            it("trims strings of length 2", () => {
                expect(mocks.mockGlsParser().trimEndCharacters("ab")).to.be.equal("");
            });
            
            it("trims large strings", () => {
                expect(mocks.mockGlsParser().trimEndCharacters("abcdefg")).to.be.equal("bcdef");
            });
        });
        
        describe("findSearchEnd", () => {
            it("returns -1 with no input", () => {
                expect(mocks.mockGlsParser().findSearchEnd("", 1, "{", "}")).to.be.equal(-1);
            })
            
            it("returns -1 with no enders", () => {
                expect(mocks.mockGlsParser().findSearchEnd(" { ", 1, "{", "}"));
            });
            
            it("returns -1 with not enough enders", () => {
                expect(mocks.mockGlsParser().findSearchEnd(" { { } ", 1, "{", "}"));
            });
            
            it("finds an end character directly after the start", () => {
                expect(mocks.mockGlsParser().findSearchEnd(" {}", 1, "{", "}")).to.be.equal(2);
            });
            
            it("finds an end character one space after the start", () => {
                expect(mocks.mockGlsParser().findSearchEnd(" { }", 1, "{", "}")).to.be.equal(3);
            });
            
            it("finds an end character many spaces after the start", () => {
                expect(mocks.mockGlsParser().findSearchEnd(" {    }", 1, "{", "}")).to.be.equal(6);
            });
            
            it("finds an end character after one nested starter", () => {
                expect(mocks.mockGlsParser().findSearchEnd(" {  { }  }", 1, "{", "}")).to.be.equal(9);
            });
            
            it("finds an end character after many nested starters", () => {
                expect(mocks.mockGlsParser().findSearchEnd(" {  { {}  { { }}}  }", 1, "{", "}")).to.be.equal(19);
            });
            
            it("finds equal starters and enders next to each other", () => {
                expect(mocks.mockGlsParser().findSearchEnd("  ", 0, " ", " ")).to.be.equal(1);
            });
            
            it("finds equal starters and enders far away from each other", () => {
                expect(mocks.mockGlsParser().findSearchEnd(" ... ", 0, " ", " ")).to.be.equal(4);
            });
        });
    });
})();