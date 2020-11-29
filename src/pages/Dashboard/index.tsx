import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useAuth } from '../../hooks/auth'
import { isToday, format as formatDate, isAfter } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import logoImage from '../../assets/logo.svg'

import { FiClock, FiPower } from 'react-icons/fi'

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Logout,
  Content,
  Schedule,
  Section,
  NextAppointment,
  Appointment,
  CalendarContainer,
  Calendar
} from './styles'
import { DayModifiers } from 'react-day-picker'
import { api } from '../../services/api'
import { parseISO } from 'date-fns/esm'
import { Link } from 'react-router-dom'
import Image from '../../components/Image'

interface MonthAvailabilityItem {
  day: number,
  available: boolean
}

interface Appointment {
  id: string,
  date: string,
  hour: string,
  customer: {
    id: string,
    name: string,
    avatar_url: string
  }

}

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])

  const { user, signOut } = useAuth()

  const handleDateChange = useCallback(
    (day: Date, modifiers: DayModifiers) => {
      if (modifiers.available && !modifiers.disabled) {
        setSelectedDate(day)
      }
    }, []
  )

  const handleMonthChange = useCallback(
    (month: Date) => {
      setCurrentMonth(month)
    }, []
  )

  useEffect(
    function loadProvidersMonthAvailability () {
      const params = {
        year: currentMonth.getFullYear(),
        month: 1 + currentMonth.getMonth()
      }

      api.get<MonthAvailabilityItem[]>(`providers/${user.id}/month-availability`, { params }).then(
        ({ data: availability }) => {
          setMonthAvailability(availability)
        }
      )
    }, [currentMonth, user.id]
  )

  useEffect(
    function loadProviderAppointments () {
      const params = {
        year: selectedDate.getFullYear(),
        month: 1 + selectedDate.getMonth(),
        day: selectedDate.getDate()
      }

      api.get<Appointment[]>('appointments/me', { params }).then(
        ({ data: appointments }) => {
          appointments = appointments.map(appointment => (
            { ...appointment, hour: formatDate(parseISO(appointment.date), 'HH:mm') }
          ))

          setAppointments(appointments)
        }
      )
    }, [selectedDate]
  )

  const disabledDays = useMemo(
    () => {
      return monthAvailability
        .filter(monthDay => !monthDay.available)
        .map(monthDay =>
          new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth(),
            monthDay.day
          )
        )
    }
    , [currentMonth, monthAvailability]
  )

  const selectedWeekday = useMemo(
    () => {
      return formatDate(selectedDate, 'cccc', { locale: ptBR })
    }, [selectedDate]
  )

  const selectedDateAsText = useMemo(
    () => {
      return formatDate(selectedDate, "'Dia' dd 'de' MMMM", { locale: ptBR })
    }, [selectedDate]
  )

  const morningAppointments = useMemo(
    () => {
      return appointments.filter(
        appointment => parseISO(appointment.date).getHours() < 12
      )
    }, [appointments]
  )

  const afternoonAppointments = useMemo(
    () => {
      return appointments.filter(
        appointment => parseISO(appointment.date).getHours() >= 12
      )
    }, [appointments]
  )

  const nextAppointment = useMemo(
    () => {
      return appointments.find(
        appointment => isAfter(parseISO(appointment.date), new Date())
      )
    }, [appointments]
  )

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img className="logo" src={logoImage} alt="GoBarber" />
          <Profile>
            <Link to="/profile">
              <Image className="profile__avatar" src={user.avatar_url} alt={user.name}/>
            </Link>
            <div className="profile__info">
              <span className="profile__greeting">
                Bem Vindo,
              </span>
              <Link to="/profile">
                <strong className="profile__user">
                  {user.name}
                </strong>
              </Link>
            </div>
          </Profile>

          <Logout
            type="button"
            onClick={signOut}
          >
            <FiPower />
          </Logout>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1 className="schedule__heading">
            Horários agendados
          </h1>

          <p className="schedule__subheading">
            {isToday(selectedDate) && (
              <span>
                Hoje
              </span>
            )}
            <span>
              {selectedWeekday}
            </span>
            <span>
              {selectedDateAsText}
            </span>
          </p>

          {nextAppointment && (
            <NextAppointment>
              <strong className="next-appointment__heading">
                Agendamento à seguir
              </strong>

              <div className="next-appointment__content">
                <Image
                  className="next-appointment__avatar"
                  src={nextAppointment.customer.avatar_url}
                  alt={nextAppointment.customer.name}
                />

                <strong className="next-appointment__customer">
                  {nextAppointment.customer.name}
                </strong>

                <span className="next-appointment__time">
                  <FiClock />
                  {nextAppointment.hour}
                </span>
              </div>
            </NextAppointment>
          )}

          <Section>
            <strong className="section__heading">
              Manhã
            </strong>

            {morningAppointments.length === 0 && (
              <p className="section__empty-message">
                Nenhum agendamento para este período
              </p>
            )}

            {morningAppointments.map(appointment => (
              <Appointment key={appointment.id}>
                <span className="appointment__time">
                  <FiClock />
                  {appointment.hour}
                </span>

                <div className="appointment__content">
                  <Image
                    className="appointment__avatar"
                    src={appointment.customer.avatar_url}
                    alt={appointment.customer.name}
                  />

                  <strong className="appointment__customer">
                    {appointment.customer.name}
                  </strong>
                </div>
              </Appointment>
            ))}
          </Section>

          <Section>
            <strong className="section__heading">
              Tarde
            </strong>

            {afternoonAppointments.length === 0 && (
              <p className="section__empty-message">
                Nenhum agendamento para este período
              </p>
            )}

            {afternoonAppointments.map(appointment => (
              <Appointment key={appointment.id}>
                <span className="appointment__time">
                  <FiClock />
                  {appointment.hour}
                </span>

                <div className="appointment__content">
                  <Image
                    className="appointment__avatar"
                    src={appointment.customer.avatar_url}
                    alt={appointment.customer.name}
                  />

                  <strong className="appointment__customer">
                    {appointment.customer.name}
                  </strong>
                </div>
              </Appointment>
            ))}
          </Section>

        </Schedule>

        <CalendarContainer>
          <Calendar
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            modifiers={{ available: { daysOfWeek: [1, 2, 3, 4, 5] } }}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            onMonthChange={handleMonthChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro'
            ]}
          >

          </Calendar>
        </CalendarContainer>

      </Content>
    </Container>
  )
}

export default Dashboard
