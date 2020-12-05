---
layout: post
title:  "Leaflet.Deflate 0.2"
date:   2016-04-28 08:00:00+02:00
image: code
category: writing
highlight_code: true
body_id: blog
---

Recently, I have rolled out an update to [Leaflet.Deflate](https://github.com/oliverroick/Leaflet.Deflate), which adds a few changes and new features.

=====

Instantiating the plugin and adding it to the map is now more in line with other Leaflet plugins:

{% highlight javascript %}
var map = L.map("map");
L.Deflate({minSize: 10}).addTo(map);
{% endhighlight %}

Big thanks to [Lindsey Jacks](http://linzjax.github.io/), who helped with this.

Then, you can apply Leaflet.Deflate to selected features by adding the features to a [`FeatureGroup`](http://leafletjs.com/reference.html#featuregroup) and then appying Leaflet.Deflate to that `FeatureGroup`. Here's how:

{% highlight javascript %}
var map = L.map("map");

var featureGroup = L.featureGroup().addTo(map)
L.Deflate({minSize: 10, featureGroup: featureGroup}).addTo(map);

// The polygon will be deflated
var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]);
featureGroup.addLayer(polygon);
{% endhighlight %}

And finally, you can cluster markers using [Leaflet.Markercluster](https://github.com/Leaflet/Leaflet.markercluster) and [Leaflet.Markercluster.LayerSupport](https://github.com/ghybs/Leaflet.MarkerCluster.LayerSupport). 
Again, add the features to a `FeatureGroup` and then check-in the `FeatureGroup` with a `MarkerClusterGroup`:

{% highlight javascript %}
var featureGroup = L.featureGroup();
L.Deflate({minSize: 10, featureGroup: featureGroup}).addTo(map);

var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]);
featureGroup.addLayer(polygon);

var markerGroup = L.markerClusterGroup.layerSupport()
markerGroup.addTo(map);
markerGroup.checkIn(featureGroup);
featureGroup.addTo(map);
{% endhighlight %}
