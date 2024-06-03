<template>
    <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ $route.params.id }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ $route.params.id }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">

        <ion-grid :fixed="true">
            <ion-row>
            <ion-col></ion-col>
            <ion-col>

                    
            </ion-col>
            <ion-col></ion-col>
            </ion-row>
            <ion-row>
                    <ion-input type="password" label="Password" value="NeverGonnaGiveYouUp">
                        <ion-input-password-toggle slot="end"></ion-input-password-toggle>
                    </ion-input>
                </ion-row>
                <ion-row>
                    <ion-input type="password" label="Password" value="NeverGonnaGiveYouUp">
                        <ion-input-password-toggle slot="end"></ion-input-password-toggle>
                    </ion-input>
                </ion-row>
            <ion-button expand="block">Ingresar</ion-button>
        </ion-grid>

            
      </div>
    </ion-content>
  </ion-page>
</template>
  
<script setup lang="ts">
import { IonInput, 
    IonCol, 
    IonGrid, 
    IonRow, 
    IonPage,  IonButtons } from '@ionic/vue';
</script>