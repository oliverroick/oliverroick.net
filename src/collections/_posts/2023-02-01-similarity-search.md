---
category: portfolio
layout: portfolio
title: Similarity Search
description: Explore satellite-image archives by finding similar images.
client: NASA Earth Data
dates: 2022 - 2023
links:
  - label: View Project
    href: https://www.earthdata.nasa.gov/dashboard/labs/similarity-search/
  - label: Source on GitHub
    href: https://github.com/NASA-IMPACT/similarity-search-frontend
tech:
  - React
  - Chakra UI
  - Tanstack Query
  - Mapbox GL
  - Turf
header_image: "simsearch.webp"
---

Using self-supervised learning, Similalaity Search allows researchers to select a sample image and to find similar images from am archive of satellite data. Similarity Search's goal is to support scholars in climate-change research to find relevant data about wildfires, oli spills or hurricanes without manually combing through vast troves of archives often spanning several decades.

<img src="/img/portfolio/simsearch-screen.webp">

## Work delivered

- Major refactoring of the application, separating application pages and shared components, increasing re-usability and code efficiency.
- New features, including:
  - Download results as CSV, the download being generate on the fly in the front-end
  - Improved results display, including image preview on the map and table view
  - Geocoding and reverse geo-coding
