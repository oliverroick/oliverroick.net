---
layout: portfolio
title: STAC React
summary: A library of React components and hooks to simplify building front-ends for STAC APIs.
client: Research and development at Development Seed.
dates: since 2022
preview: /img/portfolio/stac-react.webp
links:
  - label: Source on GitHub
    href: https://github.com/developmentseed/stac-react
tech:
  - TypeScript
  - React
  - Jest
  - Rollup
---

STAC (Spatio-temporal Asset Catalog) is a standard crucial for publication, exploration, and search of geo-spatial data. While there are several open-source libraries supporting the implementation for STAC-conformant APIs, corresponding front-end implementations are often built from scratch, with developers re-implementing common functionality, such as composing search queries and displaying search results as item lists and on interactive maps.

STAC-React is a small TypeScript library that supports developers in building front-end applications for STAC-APIs. It provides building blocks to compose item searches, execute queries to a STAC API, handle server responses and manage application state. Specifically, STAC-React four modules:

We designed STAC-React so it’s agnostic to UI-component libraries or frameworks you may use to build forms. It’s a simple layer that sits between the user-facing components of your application and the STAC backend. Instead of writing and maintaining code to compose complex queries, you can focus on crafting user-friendly interfaces to make geographic data more accessible over the Web.

## Work Delivered

- Design and implementation of a React context to manage query state and corresponding hooks to access the state and retrieve data from STAC APIs.
- Unit testing using Jest and React Testing Library.
- Library packaging with Rollup, producing CJS and ESM modules, type definititions.
- Documentation writing.
