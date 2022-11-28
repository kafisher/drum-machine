import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { TransportComponent } from './components/transport.component';
import { AudioContext } from 'standardized-audio-context-mock';
import { Steps } from './components/steps';
import { scryRenderedDOMComponentsWithClass } from 'react-dom/test-utils';
import { PlayPause } from './components/playpause';
// import {scryRenderedDOMCompponentsWithClass } from 'react-dom/test-utils';

const audioContextMock = new AudioContext();
const stepsMock = [false, false, false];
it('renders title without crashing', () => {
  render(
      <TransportComponent ctx={audioContextMock}/>    
    );
  expect(screen.getByText('Web Drum Machine')).toBeInTheDocument();

})

it('renders 3 steps', () => {
  const stepsFragment = render(<Steps steps={stepsMock}/>);
  expect(stepsFragment).toMatchSnapshot();
  
})

it('toggles play/pause correctly', () => {
  const playPause = render(<PlayPause playing={false} play={()=>{}}/>);
  screen.debug();

  expect(screen.getByText('Play')).toBeInTheDocument();

  fireEvent.click(screen.getByText('Play'));
  screen.debug();
  expect(screen.getByText('Pause')).toBeInTheDocument();
})


