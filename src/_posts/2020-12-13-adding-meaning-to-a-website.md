---
layout: post
title:  "Adding meaning to a website"
date:   2020-12-13 10:00:00+00:00
image: schema-org
category: writing
body_id: blog
description: Enriching Web documents with semantic data
---

HTML gives documents on the Web a logical structure. It describes what the parts of a page are: Navigation, main content, a headline, list, or simple text. A browser, with the help of CSS, uses the structure to render the page.

Search engines use HTML to understand what is important on a page and what isn't—a term used in a headline or the page title is more important than a term used in the page footer. The algorithms can also infer what you are writing about in a document. Mention "Fear and Loathing in Las Vegas" often enough and in the right places then you are very likely talking about a significant piece of popular culture.

It is much harder to infer what the document represents, what real-world thing it relates to. Are you talking about the book or the movie? Or the book's author? Or maybe it's a review of an event where the movie is screened.

What is missing is additional, unambiguous meta information about a document. Such data can be added to a document using two ingredients:

1. A shared vocabulary to classify documents; a taxonomy of things. Both the document and the software consuming the document must share an understanding of the things that exist and how the things are related. Both need to speak the same language. 
2. A way to use the vocabulary in a document. We need a way to add semantic information to a document.

## Schema.org

[Schema.org](https://schema.org/) develops vocabularies to describe entities, their relationships, and actions. It's the shared language machines speak that understand what a document on the Web represents. The vocabulary is supported and understood by major search engines. Schema.org has schemas for all sorts of things, amongst many others there are [Book](https://schema.org/Book), [Event](https://schema.org/Event), [Person](https://schema.org/Person), or [Place](https://schema.org/Place).

Using the schemas you could tell machines reading a document that the contents are about an event where Johnny Depp did a reading of a book called "Fear and Loathing in Las Vegas". You can add properties to all these entities: When and where the event happened, who the author of the book is, when it was published, and by what publishing house. 



## Use Schemas in a web document

Schema.org provides the taxonomy of things, the shared language. As with everything in front-end these days, there are different ways to encode the vocabulary into an HTML document. 

### Microdata

Microdata, part of the WHATWG HTML standard, provides three element attributes to embed metadata into HTML:

- `itemscope` signals that the content within the element refers to a thing.
- `itemtype` identifies what the thing is. It is an HTTP reference to the schema describing the structure of the thing, usually an HTTP resource under schema.org. 
- `itemprop` identifies a property of the thing. The property value is the text content of the element. 

Here is an example:

```html
<div itemscope itemtype="https://schema.org/LiteraryEvent">
  <span itemprop="performer" itemscope itemtype="https://schema.org/Person">
    <span itemprop="name">Johnny Depp</span>
  </span>
  read
  <span itemprop="about" itemscope itemtype="https://schema.org/Book">
    <span itemprop="name">Fear and Loathing in Las Vegas</span>
    by
    <span itemprop="author" itemscope itemtype="https://schema.org/Person">
      <span itemprop="name">Hunter S. Thompson</span>
    </span>
  </span>.
</div>
```

Pretty convoluted way of expressing meaning but remember we're talking to machines here. 

What this says is: A literary event happened where a person named Johnny Depp was the performer and the event was about a book titled "Fear and Loathing in Las Vegas", which was written by a person named Hunter S. Thompson. 

By nesting elements and adding `itemscope` attributes, we can describe relationships. One thing is related to the thing in the parent element; a person is the author of a book.

### RDFa

Similar to Microdata is RDFa, which also adds attribute-level extensions to markup. However, it is not limited to HTML, you can also use it with XTHML or other XML dialects. 

It introduces three attributes:

- `typeof` indicates that all content within the element describes a thing and it identifies what that thing is.
- `property` identifies a property of the thing. The property value is the text content of the element. 
- `vocab`, used in the top-most possible level in the element tree, indicates where to find the schemas for the things described. This would usually point to schema.org.

Using less characters, RDFa is a bit easier to read, but the meaning of the content is very much the same:

```html
<div vocab="https://schema.org/" typeof="LiteraryEvent">
  <span property="performer" typeof="Person">
    <span property="name">Johnny Depp</span>
  </span>
  read
  <span property="about" typeof="Book">
    <span property="name">Fear and Loathing in Las Vegas</span>
    by
    <span property="author" typeof="Person">
      <span property="name">Hunter S. Thompson</span>
    </span>
  </span>.
</div>
```

### JSON-LD

JSON-LD, a short-hand for "JavaScript Object Notation for Linked Data", is a bit different. 

Instead of annotating the document markup with metadata, it is added separately from the content the human user gets to read. Being JSON, it is added to the page in a `<script>` element:

```json
{
  "@context": "https://schema.org/",
  "@type": "LiteraryEvent",
  "performer": {
    "@type": "Person",
    "name": "Johnny Depp"
  },
  "about": {
    "@type": "Book",
    "name": "Fear and Loathing in Las Vegas",
    "author": {
      "@type": "Person",
      "name": "Hunter S. Thompson"
    }
  }
}
```

The keys in the object are corresponding to the attribute keys in Microdata and RDFa:

- `@context` indicates where to find the term definitions, the vocabulary.
- `@type` identifies the thing.
- All other keys, such as `name`, `performer`, and `author` indicate the thing's properties. 

By nesting objects, we can describe simple relationships. The child object is part of the parent object. 

### What format to use

So we have options to encode schemas, which should we use? Any will do, on a basic level, all three formats are very similar.

Google parses all three formats but prefers JSON-LD. You don't have to slot in additional markup between user-visible content and it is easier to add additional information to things without extra content or using multiple `meta` elements throughout the content. JSON-LD is easier to handle if your site is produced using a content-management system.

There other more subtle differences. Microdata can only be used with HTML5, whereas RDFa can be used with several XML dialects. And using RDF your website can become part of the Semantic Web if that's something you fancy. [This comment on StackOverflow provides a more in-depth discussion on the differences](https://stackoverflow.com/questions/8957902/microdata-vs-rdfa/25888436#25888436).
