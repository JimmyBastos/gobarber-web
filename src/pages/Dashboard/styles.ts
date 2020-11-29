import styled from 'styled-components'

import DayPicker from 'react-day-picker'
import 'react-day-picker/lib/style.css'
import { shade, darken } from 'polished'

export const Container = styled.div`

`

export const Header = styled.div`
  padding: 2rem 0;
  background-color: #28262e;
`

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  .logo {
    height: 5rem;
  }

`

export const Profile = styled.div`
  margin-left: 5rem;
  display: flex;
  align-items: center;

  a {
    text-decoration: none;
    &:hover {
      opacity: 0.75;
    }
  }

  .profile {
    &__avatar {
      border-radius: 50%;
      height: 3.5rem;
      width: 3.5rem;
    }

    &__info {
      margin-left: 1rem;
      display: flex;
      flex-direction: column;
    }

      &__message {
      color: #f4ede8;
    }

    &__user {
      color: #ff9000;
    }
  }

`

export const Logout = styled.button`
  margin-left: auto;
  background-color: transparent;
  border: 0;

  svg {
    color: #999591;
    height: 1.25rem;
    width: 1.25rem;
  }
`
export const Content = styled.main`
  max-width: 1120px;
  margin: 4rem auto;
  display: flex;
`

export const Schedule = styled.section`
  flex: 1;
  margin-right: 120px;

  .schedule {
    &__heading {
      font-size: 2rem
    }

    &__subheading {
      margin-top: .5rem;
      color: #ff9000;
      display: flex;
      align-items: center;

      span {
        display: flex;
        text-transform: capitalize;
      }

      span + span::before {
        content: "|";
        margin: 0 .5rem;
      }
    }
  }
`

export const NextAppointment = styled.div`
  margin-top: 4rem;

  .next-appointment {
    &__heading {
      color: #999591;
      font-weight: 400;
    }

    &__content {
      margin-top: 1.5rem;
      background-color: #3e3b47;
      display: flex;
      align-items: center;
      padding: 1rem 1.5rem;
      border-radius: .75rem;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        height: 80%;
        left: 0;
        top: 10%;
        width: 1px;
        background: #ff9000;
      }
    }

    &__avatar {
      width: 5rem;
      height: 5rem;
      border-radius: 50%;
    }

    &__customer {
      color: #fff;
      margin-left: 1.5rem;
    }

    &__time {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: #999591;

      svg {
        margin-right: .5rem;
        color: #ff9000;
      }
    }
  }

`

export const Appointment = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;

  .appointment {
    &__time {
      display: flex;
      align-items: center;
      color: #f4ede8;

      svg {
        margin-right: .5rem;
        color: #ff9000;
      }
    }

    &__content {
      flex: 1;
      margin-left: 1rem;
      background-color: #3e3b47;
      display: flex;
      align-items: center;
      padding: 1rem 1.5rem;
      border-radius: .75rem;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        height: 80%;
        left: 0;
        top: 10%;
        width: 1px;
        background: #ff9000;
      }
    }

    &__avatar {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 50%;
    }

    &__customer {
      color: #fff;
      margin-left: 1.5rem;
      font-size: 1.25rem;
    }
  }
`

export const Section = styled.section`
  margin-top: 3rem;

  .section {
    &__heading {
      color: #999591;
      font-size: 1.25rem;
      font-weight: 400;
      line-height: 1.5rem;
      border-bottom: 1px solid #3e3b47;
      display: block;
      padding-bottom: 1rem;
      margin-bottom: 1rem;
    }

    &__empty-message {
    color: ${darken(0.125)('#999591')};
    }
  }
`

export const CalendarContainer = styled.aside`
  width: 380px;
`
export const Calendar = styled(DayPicker)`
  &.DayPicker {
    border-radius: 0.5rem;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
    background: #3e3b47;
    border-radius: 0.5rem;
  }

  .DayPicker,
    .DayPicker-Month {
      width: 100%;
    }

    .DayPicker-NavButton {
      color: #999591 !important;
    }

    .DayPicker-NavButton--prev {
      /* background: url(ArrowLeftIcon) no-repeat center; */
      right: auto;
      left: 1.5em;
      margin-right: 0;
    }

    .DayPicker-NavButton--next {
      /* background: url(ArrowRightIcon) no-repeat center; */
    }

    .DayPicker-Month {
      border-collapse: separate;
      border-spacing: 8px;
      margin: 1rem 0 0 0;
      padding: 16px;
      background-color: #28262e;
      border-radius: 0 0 10px 10px;
    }

    .DayPicker-Caption {
      margin-bottom: 1rem;
      padding: 0 1rem;
      color: #f4ede8;

      > div {
        text-align: center;
      }
    }

    .DayPicker-Weekday {
      color: #666360;
    }

    .DayPicker-Day {
      width: 2.5rem;
      height: 2.5rem;
    }

    .DayPicker-Day--available:not(.DayPicker-Day--outside) {
      background: #3e3b47;
      border-radius: 0.6rem;
    }

    &.DayPicker:not(.DayPicker--interactionDisabled)
      .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
      background: ${shade(0.2, '#3e3b47')};
    }

    .DayPicker-Day--today {
      font-weight: normal;
      color: #fff;
    }

    .DayPicker-Day--disabled {
      color: #666360;
      background: transparent !important;
    }

    .DayPicker-Day--selected {
      background: #ff9000 !important;
      border-radius: 0.6rem;
      color: #232129 !important;
    }
`
