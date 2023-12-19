import { Injectable } from '@nestjs/common';
import { CreateNotifDto } from './dto/create-notif.dto';
import { UpdateNotifDto } from './dto/update-notif.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notifs } from './schema/notifs.schema';
import axios from 'axios';
import { Candidate } from 'src/candidate/schema/candidate.schema';

@Injectable()
export class NotifsService {
  constructor(
    @InjectModel('Notifs') private readonly notificationModel: Model<Notifs>,
    @InjectModel('Candidate') private readonly candidateModel: Model<Candidate>,
  ) {}

  async getNotificationsByPhone(phone: string): Promise<Notifs[]> {
    try {
      // Assuming you have a field named 'candidate.phone' in the NotificationSchema
      const notifications = await this.notificationModel
        .find({ 'candidate.phone': phone })
        .exec();
      return notifications;
    } catch (error) {
      // Handle any errors that may occur during the process
      throw error;
    }
  }

  async markNotificationAsRead(notificationId: string): Promise<Notifs> {
    try {
      const notification = await this.notificationModel
        .findById(notificationId)
        .exec();

      if (!notification) {
        // Handle the case when the notification with the specified ID is not found.
        // You may want to throw an exception or handle it based on your use case.
        throw new Error(`Notification with id ${notificationId} not found`);
      }

      // Update the 'isRead' property to true
      notification.isRead = true;

      // Save the updated notification document
      await notification.save();

      return notification;
    } catch (error) {
      // Handle any errors that may occur during the process
      throw error;
    }
  }

  async sendNotificationToCandidate(phone: string): Promise<any> {
    try {
      // Fetch the FCM token for the candidate with the given phone number
      const candidate = await this.candidateModel.findOne({ phone }).exec();

      if (
        !candidate ||
        !candidate.fcmToken ||
        candidate.fcmToken.length === 0
      ) {
        throw new Error(
          `Candidate with phone ${phone} not found or does not have an FCM token`,
        );
      }

      // Assuming a candidate may have multiple FCM tokens, you can choose one or send to all
      const fcmTokens = candidate.fcmToken;

      // Make an Axios call to send the notification to each FCM token
      const axiosConfig = {
        headers: {
          Authorization:
            'key=AAAA-yJ7rnA:APA91bEV7j9URzOS83Y34lHNfnjSuMpamncmfAkE4AaxRm73bAR2yyogg71hWtp2WhfhG3G9WlONn75w_nnPX9PcWGcAbtZHEPunztQ-i0bIrDCMYyjXLDwgFN453tSgwrZwkBbLGH_c',
          'Content-Type': 'application/json',
        },
      };

      const axiosRequests = fcmTokens.map((fcmToken) => {
        const axiosData = {
          to: fcmToken,
          priority: 'high',
          mutable_content: true,
          notification: {
            badge: 42,
            title: 'We have found jobs !!',
            body: 'Hurray !!',
          },
          data: {
            content: {
              id: 10,
              badge: 42,
              channelKey: 'JOB_ALERTS',
            },
            actionButtons: [
              {
                key: 'ACCEPT',
                label: 'Accept Call',
                autoDismissible: true,
              },
              {
                key: 'DISMISS',
                label: 'Dismiss',
                actionType: 'DismissAction',
                isDangerousOption: true,
                autoDismissible: true,
              },
            ],
          },
        };

        const res = axios.post(
          'https://fcm.googleapis.com/fcm/send',
          axiosData,
          axiosConfig,
        );
        return res;
      });

      // Wait for all Axios requests to complete
      const responses = await Promise.all(axiosRequests);

      // You can handle the responses as needed
      console.log(responses);

      // You can return a success message or handle it as needed
      return { message: 'Notification sent successfully' };
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all notifs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notif`;
  }

  update(id: number, updateNotifDto: UpdateNotifDto) {
    return `This action updates a #${id} notif`;
  }

  remove(id: number) {
    return `This action removes a #${id} notif`;
  }
}
