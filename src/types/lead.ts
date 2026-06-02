export const SERVICES = [
  'Roof Repair',
  'Roof Replacement',
  'Roof Inspection',
  'Storm Damage',
] as const

export const PROPERTY_TYPES = [
  'Single Family Home',
  'Townhouse',
  'Commercial',
] as const

export const TIMELINES = [
  'ASAP',
  'Within 1–2 Weeks',
  'Just Researching',
] as const

export type Service = (typeof SERVICES)[number]
export type PropertyType = (typeof PROPERTY_TYPES)[number]
export type Timeline = (typeof TIMELINES)[number]

export interface AppointmentSelection {
  date: string
  slotId: string
  slotLabel: string
}

export interface LeadFormData {
  service: Service | ''
  propertyType: PropertyType | ''
  timeline: Timeline | ''
  fullName: string
  email: string
  phone: string
}

export const initialLeadForm: LeadFormData = {
  service: '',
  propertyType: '',
  timeline: '',
  fullName: '',
  email: '',
  phone: '',
}
