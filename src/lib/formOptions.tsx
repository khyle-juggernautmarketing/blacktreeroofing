'use client'

import type { LucideIcon } from 'lucide-react'
import {
  Building2,
  CalendarClock,
  ClipboardCheck,
  CloudLightning,
  Home,
  Layers,
  Search,
  Warehouse,
  Wrench,
  Zap,
} from 'lucide-react'
import type { PropertyType, Service, Timeline } from '@/types/lead'

export type FormOption<T extends string> = {
  value: T
  label: string
  icon: LucideIcon
}

export const SERVICE_OPTIONS: FormOption<Service>[] = [
  { value: 'Roof Repair', label: 'Roof Repair', icon: Wrench },
  { value: 'Roof Replacement', label: 'Roof Replacement', icon: Layers },
  { value: 'Roof Inspection', label: 'Roof Inspection', icon: ClipboardCheck },
  { value: 'Storm Damage', label: 'Storm Damage', icon: CloudLightning },
]

export const PROPERTY_OPTIONS: FormOption<PropertyType>[] = [
  { value: 'Single Family Home', label: 'Single Family Home', icon: Home },
  { value: 'Townhouse', label: 'Townhouse', icon: Building2 },
  { value: 'Commercial', label: 'Commercial', icon: Warehouse },
]

export const TIMELINE_OPTIONS: FormOption<Timeline>[] = [
  { value: 'ASAP', label: 'ASAP', icon: Zap },
  { value: 'Within 1–2 Weeks', label: 'Within 1–2 Weeks', icon: CalendarClock },
  { value: 'Just Researching', label: 'Just Researching', icon: Search },
]
