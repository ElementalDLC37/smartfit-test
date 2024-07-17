import { Schedule } from './../types/Schedule.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Locations } from '../types/Locations.interface';
import { Location } from '../types/Location.interface';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  private apiUrl: string = "https://test-frontend-developer.s3.amazonaws.com/data/locations.json";

  private current_country_id: number = 0;
  private locationsComplete: Location[] = [];
  private locationsFiltered: Location[] = [];

  private rangeHoursOfDayFilter: number[] = [];
  private filterByEndWeekDays: string[] = [];

  private locationsSubject: BehaviorSubject<Location[]> = new BehaviorSubject<Location[]>([])
  locations: Observable<Location[]> = this.locationsSubject.asObservable();

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<Locations>(this.apiUrl).subscribe(data => {
      this.current_country_id = data.current_country_id;
      this.locationsComplete = data.locations;

      this.locationsSubject.next(data.locations)
    })
  }

  getLocations(hour: string, openSaturday: boolean, openMonday: boolean, showClosed: boolean): void {
    switch(hour) {
      case 'morning':
        this.rangeHoursOfDayFilter[0] = 6
        this.rangeHoursOfDayFilter[1] = 12
        break
      case 'afternoon':
        this.rangeHoursOfDayFilter[0] = 12
        this.rangeHoursOfDayFilter[1] = 18
        break
      case 'evening':
        this.rangeHoursOfDayFilter[0] = 18
        this.rangeHoursOfDayFilter[1] = 23
        break
      default:
        this.rangeHoursOfDayFilter.pop()
    }

    this.filterByEndWeekDays.pop()
    this.filterByEndWeekDays.pop()

    if(openSaturday) {
      this.filterByEndWeekDays.push("Sáb.")
    }

    if (openMonday) {
      this.filterByEndWeekDays.push("Dom.")
    }

    this.locationsFiltered = this.isShowClosed(showClosed, this.locationsComplete);
    this.locationsFiltered = this.isOpenEndWeek(showClosed, openSaturday, openMonday, this.locationsFiltered);
    this.locationsFiltered = this.isHour(showClosed, openSaturday, openMonday, this.locationsFiltered);

    this.locationsSubject.next(this.locationsFiltered)
  }

  private isShowClosed(showClosed: boolean, locations: Location[]): Location[] {
    if(!showClosed) {
      return locations.filter(location => location.opened == true)
    } else {
      return locations
    }
  }

  private isOpenEndWeek(showClosed: boolean, openSaturday: boolean, openMonday: boolean, locations: Location[]): Location[] {
    return locations.filter(location => {
      if(location.schedules) {
        let indexWeekday = ''
        return location.schedules.filter(week => {
          if(week.weekdays === 'Sáb.' || week.weekdays === 'Dom.') {
            if(!(week.hour === 'Fechada')) {
              if(this.filterByEndWeekDays[0] === week.weekdays) {
                if(!(indexWeekday === week.weekdays)) {
                  indexWeekday = week.weekdays
                  return true
                }
              }
            }
          }
          return false
        }).length >= (Number(openSaturday) + Number(openMonday))
      } else {
        if(showClosed) {
          return true
        }
      }
      return false
    })
  }

  private isHour(showClosed: boolean, openSaturday: boolean, openMonday: boolean, locations: Location[]): Location[] {
    if((this.rangeHoursOfDayFilter.length > 1)) {
      if(openSaturday || openMonday) {
        locations.filter(location => {
          if(location.schedules) {
            let ifDouble = false
            let ifSingle = false

            return location.schedules.filter(week => {
              if(!(week.hour == "Fechada") && ((week.weekdays === "Sáb.") || (week.weekdays === "Dom."))) {
                let openAt = Number(week.hour.slice(0, 2))
                let closeAt = Number(week.hour.slice(-3, -1))

                if((week.weekdays === this.filterByEndWeekDays[1])) {
                  ifDouble = (!(closeAt <= this.rangeHoursOfDayFilter[0]) && !(this.rangeHoursOfDayFilter[1] <= openAt))
                }

                if((week.weekdays === this.filterByEndWeekDays[0])) {
                  ifSingle = (!(closeAt <= this.rangeHoursOfDayFilter[0]) && !(this.rangeHoursOfDayFilter[1] <= openAt))
                }

                switch(this.filterByEndWeekDays.length) {
                  case 1:
                    return ifSingle
                  case 2:
                    return ifSingle || ifDouble
                }
              }

              return false
            }).length > 0
          }

          return false
        })
      } else {
        return locations.filter(location => {
          if(location.schedules) {
            return location.schedules.filter(week => {
              if(week.hour == "Fechada") return false

              let openAt = Number(week.hour.slice(0, 2))

              return !(this.rangeHoursOfDayFilter[1] <= openAt)

            }).length > 0
          } else {
            if(showClosed) {
              return true
            }
          }
          return false
        })
      }
    }
    return locations;
  }
}
