---
layout: portfolio
title: A2O Search
summary: Find bird sightings across Australia using recorded audio. Like Shazam, but for birds.
client: Australian Acoustic Observatory, Google, Queensland University of Technology. Delivered as part of the team at Development Seed.
dates: 2022
preview: /img/portfolio/a2o-search.webp
links:
  - label: View Project
    href: https://search.acousticobservatory.org
  - label: Source on GitHub
    href: https://github.com/developmentseed/bioacoustics-frontend
tech:
  - React
  - Chakra UI
  - Mapbox GL
  - Wavesurfer
featured: true
---

The Australian Acoustic Observatory runs a network of sound recorders in Australia to track sightings of animal species across the country. The resulting data is crucial understand animal habitats and migration; and how climate change affects both. The recorders produce hours of sound that have to be manually review by humans to identify relevant bird calls.

To simplify this process Google have trained a machine-learning model, which separates bird calls from other sounds. Based on this model, we implemented a web application allowing users to upload a recording and find similar bird calls in A2O's vast archive of field recordings.

## Work delivered

- Implemented an audio player and audio spectrogram visualisation using [Wavesurfer.js](https://wavesurfer.xyz).
- Implemented an audio clipping tool enabling users to select relevant parts of their recording before upload.
- Display of more than 16,000 results at a time as map, table, and grid; and client-side filtering by map bounding box, date and time.

## In the News

The project received coverage in major Australian news outlets.

[Sydney Morning Harald](https://www.smh.com.au/technology/google-for-wildlife-sounds-huge-boost-for-conservation-research-20231127-p5en31.html):

> “What we have built here is a search tool to liberate the data collected in the field. Instead of trying to manually sift through what amounts to hundreds of years of data that we could not live long enough to go through, AI does it for us,”

[ABC News](https://www.abc.net.au/news/2023-11-29/qut-google-australia-a2o-search-audio-search-engine-wildlife/103158632):

> Researchers hope the audio search engine will yield important insights into where some animals go after bushfires and other natural disasters, and to better understand the impact of climate change and the spread of invasive species.
