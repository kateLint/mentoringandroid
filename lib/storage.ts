import fs from "fs";
import path from "path";
import { Offer, Booking, TimeSlot, MentorProfile, Testimonial } from "./types";
import {
  defaultOffer,
  defaultMentor,
  defaultTestimonials,
  generateDefaultSlots,
} from "./data/default-content";

const DATA_DIR = path.join(process.cwd(), "data");
const OFFER_FILE = path.join(DATA_DIR, "offer.json");
const BOOKINGS_FILE = path.join(DATA_DIR, "bookings.json");
const SLOTS_FILE = path.join(DATA_DIR, "slots.json");
const MENTOR_FILE = path.join(DATA_DIR, "mentor.json");

function ensureDirectory() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (err) {
    console.error("Failed to create data dir:", err);
  }
}

export function getOffer(): Offer {
  ensureDirectory();
  try {
    if (fs.existsSync(OFFER_FILE)) {
      const data = fs.readFileSync(OFFER_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Error reading offer:", e);
  }
  return defaultOffer;
}

export function saveOffer(offer: Offer): Offer {
  ensureDirectory();
  try {
    fs.writeFileSync(OFFER_FILE, JSON.stringify(offer, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving offer:", e);
  }
  return offer;
}

export function getMentor(): MentorProfile {
  ensureDirectory();
  try {
    if (fs.existsSync(MENTOR_FILE)) {
      const data = fs.readFileSync(MENTOR_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Error reading mentor:", e);
  }
  return defaultMentor;
}

export function saveMentor(mentor: MentorProfile): MentorProfile {
  ensureDirectory();
  try {
    fs.writeFileSync(MENTOR_FILE, JSON.stringify(mentor, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving mentor:", e);
  }
  return mentor;
}

export function getSlots(): TimeSlot[] {
  ensureDirectory();
  try {
    if (fs.existsSync(SLOTS_FILE)) {
      const data = fs.readFileSync(SLOTS_FILE, "utf-8");
      return JSON.parse(data);
    }
    const initialSlots = generateDefaultSlots();
    fs.writeFileSync(SLOTS_FILE, JSON.stringify(initialSlots, null, 2), "utf-8");
    return initialSlots;
  } catch (e) {
    console.error("Error reading slots:", e);
    return generateDefaultSlots();
  }
}

export function bookSlot(slotId: string): boolean {
  ensureDirectory();
  try {
    const slots = getSlots();
    const index = slots.findIndex((s) => s.id === slotId);
    if (index !== -1 && slots[index].isAvailable) {
      slots[index].isAvailable = false;
      fs.writeFileSync(SLOTS_FILE, JSON.stringify(slots, null, 2), "utf-8");
      return true;
    }
  } catch (e) {
    console.error("Error booking slot:", e);
  }
  return false;
}

export function getBookings(): Booking[] {
  ensureDirectory();
  try {
    if (fs.existsSync(BOOKINGS_FILE)) {
      const data = fs.readFileSync(BOOKINGS_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Error reading bookings:", e);
  }
  return [];
}

export function saveBooking(booking: Booking): Booking {
  ensureDirectory();
  try {
    const bookings = getBookings();
    bookings.unshift(booking);
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving booking:", e);
  }
  return booking;
}

export function updateBookingStatus(id: string, status: Booking["status"]): boolean {
  ensureDirectory();
  try {
    const bookings = getBookings();
    const item = bookings.find((b) => b.id === id);
    if (item) {
      item.status = status;
      fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), "utf-8");
      return true;
    }
  } catch (e) {
    console.error("Error updating booking status:", e);
  }
  return false;
}
