---
layout: post
title:  "Deflating Polygons in Leaflet"
description: How to dynamically replace small polygons with markers in smaller zoom levels.
date:   2015-04-22 10:00:00
image: code
category: writing
highlight_code: true
body_id: blog
---

A common problem with dynamic web maps is the way polygons and lines are displayed in lower zoom levels. At some point, these geometries become too small to be noticeable on the map. A straight forward solution is to replace the polygon or line with a marker at the feature's centroid position.

The new Leaflet plugin [Leaflet.Deflate](https://github.com/oliverroick/Leaflet.Deflate) does just that. Read on to see how it works.

=====

![Leaflet Deflate example](/img/Leaflet.Deflate.gif)

## The basics

The (slighlty) tricky part is to determine when a feature actually is too small, as it depends on both the geographical size of the feature and the scale of the map. A scale-independent unit, which also happens to be the universal unit on computer screens, is the pixel. Hence, calculating the pixel size of the polygon on the screen and switching between marker and polygon display when the pixel size falls below a certain threshold is the approach that was implemented in the plugin.

The good thing is, [Leaflet](https://leafletjs.com/) already provides us with all the basic functionality necessary to implement this approach.

## Identifying the threshold zoom level

The following snippet demonstrates how we determine the polygon screen size.

{% highlight javascript %}
function isCollapsed (path, zoom) {
    var bounds = path.getBounds();

    var ne_px = map.project(bounds.getNorthEast(), zoom);
    var sw_px = map.project(bounds.getSouthWest(), zoom);

    var width = ne_px.x - sw_px.x;
    var height = sw_px.y - ne_px.y;
    return (height < this.options.minSize || width < this.options.minSize);
}
{% endhighlight %}

Here's how it works:

1. Get the bounding box of the feature. Using the bounding box makes calculations a lot simpler when compared to complex geometries.
2. The [`Bounds`](https://leafletjs.com/reference.html#bounds) object provides the coordinates of its north-east and south-west corners. Using [`Map.project(<LatLng>, zoom)`](https://leafletjs.com/reference.html#map-project) we can get the pixel coordinates of both corners.
3. Now its possible to calculate the bounding box's width and height in pixels.
4. Finally, all we need is to compare the dimensions against a pre-set threshold value (the `minSize` option). For simplicity, the function just checks if both `width` and `hight` exceed the threshold value.
5. The function returns `true` if one of the values is lower than the threshold.

## Determining the minimum zoom level for a feature

Now we can determine the threshold zoom level for each feature when the display should swap between a marker and its actual geometry. We determine that threshold as soon as the feature is added to the map so we don't have to do any calculations every time the map is zoomed.

The following function determines the threshold zoom.

{% highlight javascript %}
function getZoomThreshold (path) {
    var zoomThreshold = null;
    var zoom = map.getZoom();
    if (isCollapsed(path, map.getZoom())) {
        while (!zoomThreshold) {
            zoom += 1;
            if (!map.isCollapsed(path, zoom)) {
                zoomThreshold = zoom - 1;
            }
        }
    } else {
        while (!zoomThreshold) {
            zoom -= 1;
            if (map.isCollapsed(path, zoom)) {
                zoomThreshold = zoom;
            }
        }
    }
    return zoomThreshold;
}
{% endhighlight %}

Here's how it works:

1. Get the current zoom level of the map.
2. Check if the feature should be displayed as a marker at the current zoom level; using the method discussed previously.
3. Depending on that information, we have to increase or decrease the zoom level until `isCollapsed` changes its status to determine the threshold.

## Adding the feature to the map

When a new feature is added to the map, we can now pre-calculate the zoom threshold and the replacement marker. We register an event handler for the `layeradd` event that is called every time a feature is added to the map.

Because the handler will be called every time we swap between marker and the original geometry, the calculation should be carried out only once — when the feature is added to the map the first time. That's why we check if `zoomThreshold` and `marker` are not already assigned to the feature. By further checking if `getBounds` method is present, we ensure that the we calculating everything for two-dimensional features only (which excludes points).

{% highlight javascript %}
map.on('layeradd', function(event) {
    var feature = event.layer;
    if (feature.getBounds && !feature.zoomThreshold && !feature.marker) {
        var zoomThreshold = getZoomThreshold(feature);
        var marker = L.marker(feature.getBounds().getCenter());

        feature.zoomThreshold = zoomThreshold;
        feature.marker = marker;

        if (this.getZoom() <= zoomThreshold) {
            map.removeLayer(feature);
            map.addLayer(feature.marker);
        }
    }
});
{% endhighlight %}

## Replacing markers after zooming the map

Whenever the user zooms the map, we just need to compare the map's current zoom with the pre-calculated threshold of each feature. We do that in a handler function we registered on Leaflet's `zoomend` event.

Within the event handler we iterate over all features in our map and replace the feature with a marker if the current zoom is lower than the `zoomThreshold`. We also store the feature in `removedTemp` for now.

All features that have already been replaced with markers are stored in the global `removedPaths`. We iterate over all elements in that `Array` to check whether each marker can be replaced with its original feature again.

Finally, we join `removedTemp` to `removedPaths` to store all replaced features in one place.

{% highlight javascript %}
removedPaths = [];

map.on('zoomend', function () {
    var removedTemp = [];

    map.eachLayer(function (feature) {
        if (map.getZoom() <= feature.zoomThreshold) {
            map.removeLayer(feature);
            map.addLayer(feature.marker);
            removedTemp.push(feature);
        }
    }, this);

    for (var i = 0; i < removedPaths.length; i++) {
        var feature = removedPaths[i];
        if (map.getZoom() > feature.zoomThreshold) {
            map.removeLayer(feature.marker);
            map.addLayer(feature);
            removedPaths.splice(i, 1);
            i = i - 1;
        }
    }

    removedPaths = removedPaths.concat(removedTemp);
});
{% endhighlight %}

To see how these parts work together, have a look at the [plugin's source](https://github.com/oliverroick/Leaflet.Deflate/blob/master/src/L.Map.Deflate.js). Feel free to raise an issue if you spot something that needs improvement.
