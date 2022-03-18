import React from "react";
import { useEffect, useState } from "react";
import { SpinnerOverlay, SpinnerContainer } from "./spinner";

// const withData = WrappedComponent => {
//   class WithData extends React.Component {
//     constructor(props) {
//       super(props);

//       this.state = {
//         data: []
//       };
//     }

//     componentDidMount() {
//       setTimeout(() => {
//         fetch(this.props.dataSource)
//           .then(response => response.json())
//           .then(data => this.setState({ data: data.slice(0, 3) }));
//       }, 1500);
//     }

//     render() {
//       const { dataSource, ...otherProps } = this.props;

//       return this.state.data.length < 1 ? (
//         <h1>LOADING</h1>
//       ) : (
//         <WrappedComponent data={this.state.data} {...otherProps} />
//       );
//     }
//   }

//   return WithData;
// };

// export default withData;

const fetchAndLoadingHOC = (WrappedComponent) => {
  const ComponentReturn = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    useEffect(() => {
      if (isLoading) {
        //set timeout for see loading
        setTimeout(() => {
          fetch(props.dataSource)
            .then((response) => response.json())
            .then((value) => {
              if (value.length > 0) setData([...value]);
              setIsLoading(false);
            });
        }, 2000);
      }
    }, [isLoading]);
    return isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer />
      </SpinnerOverlay>
    ) : (
      <WrappedComponent data={data} {...props} />
    );
  };

  return ComponentReturn;
};

export default fetchAndLoadingHOC;
