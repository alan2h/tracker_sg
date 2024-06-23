import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.page.html',
  styleUrls: ['./clients.page.scss'],
})
export class ClientsPage implements OnInit, AfterViewInit, OnDestroy {
  private map!: L.Map;
  private myLocationMarker!: L.Marker;
  private fixedPointMarker!: L.Marker;
  private routingControl!: any;
  private instructionsVisible: boolean = false; // Variable to track visibility

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.initMap();
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }

  private async initMap(): Promise<void> {
    this.map = L.map('map', {
      center: [-26.1775300, -58.1781400],
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    try {
      // Get current position
      const position = (await Geolocation.getCurrentPosition()).coords;

      const myLocation: L.LatLngExpression = [position.latitude, position.longitude];
      // const myLocation: L.LatLngExpression = [-26.1788498, -58.1711369];
      const fixedPoint: L.LatLngExpression = [-26.18547, -58.17421];

      const myLocationIcon = L.icon({
        iconUrl: 'assets/icon/map/pointer.svg',
        iconSize: [16, 16],
        iconAnchor: [16, 16],
        popupAnchor: [0, 10],
      });

      const fixedPointIcon = L.icon({
        iconUrl: 'assets/icon/map/flag.svg',
        iconSize: [16, 16],
        iconAnchor: [16, 16],
        popupAnchor: [0, 10],
      });

      if (this.myLocationMarker) {
        this.map.removeLayer(this.myLocationMarker);
      }
      
      this.myLocationMarker = L.marker(myLocation, { icon: myLocationIcon }).addTo(this.map).bindPopup('Mi Ubicación').openPopup();

      if (this.fixedPointMarker) {
        this.map.removeLayer(this.fixedPointMarker);
      }
      this.fixedPointMarker = L.marker(fixedPoint, { icon: fixedPointIcon }).addTo(this.map).bindPopup('Punto Fijo').openPopup();

      const bounds = L.latLngBounds([myLocation, fixedPoint]);

      setTimeout(() => {
        this.map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
      }, 2000);

      if (this.routingControl) {
        this.map.removeControl(this.routingControl);
      }
      this.routingControl = (L as any).Routing.control({
        waypoints: [
          L.latLng(myLocation[0], myLocation[1]),
          L.latLng(fixedPoint[0], fixedPoint[1])
        ],
        routeWhileDragging: true,
        language: 'es',
        createMarker: () => { return null; },
        lineOptions: {
          styles: [{ color: 'blue', opacity: 1, weight: 5 }]
        },
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
        summaryTemplate: '<div></div>',
        collapsible: true,
        autoRoute: true
      }).addTo(this.map);
    } catch (error) {
      console.error('Error obteniendo ubicación', error);
    }

    this.toggleInstructions(false);
  }

  toggleInstructions(visible: boolean) {
    this.instructionsVisible = visible;
    const routeInstructions = document.getElementsByClassName('leaflet-routing-container')[0];
    if (routeInstructions) {
      routeInstructions.setAttribute('style', `display: ${this.instructionsVisible ? 'block' : 'none'}`);
    }
  }

  onToggleInstructions() {
    this.toggleInstructions(!this.instructionsVisible);
  }
}
