// api/appointment/appointment-scheduler.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { In, LessThan, Repository } from 'typeorm';
import { AppointmentEntity } from './appointment.entity';
import { AppointmentStatus } from './appointment.constant';

@Injectable()
export class AppointmentSchedulerService {
  private readonly logger = new Logger(AppointmentSchedulerService.name);
  private isRunning = false;

  constructor(
    @InjectRepository(AppointmentEntity)
    private readonly appointmentRepo: Repository<AppointmentEntity>,
  ) {}

  /**
   * Check for expired appointments every 5 minutes
   */
  @Cron('0 */5 * * * *') // Every 5 minutes
  async handleExpiredAppointments() {
    if (this.isRunning) {
      this.logger.warn(
        'Expired appointment check already running, skipping...',
      );
      return;
    }

    this.isRunning = true;
    const startTime = Date.now();

    try {
      this.logger.log('Starting expired appointments check...');

      const now = new Date();

      // Find all pending or confirmed appointments that are past their time
      const expiredAppointments = await this.appointmentRepo.find({
        where: {
          appointmentTime: LessThan(now),
          status: AppointmentStatus.PENDING, // Only cancel pending appointments
        },
      });

      if (expiredAppointments.length === 0) {
        this.logger.log('No expired appointments found');
        return;
      }

      // Update all expired appointments to cancelled
      const updateResult = await this.appointmentRepo.update(
        {
          appointmentTime: LessThan(now),
          status: AppointmentStatus.PENDING,
        },
        {
          status: AppointmentStatus.CANCELLED,
          updatedAt: now,
        },
      );

      const duration = Date.now() - startTime;
      this.logger.log(
        `Expired appointments check completed. Cancelled ${updateResult.affected} appointments in ${duration}ms`,
      );

      // Log details of cancelled appointments
      if (expiredAppointments.length > 0) {
        this.logger.log(
          `Cancelled appointment IDs: ${expiredAppointments.map((apt) => apt.id).join(', ')}`,
        );
      }
    } catch (error) {
      this.logger.error(
        'Failed to process expired appointments:',
        error.stack || error.message,
      );
    } finally {
      this.isRunning = false;
    }
  }

  /**
   * Send reminders for upcoming appointments (optional)
   * Run every hour during business hours
   */
  @Cron('0 0 8-18 * * *') // Every hour from 8 AM to 6 PM
  async handleUpcomingAppointmentReminders() {
    try {
      this.logger.log('Checking for upcoming appointment reminders...');

      const now = new Date();
      const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000); // 1 hour from now
      const twoHoursLater = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2 hours from now

      // Find appointments in the next 1-2 hours
      const upcomingAppointments = await this.appointmentRepo
        .createQueryBuilder('appointment')
        .leftJoinAndSelect('appointment.user', 'user')
        .leftJoinAndSelect('appointment.pet', 'pet')
        .where('appointment.appointmentTime BETWEEN :start AND :end', {
          start: oneHourLater,
          end: twoHoursLater,
        })
        .andWhere('appointment.status = :status', {
          status: AppointmentStatus.CONFIRMED,
        })
        .getMany();

      if (upcomingAppointments.length > 0) {
        this.logger.log(
          `Found ${upcomingAppointments.length} upcoming appointments for reminders`,
        );

        // TODO: Send email/SMS reminders here
        // await this.notificationService.sendAppointmentReminders(upcomingAppointments);
      }
    } catch (error) {
      this.logger.error(
        'Failed to process appointment reminders:',
        error.stack || error.message,
      );
    }
  }

  /**
   * Manual trigger for expired appointments (useful for testing)
   */
  async manualExpiredAppointmentsCheck(): Promise<{
    cancelledCount: number;
    appointments: number[];
  }> {
    this.logger.log('Starting manual expired appointments check...');

    try {
      const now = new Date();

      const expiredAppointments = await this.appointmentRepo.find({
        where: {
          appointmentTime: LessThan(now),
          status: AppointmentStatus.PENDING,
        },
        select: ['id', 'appointmentTime', 'petId', 'userId'],
      });

      if (expiredAppointments.length === 0) {
        return { cancelledCount: 0, appointments: [] };
      }

      const appointmentIds = expiredAppointments.map((apt) => apt.id);

      const updateResult = await this.appointmentRepo.update(
        { id: In(appointmentIds) },
        {
          status: AppointmentStatus.CANCELLED,
          updatedAt: now,
        },
      );

      this.logger.log(
        `Manual check completed. Cancelled ${updateResult.affected} appointments`,
      );

      return {
        cancelledCount: updateResult.affected || 0,
        appointments: appointmentIds,
      };
    } catch (error) {
      this.logger.error(
        'Manual expired appointments check failed:',
        error.stack || error.message,
      );
      throw error;
    }
  }

  /**
   * Get scheduler status
   */
  getStatus() {
    return {
      isRunning: this.isRunning,
      nextExpiredCheck: 'Every 5 minutes',
      nextReminderCheck: 'Every hour (8 AM - 6 PM)',
    };
  }
}
