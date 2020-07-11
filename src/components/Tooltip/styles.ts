import styled, { css } from 'styled-components'

export const Container = styled.div`
  position: relative;

  span {
    background: #ff9000;
    color: #fff;
    padding: .5rem;
    border-radius: .25rem;
    font-size: .75rem;
    font-weight: 500;
    position: absolute;
    bottom: calc(100% + 12px);
    transform: translateX(-50%);
    left: 50%;
    display: block;
    width: 10rem;
    opacity: 0;
    visibility: hidden;
    transition: opacity .4s;


    &::before {
      position: absolute;
      border-style: solid;
      border-color: #ff9000 transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      transform: translateX(-50%);
      left: 50%;
      content: '';
    }
  }

  &:hover > span {
    opacity: 1;
    visibility: visible;
  }

`
