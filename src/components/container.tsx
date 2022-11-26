import * as React from 'react';

export type Instruments = 'Kick' | 'Snare' | 'HiHat' | 'Clap' 

// export interface ContainerProps {
//     steps: boolean[];
//     selectedInstrument: Instruments;
//     children?: React.ReactNode;
// }

export class Container extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    // render() {
    //     console.log("the selected inst is ", this.props.selectedInstrument);
    //     const childrenWithProps = React.Children.map(
    //       this.props.children,
    //       (child) => {
    //         if (
    //           typeof child === "object" &&
    //           child !== null &&
    //           child.hasOwnProperty("key")
    //         ) {
    //           //@ts-ignore
    //           if (child.key === this.props.selectedInstrument) {
    //             //@ts-ignore
    //             return React.cloneElement(child, {
    //               steps: this.props.steps,
    //               selected: true,
    //             });
    //           } else {
    //             //@ts-ignore
    //             return React.cloneElement(child, { steps: null, selected: false });
    //           }
    //         }
    //         return child;
    //       }
    //     );
    
    //     return (
    //       <div
    //         style={{
    //           flex: 1,
    //           flexDirection: "row",
    //           justifyContent: "space-between",
    //         }}
    //       >
    //         {childrenWithProps}
    //       </div>
    //     );
    //   }
    render() {
        // console.log("the selected inst is", this.props.selectedInstrument);
        const childrenWithProps = React.Children.map(this.props.children, child => {
            if (typeof child === 'object' && child != null && child.key) {
                if (child.key === this.props.selectedInstrument) {
                    return React.cloneElement(child, { steps: this.props.steps, selected: true });
                } else {
                    return React.cloneElement(child, { steps: null, selected: false });
                }
                
            }
            return child; 
        });
        
        return (
            <div style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                {childrenWithProps}
            </div>
        )
    }
}