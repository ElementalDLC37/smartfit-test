import { Schedule } from "./Schedule.interface";

export interface Location {
  id: number,
  title: string,
  content: string,
  opened: boolean,
  mask: string,
  speaker: string,
  towel: string,
  fountain: string,
  locker_room: string,
  schedules: Schedule[]
}
