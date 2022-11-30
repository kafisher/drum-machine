import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { TransportComponent } from './components/transport.component';
import { AudioContext } from 'standardized-audio-context-mock';
import { Steps } from './components/steps';
import { PlayPause } from './components/playpause';
import { Transport } from 'tone';
import { Container } from './components/container';
import { Instrument } from './components/instrument';

const audioContextMock = new AudioContext();
const stepsMock = [false, false, false];
// const transportMock = new Transport();
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
  expect(screen.getByText('Play')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Play'));
  expect(screen.getByText('Pause')).toBeInTheDocument();
})

// it('plays a loop', () => {
//   render(
//       <TransportComponent ctx={audioContextMock}>
//         <div style={{ display: 'block' }}>
//                     <PlayPause play={()=>{console.log('playing');}} pause={()=>{console.log('pausing');}} />
//                 </div>
//                 <Container steps={stepsMock} selectedInstrument={"Kick"}>
//                     <Instrument ctx={audioContextMock} key="Kick" generator="Kick" handleClick={()=>{console.log('kick');}}/>
//                 </Container>
//                 <Steps handleStepChange={()=>{console.log('step');}}steps={stepsMock} />
//       </TransportComponent>
//     );
//   screen.debug();
//   fireEvent.click(screen.getByText('Kick'));
//   fireEvent.click(screen.getByText('Play'));

// })
//TODO - test with audioContext mock - play/pause a loop/select a clip, hear a sound?
