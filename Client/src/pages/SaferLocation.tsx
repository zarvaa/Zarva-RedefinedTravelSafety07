import { useState, useEffect, useRef } from "react";
import { MapPin, Search, Navigation } from "lucide-react";

declare global {
  interface Window {
    google: typeof google;
  }
}

interface RouteData {
  route: [number, number][];
  Duration: string;
  Distance: string;
}

const SaferRoutesApp = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [routePath, setRoutePath] = useState<google.maps.Polyline | null>(null);
  const [routeInfo, setRouteInfo] = useState<{ duration: string; distance: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const lastPositionRef = useRef<google.maps.LatLng | null>(null);
  const infoBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scriptId = "googleMapsScript";
    const initializeMap = () => {
      if (!window.google?.maps?.Map || !mapRef.current) return;

      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 28.6139, lng: 77.209 },
        zoom: 12,
        mapTypeId: "roadmap",
      });

      const marker = new google.maps.Marker({
        map,
        icon: getArrowIcon(0),
        visible: false,
      });

      setMapInstance(map);
      markerRef.current = marker;
    };

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDjhuWZztdK2U2wWaGAyvgS5DxTCqi8kmg&libraries=geometry,places`;
      script.id = scriptId;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.body.appendChild(script);
    } else if (window.google?.maps) {
      initializeMap();
    }

    return () => {
      const script = document.getElementById(scriptId);
      script?.remove();
    };
  }, []);

  const getArrowIcon = (rotation: number) => ({
    path: "M 0,-2 L 2,2 L -2,2 Z",
    scale: 7,
    fillColor: "#FF0000",
    fillOpacity: 1,
    strokeColor: "#000000",
    strokeWeight: 1,
    rotation,
    anchor: new google.maps.Point(0, 0),
  });

  const fetchSaferRoute = async () => {
    let origin = pickup;

    if (!origin) {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        origin = `${position.coords.latitude},${position.coords.longitude}`;
        setPickup(origin);
      } catch {
        setError("Please allow location access or enter a pickup location.");
        return;
      }
    }

    if (!destination) {
      setError("Please enter a destination");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch("https://safer-location.onrender.com/v1/api/carRoute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ origin, destination }),
      });
      
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      
      const data = await response.json() as RouteData;
      setRouteInfo({
        duration: data.Duration,
        distance: data.Distance,
      });

      const routeCoordinates = data.route.map(([lng, lat]) => ({ lat, lng }));

      if (routePath) routePath.setMap(null);

      if (mapInstance && routeCoordinates.length > 0) {
        const newRoutePath = new google.maps.Polyline({
          path: routeCoordinates,
          geodesic: true,
          strokeColor: "#2ecc71",
          strokeOpacity: 2.0,
          strokeWeight: 5,
        });

        newRoutePath.setMap(mapInstance);
        setRoutePath(newRoutePath);

        // Fit the map to the route
        const bounds = new google.maps.LatLngBounds();
        routeCoordinates.forEach(coord => bounds.extend(coord));
        mapInstance.fitBounds(bounds);

        // Update the info bar with route information
        if (infoBarRef.current) {
          infoBarRef.current.innerHTML = `
            <strong>Route Info</strong><br>
            Distance: ${data.Distance}<br>
            Duration: ${data.Duration}
          `;
          infoBarRef.current.style.display = 'block'; // Show the info bar
        }
      }
    } catch {
      setError("Failed to fetch safe route. Please check your inputs and try again.");
      setRouteInfo(null);
      if (routePath) routePath.setMap(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRecenter = () => {
    if (routePath && mapInstance) {
      const path = routePath.getPath();
      const coordinates = path.getArray();
      
      if (coordinates.length > 0) {
        const startPoint = coordinates[0];
        const nextPoint = coordinates.length > 1 ? coordinates[1] : startPoint;

        const heading = window.google.maps.geometry.spherical.computeHeading(startPoint, nextPoint);

        mapInstance.setOptions({
          center: startPoint,
          zoom: 16,
          heading: heading,
          tilt: 45,
        });
      }
    }
  };

  const toggleLiveTracking = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
      if (markerRef.current) markerRef.current.setVisible(false);
    } else {
      const id = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude, heading, speed } = position.coords;
          const newPos = new google.maps.LatLng(latitude, longitude);

          let rotationAngle = (markerRef.current?.getIcon() as google.maps.Symbol)?.rotation || 0;

          if (speed && speed > 0.5 && typeof heading === "number" && !isNaN(heading)) {
            rotationAngle = heading;
          } else if (lastPositionRef.current && !newPos.equals(lastPositionRef.current)) {
            rotationAngle = google.maps.geometry.spherical.computeHeading(lastPositionRef.current, newPos);
          }

          if (markerRef.current) {
            markerRef.current.setIcon(getArrowIcon(rotationAngle));
            markerRef.current.setPosition(newPos);
            markerRef.current.setVisible(true);
          }

          if (mapInstance) mapInstance.panTo(newPos);
          lastPositionRef.current = newPos;
          setPickup(`${latitude},${longitude}`);
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Error getting location: " + error.message);
        },
        { enableHighAccuracy: true }
      );
      setWatchId(id);
    }
  };

  return (
    <div
      className="relative h-screen w-full"
      style={{
        backgroundImage: `url(/background.z.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Main Content Container - Side by Side Layout */}
      <div className="flex h-full pt-24 px-28 gap-10 ">
        {/* Left Card - Safer Routes Form */}
        <div className="w-[32rem] z-10 transition-all duration-300 hover:scale-105 flex-shrink-0">
          <div
            className="bg-white rounded-2xl p-12 border-2 border-gray-300 transition-all duration-300 hover:shadow-xl h-full"
            style={{
              backgroundColor: '#d1cec5',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 2), 0 2px 4px -1px rgba(0, 0, 0,2)'
            }}>
            <h2 className="text-3xl font-bold font-serif text-black mb-6">Find Safer Routes</h2>
            
            {/* Start Live Tracking Button */}
            <button 
              onClick={toggleLiveTracking}
              className="w-full bg-black text-[#bcb291] py-3 px-4 rounded-full font-medium text-2xl mb-6 hover:opacity-80 transition-opacity"
            >
              {watchId ? "Stop Live Tracking" : "Start Live Tracking"}
            </button>

            {/* Pickup Location Input */}
            <div className="mb-4">
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 transition-transform duration-300 hover:scale-125">
                  <svg className="w-4 h-4 text-[#bcb291] transition-all duration-300 hover:text-black" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="10" r="8" />
                    <path d="M12 18v4" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Enter pickup location"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white"
                />
                <Search 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 transition-all duration-300 hover:scale-125 hover:text-black" 
                  onClick={async () => {
                    try {
                      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(resolve, reject);
                      });
                      setPickup(`${position.coords.latitude},${position.coords.longitude}`);
                    } catch {
                      setError("Could not get your current location. Please allow location access.");
                    }
                  }}
                />
              </div>
            </div>

            {/* Destination Input */}
            <div className="mb-6">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 transition-all duration-300 hover:scale-125 hover:text-black" />
                <input
                  type="text"
                  placeholder="Enter destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white"
                />
              </div>
            </div>

            {/* Find Routes Button */}
            <div className="flex justify-center">
              <button 
                onClick={fetchSaferRoute}
                disabled={loading}
                className="w-48 bg-black text-[#bcb291] py-3 px-1 rounded-full font-medium text-2xl hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Searching..." : "Find Routes"}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Map Container */}
        <div className="flex-grow relative rounded-2xl overflow-hidden border-2 border-gray-300 shadow-lg">
          <div ref={mapRef} className="w-full h-full"></div>
          <div
            ref={infoBarRef}
            className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 text-black p-4 text-center font-medium"
            style={{ display: routeInfo ? 'block' : 'none' }}
          >
            {routeInfo && (
              <>
                <strong>Route Info</strong><br />
                Distance: {routeInfo.distance}<br />
                Duration: {routeInfo.duration}
              </>
            )}
          </div>
          <button
            onClick={handleRecenter}
            className="absolute top-4 right-4 bg-white hover:bg-gray-50 text-black px-4 py-2 rounded-lg shadow-md border border-gray-200 transition-colors flex items-center gap-2 font-medium"
            title="Recenter map to route start"
          >
            <Navigation className="h-5 w-5" />
            Recenter
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaferRoutesApp;