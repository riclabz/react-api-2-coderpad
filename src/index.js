import React from "react";
import ReactDOM from "react-dom";
import "./style.css";

class DisplayTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: null,
      error: null
    };
  }
  
  componentDidMount() {
    console.log("component mounted");
    this.fetchData();
  }
  
  fetchData() {
    fetch('https://www.anapioficeandfire.com/api/')
      .then((response) => {
        return response.json();
      }).then((resData) => {
        console.log(resData);
        resData = {
           "headers": ['Range', 'Top speed', 'Accelaration to 100km/h'],
           "data": {
             'Electric car 1': [ '400 km', '209 km/hr', '5.9 seconds'],
             'Electric car 2': [ '256 km', '130 km/hr', '11.9 seconds'], 
            }
        };
        console.log(resData);
        this.setState({
          apiResponse: resData
        });
      },
      (error) => {
        this.setState({
          error: error.message
        });
      }        
     )
  }
  
  render() {
    console.log("render called");
    const apiResponse = this.state.apiResponse;
    const error = this.state.error;
    if (error) {
      return (<div> {error} </div>);
    } else if (apiResponse) {
      return(
        <table class="api-table-data">
          <thead>
            <tr class="header-row">
              <td/>
              { apiResponse.headers 
                && apiResponse.headers.map((headerColumn) => (
                 <th>{headerColumn}</th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            { apiResponse.data 
              && Object.entries(apiResponse.data).map(([trKey, trData]) => (
              <tr>  
                <th>{trKey}</th>
                {trData.map((trColumnData) => <td>{trColumnData}</td>)}
              </tr>
            ))
            }
          </tbody>
        </table>
      );
    } else {
      return (<div/>);
    }
  }
}

ReactDOM.render(<DisplayTable />, document.getElementById('root'));

