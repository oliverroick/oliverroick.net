---
layout: portfolio
title: STAC Admin
summary: Updating collections and items in STAC catalogs is hard, so we built a prototype admin interface.
client: Research and development at Development Seed.
dates: 2024
preview: /img/portfolio/stac-admin.webp
links:
  - label: Source on GitHub
    href: https://github.com/developmentseed/stac-admin
tech:
  - TypeScript
  - React
  - Chakra UI
  - stac-react
  - MapLibre GL
---

[SpatioTemporal Asset Catalog (STAC)](https://stacspec.org/en) defines a standardised APU publication, exploration, and search of geo-spatial data. Backend implementations are available with APIs to ingest and manage data, but updating data often requires technical expertise to process and ingest meta data using semi-automated scripts. Casual users rely on software engineers to run these updates, work they could do themselves if there was a user-interface to update STAC meta data via a web form.

We built a React-based prototype application showcasing how an admin interface for STAC catalogs could look. Limited in scope, the interface allows users to browse existing collections and items and search for items by geographic area, collection ID, and date. Common properties of individual collections and items can be edited via web forms.

The application is built and tested against instances of [eoAPI](https://eoapi.dev) with the [STAC Transaction extension](https://github.com/stac-api-extensions/transaction) enabled. The heavy lifting for browsing collections and items is done with stac-react.

<img src="/img/portfolio/stac-admin-screen.webp">

## Work delivered

- Idea and strategic direction.
- Design and implementation of a React-based user interface.
- Build automation and continuous deployment with GitHub Actions.
