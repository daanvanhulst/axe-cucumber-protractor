# axe-cucumber-protractor

Implementation based on dequelabs/axe-matchers in Ruby. This allows axe to be used in protractor with cucumber feature files.

## Installation

`npm install --save axe-cucumber-protractor`
or
`yarn add axe-cucumber-protractor`

## Example usage

In your step file, import:

`import 'axe-cucumber-protractor'`
or
`require('axe-cucumber-protractor')`

Then in a feature file:

```
Feature: my page
    Scenario: my page that should be accessible
        Given the page should be accessible according to: wcaga
```

## Features

This package has been made with one simple goal in mind, to run axe with protractor through the usage of cucumber feature files on Chrome. But because it is not much extra work to also make other features available, the setup has been made in a way that everything can be added. This status overview shows what you can use it for:

| Feature  	        | Options  	| default   	| Status  	        |   	|
|---	            |---	    |---	        |---	            |---	|
| negate            | not  	    | - 	        | Not implemented  	|   	|
| include           |   	    | [] (default)  | Not implemented       |    	|
| exclude           |   	    | [] (default)  | Not implemented       |       |
| according to      |           | ['wcag2a']   	| Implemented       |   	|
| run only   	    |   	    | -             | Not implemented  	|       |
| with rules	    |   	    | [] (default)  | Not implemented   	|       |
| Skipping rules    |   	    | [] (default)  | Implemented       |    	|
| Options           |   	    | -  	        | Not implemented   |    	|

# API

## Built-In Accessibility Cucumber Steps

To construct an axe accessibility Cucumber step, begin with the base step, and append any clauses necessary. All of the following clauses may be mixed and matched; however, they must appear in the specified order:

`Then the page should be accessible [including] [excluding] [according-to] [checking-rules/checking-only-rules] [skipping-rules]`

### Base Step

```
Then the page should be accessible
```

The base step is the core component of the step. It is a complete step on its own and will verify the currently loaded page is accessible using the default configuration of [axe.run][axe-run] (the entire document is checked using the default rules).

### Inclusion clause

```
Then the page should be accessible within "#selector"
```

The inclusion clause (`within "#selector"`) specifies which elements of the page should be checked. A valid [CSS selector][css selector] must be provided, and is surrounded in double quotes. Compound selectors may be used to select multiple elements. e.g. `within "#header, .footer"`

*see additional [context parameter documentation][context-param]*

### Exclusion clause

```
Then the page should be accessible excluding "#selector"
```

The exclusion clause (`excluding "#selector"`) specifies which elements of the document should be ignored. A valid [CSS selector][css selector] must be provided, and is surrounded in double quotes. Compound selectors may be used to select multiple elements. e.g. `excluding "#widget, .ad"`

*see additional [context parameter documentation][context-param]*

If desired, a semicolon (`;`) or the word `but` may be used to separate the exclusion clause from the inclusion clause (if present).

```
Then the page should be accessible within "main"; excluding "aside"
Then the page should be accessible within "main" but excluding "aside"
```

### Accessibility Standard (Tag) clause

```
Then the page should be accessible according to: tag-name
```

The tag clause specifies which accessibility standard (or standards) should be used to check the page. The accessibility standards are specified by name (tag). Multiple standards can be specified when comma-separated. e.g. `according to: wcag2a, section508`

The acceptable [tag names are documented][options-param] as well as a [complete listing of rules][rules] that correspond to each tag.

If desired, a semicolon (`;`) may be used to separate the tag clause from the preceding clause.

```
Then the page should be accessible within "#header"; according to: best-practice
```

### Checking Rules clause

```
Then the page should be accessible checking: ruleId
```

The checking-rules clause specifies which *additional* rules to run (in addition to the specified tags, if any, or the default ruleset). The rules are specified by comma-separated rule IDs.

*see [rules documentation][rules] for a list of valid rule IDs*

If desired, a semicolon (`;`) or the word `and` may be used to separate the checking-rules clause from the preceding clause.

```
Then the page should be accessible according to: wcag2a; checking: color-contrast
Then the page should be accessible according to: wcag2a and checking: color-contrast
```

#### Exclusive Rules clause

```
Then the page should be accessible checking only: ruleId
```

This clause is not really a separate clause. But rather, by adding the word `only` to the checking-rules clause, the meaning of the step can be changed. As described above, by default the checking-rules clause specifies *additional* rules to run. If the word `only` is used, then *only* the specified rules are checked.

### Skipping Rules clause

```
Then the page should be accessible skipping: ruleId
```

The skipping-rules clause specifies which rules to skip. This allows an accessibility standard to be provided (via the tag clause) while ignoring a particular rule. The rules are specified by comma-separated rule IDs.

*see [rules documentation][rules] for a list of valid rule IDs*

If desired, a semicolon (`;`) or the word `but` may be used to separate the skipping-rules clause from the preceding clause.

```
Then the page should be accessible according to: wcag2a; skipping: accesskeys
Then the page should be accessible according to: wcag2a but skipping: accesskeys
```

## Examples

```
Then the page should be accessible within "main, header" but excluding "footer"

Then the page should be accessible excluding "#sidebar" according to: wcag2a, wcag2aa but skipping: color-contrast

Then the page should be accessible checking only: document-title, label

Then the page should be accessible according to: best-practice and checking: aria-roles, definition-list
```

[inclusion-clause]: #inclusion-clause
[exclusion-clause]: #exclusion-clause
[tag-clause]: #accessibility-standard-tag-clause
[rules-clause]: #checking-rules-clause
[exclusive-rules-clause]: #exclusive-rules-clause
[skipping-rules-clause]: #skipping-rules-clause

[axe-run]: https://github.com/dequelabs/axe-core/blob/master/doc/API.md#api-name-axerun
[context-param]: https://github.com/dequelabs/axe-core/blob/master/doc/API.md#context-parameter
[options-param]: https://github.com/dequelabs/axe-core/blob/master/doc/API.md#options-parameter
[rules]: https://github.com/dequelabs/axe-core/blob/master/doc/rule-descriptions.md

[css selector]: https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Getting_started/Selectors
