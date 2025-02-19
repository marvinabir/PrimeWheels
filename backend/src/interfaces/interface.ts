export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  ORGANIZER = "ORGANIZER",
}

export enum CarStatus {
  AVAILABLE = "AVAILABLE",
  BOOKED = "BOOKED",
  INACTIVE = "INACTIVE",
}

export enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELED = "CANCELED",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  SUCCESSFUL = "SUCCESSFUL",
  FAILED = "FAILED",
}

export enum PaymentMethod {
  MPESA = "MPESA",
  CARD = "CARD",
  PAYPAL = "PAYPAL",
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  bookings?: Booking[];
  reviews?: Review[];
  notifications?: Notification[];
}

export interface Car {
  id: string;
  name: string;
  brand: string;
  registrationNumber: string;
  status: CarStatus;
  pricePerDay: number;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  bookings?: Booking[];
  softDeleted: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  carId: string;
  startDate: Date;
  endDate: Date;
  totalAmount: number;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
  car?: Car;
  ticket?: Ticket;
  payment?: Payment;
}

export interface Ticket {
  id: string;
  bookingId: string;
  uniqueToken: string;
  createdAt: Date;
  userDetails: string;
  carDetails: string;
  bookingDetails: string;
  booking?: Booking;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  status: PaymentStatus;
  method: PaymentMethod;
  transactionId?: string;
  createdAt: Date;
  booking?: Booking;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  imageUrl?: string;
  organizerContact: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Review {
  id: string;
  userId: string;
  carId: string;
  content: string;
  rating: number;
  createdAt: Date;
  user?: User;
  car?: Car;
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  read: boolean;
  createdAt: Date;
  user?: User;
}
