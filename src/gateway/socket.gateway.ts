import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Injectable } from '@nestjs/common';
import * as geolib from 'geolib';

@Injectable()
@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: any, ...args: any[]) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // Listen for location events from the mobile app
  @SubscribeMessage('locationUpdate')
  handleLocationUpdate(
    @MessageBody() location: { latitude: number; longitude: number },
  ) {
    console.log('Received location update:', location);

    // Check if the location is within the target
    if (this.isLocationWithinTarget(location.latitude, location.longitude)) {
      // Trigger an event indicating the target location is reached
      this.server.emit('targetLocationReached', {
        message: 'Target location reached!',
      });
    }
  }

  // Function to check if the location is within the target
  private isLocationWithinTarget(latitude: number, longitude: number): boolean {
    // Replace with your target latitude and longitude
    const targetLatitude = 37.7749;
    const targetLongitude = -122.4194;

    // Add your logic to determine if the location is within the target
    // For simplicity, this example uses a basic distance check
    const distance = geolib.getDistance(
      { latitude, longitude },
      { latitude: targetLatitude, longitude: targetLongitude },
    );

    return distance < 100; // Replace 100 with your desired radius in meters
  }
}
