export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoibnVlbGFkZXllbWkiLCJhIjoiY2xyd2U2cGpyMHRiNTJsbXJ4cjB3aWpkYSJ9.snQ_2XaXJvTYLi3IL-ztqw';

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/nueladeyemi/clrxotbxo00e101qsbtbkeoxl',
    scrollZoom: false
    //   center: [-118.113491, 34.111745],
    //   zoom: 10,
    //   interactive: false
  });

  // mapboxgl.accessToken =
  //   'pk.eyJ1IjoibnVlbGFkZXllbWkiLCJhIjoiY2xyd2U2cGpyMHRiNTJsbXJ4cjB3aWpkYSJ9.snQ_2XaXJvTYLi3IL-ztqw';
  // const map = new mapboxgl.Map({
  //   container: 'map', // container ID
  //   style: 'mapbox://styles/mapbox/streets-v12', // style URL
  //   center: [-74.5, 40], // starting position [lng, lat]
  //   zoom: 9 // starting zoom
  // });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    //create marker
    const el = document.createElement('div');
    el.className = 'marker';

    //add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    //add popup
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTop(map);

    //extend map bound to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};
