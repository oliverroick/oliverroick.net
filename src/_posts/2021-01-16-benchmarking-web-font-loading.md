---
layout: post
title:  "Benchmarking Web-font Loading"
date:   2021-01-16 10:00:00+00:00
category: writing
body_id: blog
description: You can have a web fonts on a site and make it load fast. Here are the numbers. 
---

This website is optimised for performance. I want it to load quickly no matter where you are and what device you are using. Its design is simple; partly because I’m not a designer, partly intentional to keep its footprint small. Over the years, I removed third-party trackers and other external resources, decorative images, and even the smallest amount of JavaScript. The site now is a set of static HTML pages rendered using a [static page generator](https://jekyllrb.com/) and some CSS. It is [boring technology](https://mcfunley.com/choose-boring-technology). I use [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) to benchmark changes, maintaining a perfect 100 for a couple of years now. 

I never used a font on this site that wasn’t a system font. This site shouldn’t depend on any third-party services, where I cannot control what is included and downloaded to show text — the very essence of a website.

Even without using third-party services, web fonts are heavy. [Source Serif Pro](https://github.com/adobe-fonts/source-serif-pro), which is beautiful, free, and open-source, adds a total of 209,644 bytes using only regular, bold, and italic variations. All other resources of the this page amount to 7,130 bytes. Adding a Source Serif Pro increases the overall footprint by 30 times. As a result, the PageSpeed score plummets from 100 to 89. 

Compared to other major websites, such as google.com (490KB), twitter.com (>2MB), or any news website that includes every tracker their marketing team could find, the footprint of this site is small; even with web fonts included. There must be a way to include web fonts and make the site load fast, surely.

PageSpeed Insights tracks [six metrics](https://web.dev/performance-scoring/#lighthouse-6) to calculate the performance score[^1]. Each metric is converted into a score on a scale of 1 to 100; the longer it takes for the First Contentful Paint to finish the lower the resulting score. On top of that, each metric has a different range: First Contentful Paint has a range from 1s to 8s whereas Speed Index has a range from 1s to 12s. Everything lower than 1s will not improve your score and everything higher than 8s or 12s will not worsen your score below 0. Consequently, the score for the First Contentful Paint drops quicker than that of the Speed Index. The overall score is a weighted average of the six individual scores; some have a bigger impact on the overall score than others. (That was a lot of words, play around with the [Lighthouse Scoring calculator](https://googlechrome.github.io/lighthouse/scorecalc/) to understand how the metrics affect the score.)

Adding Source Serif Pro affects four of the six metrics; all of which are time-based metrics dropping from 1.6s to 3.0s. 

<table>
    <caption>Page speed metrics and scores before and after adding Source Sans Serif</caption>
    <thead>
        <tr>
            <th scope="col">Metric</th>
            <th scope="col" colspan="2">with web font</th>
            <th scope="col" colspan="2">without web font</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>First Contentful Paint</td>
            <td>1.6s</td>
            <td>99</td>
            <td>3.0s</td>
            <td>75</td>
        </tr>
        <tr>
            <td>Speed Index</td>
            <td>1.6s</td>
            <td>100</td>
            <td>3.0s</td>
            <td>94</td>
        </tr>
        <tr>
            <td>Largest Contentful Paint</td>
            <td>1.6s</td>
            <td>99</td>
            <td>3.0s</td>
            <td>78</td>
        </tr>
        <tr>
            <td>Time to Interactive</td>
            <td>1.6s</td>
            <td>100</td>
            <td>3.0s</td>
            <td>96</td>
        </tr>
        <tr>
            <td>Total Blocking Time</td>
            <td>0ms</td>
            <td>100</td>
            <td>0ms</td>
            <td>100</td>
        </tr>
        <tr>
            <td>Cumulative Layout Shift</td>
            <td>0</td>
            <td>100</td>
            <td>0.002</td>
            <td>100</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td>Overall</td>
            <td></td>
            <td>100</td>
            <td></td>
            <td>89</td>
        </tr>
    </tfoot>
</table>

The scores for two metrics are particularly low: First Contentful Paint (FCP), indicating the time it takes to show something on the page, and Largest Contentful Paint (LCP), indicating the time it takes to show the largest element on the page; it is a proxy for the time to render the main content on the page. At a maximum of 8,000ms, both metrics have a shorter range than others. Largest Contentful Paint makes up  25% of the overall score, so a lower score has a big impact on the overall result. 

I never optimised how CSS is applied to this site. It was just a big old file linked in the page’s `head`. This approach was never an issue since the CSS is only a couple of hundred lines. 

Browsers try to optimise web-font download and only request the variants that are used on the page, independent of how many variants are declared in the CSS. If the page never renders the italic variation of a font the browser will not download it. To do that, the browser needs to parse the DOM and all of the CSS first – it needs to understand the content on the page, what CSS is needed to render the page, and then download the fonts accordingly. 

Including a web font turns the CSS into a render-blocking resource.

## Priorising web font resources
`<link rel=“preload”>` instructs the browser to download a resource immediately before the rendering cycle of the page starts. That way, web fonts can be downloaded early before the DOM and CSSOM are built. In other words, the browser won’t wait for the HTML document and the CSS to be downloaded. 

<table>
    <caption>Page speed metrics and scores after preloading web fonts</caption>
    <thead>
        <tr>
            <th scope="col">Metric</th>
            <th scope="col">measurement</th>
            <th scope="col">Score</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>First Contentful Paint</td>
            <td>1.560s</td>
            <td>99</td>
        </tr>
        <tr>
            <td>Speed Index</td>
            <td>1.560s</td>
            <td>100</td>
        </tr>
        <tr>
            <td>Largest Contentful Paint</td>
            <td>2.760s</td>
            <td>84</td>
        </tr>
        <tr>
            <td>Time to Interactive</td>
            <td>1.560s</td>
            <td>100</td>
        </tr>
        <tr>
            <td>Total Blocking Time</td>
            <td>0ms</td>
            <td>100</td>
        </tr>
        <tr>
            <td>Cumulative Layout Shift</td>
            <td>0.0021</td>
            <td>100</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td>Overall</td>
            <td></td>
            <td>96</td>
        </tr>
    </tfoot>
</table>

Prioritising the download of web fonts brings the First Contentful Paint improves page load and rendering speed. The Largest Contentful Paint (2.7s) is now bigger than in any of the previous scenarios, impacting the time until the main content is rendered significantly. Overall, the performance is better compared to the unoptimised version but can be better.

## Inlining critical CSS
Inlining critical CSS is a technique that adds any CSS directives into the document `head` that are needed to render the page area [above the fold](https://en.wikipedia.org/wiki/Above_the_fold#In_web_design). The browser loads all remaining CSS asynchronously removing the dependency on potentially render-blocking CSS. There are libraries that do the heavy lifting. This site runs on Netlify so I used [netlify-plugin-inline-critical-css](https://github.com/Tom-Bonnike/netlify-plugin-inline-critical-css), which uses [critical](https://github.com/addyosmani/critical) under the hood.

<table>
    <caption>Page speed metrics and scores after inlining critical CSS</caption>
    <thead>
        <tr>
            <th scope="col">Metric</th>
            <th scope="col">measurement</th>
            <th scope="col">Score</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>First Contentful Paint</td>
            <td>0.86s</td>
            <td>100</td>
        </tr>
        <tr>
            <td>Speed Index</td>
            <td>0.86s</td>
            <td>100</td>
        </tr>
        <tr>
            <td>Largest Contentful Paint</td>
            <td>0.86s</td>
            <td>100</td>
        </tr>
        <tr>
            <td>Time to Interactive</td>
            <td>0.86s</td>
            <td>100</td>
        </tr>
        <tr>
            <td>Total Blocking Time</td>
            <td>0ms</td>
            <td>100</td>
        </tr>
        <tr>
            <td>Cumulative Layout Shift</td>
            <td>0.001</td>
            <td>100</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td>Overall</td>
            <td></td>
            <td>100</td>
        </tr>
    </tfoot>
</table>

The effect on page-load speed is impressive. The page load improves significantly, in fact, it now loads faster than it was before adding Source Serif Pro and optimising CSS loading. Despite the weight of web fonts, it is possible to include web fonts on a website and make it load and render fast.

---

This website still uses Georgia, a system font.

Unless you are a designer or typographer, you probably won’t be able to tell the difference between many fonts unless you choose to compare Comic Sans to Times. I often find myself looking at other websites and find myself thinking, “This font looks ok,” and it turns out it is a system font. There are areas in the world where people have to pay for bandwidth and where every byte counts. No matter which way you optimise, web fonts will be downloaded at some point. And there is still a chance of smallest layout shifts if you’re behind a slow connection – something that does bother me from time to time.

System fonts work. System fonts don't consume extra bandwidth and don’t require additional complexity to keep performance at a high level. [Webfonts are not required](http://mrmrs.io/writing/2016/03/17/webfonts/); not from a design perspective, not from a technical perspective, and certainly not from a users perspective. 

[^1]: These metrics change over time, both how the individual metrics are weighted but also what metrics are included. The results of this article are based on [Lighthouse 6](https://web.dev/performance-scoring/#lighthouse-6).
