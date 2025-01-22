export interface Database {
    events: {
      id: string;
      event_name: string;
      event_space: string;
      city: string;
      start_time: string;
      end_time: Date;
      date: Date;
      ticket_price: number;
      max_attendance: number;
    };
  }