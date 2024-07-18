import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Locations } from '../types/Locations.interface';
import { Location } from '../types/Location.interface';

// Serviço responsável por administrar os filtros das localizações
@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  private apiUrl: string = 'https://test-frontend-developer.s3.amazonaws.com/data/locations.json'

  // Listas para a filtragem das localizações
  private allLocations: Location[] = []
  private filteredLocations: Location[] = []

  // Observer utilizado para fazer o stream de dados entre os componentes que necessitam
  private locationsSubject: BehaviorSubject<Location[]> = new BehaviorSubject<Location[]>([])
  locations: Observable<Location[]> = this.locationsSubject.asObservable()

  // Construtor realizando o request, armazenamento
  constructor(private httpClient: HttpClient) {
    this.httpClient.get<Locations>(this.apiUrl).subscribe((data) => {
      this.allLocations = data.locations

      this.locationsSubject.next(this.allLocations)
    })
  }

  getLocations(hour: string, openSaturday: boolean, openMonday: boolean, showClosed: boolean): void {
    this.filteredLocations = this.isShowClosed(showClosed)
    this.filteredLocations = this.isOpenSaturday(openSaturday, hour)
    this.filteredLocations = this.isOpenMonday(openMonday, hour)
    this.filteredLocations = this.isOpen(hour)

    this.locationsSubject.next(this.filteredLocations)
  }

  private isShowClosed(showClosed: boolean): Location[] {
    return showClosed ? this.allLocations : this.allLocations.filter(location => location.opened == true)
  }

  private isOpenSaturday(openSaturday: boolean, hour: string): Location[] {
    if(openSaturday) {
      return this.filteredLocations.filter(location => {
        if(location.schedules) {
          return location.schedules.filter(week => {
            if ((week.weekdays == 'Sáb.') && (week.hour !== 'Fechada')) {
              // Caso não seja requisitado filtro por hora, já termina o filtro por aqui
              if(!Boolean(hour)) return true

              // Dados de abertura e fechamento de determinada localização
              let openAt = Number(week.hour.slice(0, 2))
              let closeAt = Number(week.hour.slice(-3, -1))

              // Inicializa as váriaveis para armazenarem o filtro requisitado no formulário
              let openRequired = 0
              let closeRequired = 0

              switch (hour) {
                case 'morning':
                  openRequired = 6
                  closeRequired = 12
                  break
                case 'afternoon':
                  openRequired = 12
                  closeRequired = 18
                  break
                case 'evening':
                  openRequired = 18
                  closeRequired = 23
                  break
              }

              // Verifica se a academia fecha antes da abertura requerida e se abre antes do fechamento requerido
              return closeAt > openRequired && openAt < closeRequired
            }

            return false
          }).length > 0
        }

        return false
      })
    }

    return this.filteredLocations
  }

  private isOpenMonday(openMonday: boolean, hour: string): Location[] {
    if(openMonday) {
      return this.filteredLocations.filter(location => {
        if(location.schedules) {

          return location.schedules.filter(week => {
            if ((week.weekdays == 'Dom.') && (week.hour !== 'Fechada')) {
              // Caso não seja requisitado filtro por hora, já termina o filtro por aqui
              if(!Boolean(hour)) return true

              // Dados de abertura e fechamento de determinada localização
              let openAt = Number(week.hour.slice(0, 2))
              let closeAt = Number(week.hour.slice(-3, -1))

              // Inicializa as váriaveis para armazenarem o filtro requisitado no formulário
              let openRequired = 0
              let closeRequired = 0

              switch (hour) {
                case 'morning':
                  openRequired = 6
                  closeRequired = 12
                  break
                case 'afternoon':
                  openRequired = 12
                  closeRequired = 18
                  break
                case 'evening':
                  openRequired = 18
                  closeRequired = 23
                  break
              }

              // Verifica se a academia fecha antes da abertura requerida e se abre antes do fechamento requerido
              return closeAt > openRequired && openAt < closeRequired
            }

            return false
          }).length > 0
        }

        return false
      })
    }

    return this.filteredLocations
  }

  private isOpen(hour: string): Location[] {
    if(!Boolean(hour)) return this.filteredLocations

    return this.filteredLocations.filter(location => {
      if(location.schedules) {
        return location.schedules.filter(week => {
          if ((week.weekdays == 'Seg. à Sex.') && (week.hour !== 'Fechada')) {
            // Dados de abertura e fechamento de determinada localização
            let openAt = Number(week.hour.slice(0, 2))
            let closeAt = Number(week.hour.slice(-3, -1))

            // Inicializa as váriaveis para armazenarem o filtro requisitado no formulário
            let openRequired = 0
            let closeRequired = 0

            switch (hour) {
              case 'morning':
                openRequired = 6
                closeRequired = 12
                break
              case 'afternoon':
                openRequired = 12
                closeRequired = 18
                break
              case 'evening':
                openRequired = 18
                closeRequired = 23
                break
            }

            // Verifica se a academia fecha antes da abertura requerida e se abre antes do fechamento requerido
            return closeAt > openRequired && openAt < closeRequired
          }

          return false
        }).length > 0
      }

      return false
    })
  }

}
