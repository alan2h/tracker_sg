// src/app/pages/clients/clients.page.ts
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import { Geolocation } from '@capacitor/geolocation';
import { ClientService } from './clients.service';

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
  private instructionsVisible: boolean = false;

  clientData: any;

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.fetchClientData();
  }

  ngAfterViewInit() {
    this.initMap();
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
  }

  private fetchClientData() {
    this.clientService.getClientData().subscribe(data => {
      this.clientData = data;
      localStorage.setItem('customer_id', data.customer);
      this.updateMap(data.latitude, data.longitude);
    }, error => {
      console.error('Error fetching client data', error);
    });
  }

  private async initMap(): Promise<void> {
    this.map = L.map('map', {
      center: [-26.1775300, -58.1781400],
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    try {
      const position = (await Geolocation.getCurrentPosition()).coords;
      const myLocation: L.LatLngExpression = [position.latitude, position.longitude];

      const myLocationIcon = L.icon({
        iconUrl: 'assets/icon/map/gas1.svg',
        iconSize: [16, 16],
        iconAnchor: [16, 16],
        popupAnchor: [0, 10],
      });

      if (this.myLocationMarker) {
        this.map.removeLayer(this.myLocationMarker);
      }

      this.myLocationMarker = L.marker(myLocation, { icon: myLocationIcon }).addTo(this.map).bindPopup('Mi Ubicación').openPopup();

      this.toggleInstructions(false);
    } catch (error) {
      console.error('Error obteniendo ubicación', error);
    }
  }

  private updateMap(lat: string, lng: string) {
    const fixedPoint: L.LatLngExpression = [parseFloat(lat), parseFloat(lng)];
    const fixedPointIcon = L.icon({
      iconUrl: 'assets/icon/map/flag.svg',
      iconSize: [16, 16],
      iconAnchor: [16, 16],
      popupAnchor: [0, 10],
    });

    if (this.fixedPointMarker) {
      this.map.removeLayer(this.fixedPointMarker);
    }

    this.fixedPointMarker = L.marker(fixedPoint, { icon: fixedPointIcon }).addTo(this.map).bindPopup('Punto Fijo').openPopup();

    if (this.routingControl) {
      this.map.removeControl(this.routingControl);
    }

    this.routingControl = (L as any).Routing.control({
      waypoints: [
        this.myLocationMarker.getLatLng(),
        fixedPoint
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
