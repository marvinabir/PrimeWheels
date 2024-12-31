export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "user" | "admin" | "organizer"; // Enum for roles
  createdAt: Date;
  updatedAt: Date;
  bookings?: Booking[]; // Optional relation to bookings
  reviews?: Review[]; // Optional relation to reviews
  notifications?: Notification[]; // Optional relation to notifications
  events?: Event[]; // Optional relation for organizer events
}

export interface Car {
  id: string;
  name: string;
  brand: string;
  registrationNumber: string;
  status: "available" | "booked" | "inactive"; // Enum for car status
  pricePerDay: number;
  imageUrl?: string; // Optional field for the car's image URL
  createdAt: Date;
  updatedAt: Date;
  bookings?: Booking[]; // Optional relation to bookings
  softDeleted: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  carId: string;
  startDate: Date;
  endDate: Date;
  totalAmount: number;
  status: "pending" | "confirmed" | "canceled"; // Enum for booking status
  createdAt: Date;
  updatedAt: Date;
  user?: User; // Optional relation to the user who made the booking
  car?: Car; // Optional relation to the booked car
  ticket?: Ticket; // Optional relation to the booking's ticket
  payment?: Payment; // Optional relation to the booking's payment
}

export interface Ticket {
  id: string;
  bookingId: string;
  uniqueToken: string; // Unique token for the ticket
  createdAt: Date;
  userDetails: string; // JSON representation of user details
  carDetails: string; // JSON representation of car details
  bookingDetails: string; // JSON representation of booking details
  booking?: Booking; // Optional relation to the booking
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  status: "pending" | "successful" | "failed"; // Enum for payment status
  method: "mpesa" | string; // Enum for payment methods, default to Mpesa
  transactionId?: string; // Optional transaction ID
  createdAt: Date;
  booking?: Booking; // Optional relation to the booking
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  imageUrl?: string; // Optional field for the event's image URL
  organizerContact: string;
  createdAt: Date;
  updatedAt: Date;
  organizerId: string;
  organizer?: User; // Optional relation to the organizer
}

export interface Review {
  id: string;
  userId: string;
  carId: string;
  content: string;
  rating: number; // Rating out of 5
  createdAt: Date;
  user?: User; // Optional relation to the user who left the review
  car?: Car; // Optional relation to the reviewed car
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  read: boolean; // Whether the notification has been read
  createdAt: Date;
  user?: User; // Optional relation to the user receiving the notification
}





// export interface User {
//   id: string; // UUID string
//   name: string;
//   email: string;
//   password: string;
//   phone?: string;
//   profilePicture?: string;
//   role: Role;
//   bookings: Booking[];
//   reviews: Review[];
//   payments: Payment[];
//   resetCode?: string; // For password reset
//   createdAt: Date;
//   updatedAt: Date;
// }


  

//   export interface Bike {
//     id: string; // UUID string
//     model: string;
//     status?: BikeStatus;
//     image?: string; 
//     bookings: Booking[];
//     createdAt: Date;
//     updatedAt: Date;
//   }
  


//   export interface Event {
//     id: string; // UUID string
//     title: string;
//     description: string;
//     date: string;
//     time: string;
//     location: string;
//     capacity: number;
//     image?: string; // Optional event image
//     bookings: Booking[];
//     reviews: Review[];
//     createdAt: Date;
//     updatedAt: Date;
//   }

  

//   export interface Booking {
//     id: string; // UUID string
//     userId: string;
//     user: User;
//     bikeId?: string; // Optional bike booking
//     bike?: Bike;
//     eventId?: number; // Optional event booking
//     event?: Event;
//     status: BookingStatus;
//     ticket?: Ticket; // Optional ticket
//     createdAt: Date;
//     updatedAt: Date;
//   }

  

//   export interface Ticket {
//     id: string;
//     bookingId: string;
//     booking: Booking;
//     ticketNumber: string;
//     date: string;
//     details: string; // Event/bike details
//     createdAt: Date;
//   }

  

//   export interface Payment {
//     id: string;
//     userId: string;
//     user: User;
//     amount: number;
//     status: PaymentStatus;
//     invoiceId?: string; // For IntaSend invoice ID tracking
//     apiRef?: string;    // Optional reference for your API tracking
//     createdAt: Date;
//     updatedAt: Date;
//   }
  



//   export interface Review {
//     id: string;
//     userId: string;
//     user: User;
//     eventId: string;
//     event: Event;
//     rating: number; // Rating from 1 to 5
//     comment?: string; // Optional comment
//     createdAt: Date;
//     updatedAt: Date;
//   }  
  


//   export interface Notification {
//     id: string;
//     userId: string;
//     user: User;
//     content: string;
//     createdAt: Date;
//   }

  

  
//   export enum Role {
//     USER = 'USER',
//     ADMIN = 'ADMIN'
//   }
  
//   export enum BikeStatus {
//     AVAILABLE = 'AVAILABLE',
//     BOOKED = 'BOOKED'
//   }
  
//   export enum BookingStatus {
//     PENDING = 'PENDING',
//     CONFIRMED = 'CONFIRMED',
//     CANCELLED = 'CANCELLED'
//   }
  
//   export enum PaymentStatus {
//     PENDING = 'PENDING',
//     COMPLETED = 'COMPLETED',
//     FAILED = 'FAILED'
//   }
  
