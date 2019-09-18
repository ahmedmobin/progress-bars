import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import config from "../config.json";
import CountChangeButton from "./countChangeButton";
import IndividualBar from "./individualBar.jsx";
class ProgressBars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bars: [],
      buttons: [],
      limit: "",
      barOptionSelected: "0",
      barAdditionalClass: false
    };
  }
  componentDidMount() {
    const apiEndpointUrl = config.apiEndpoint;
    axios
      .get(apiEndpointUrl)
      .then(res =>
        this.setState({
          bars: res.data.bars,
          buttons: res.data.buttons,
          limit: res.data.limit
        })
      )
      .catch(error => console.log(error));
  }
  handleProgressBarConditions = total => {
    //console.log("condintion", total);
  };
  handleProgressBar = button => {
    const { limit, barOptionSelected } = this.state;

    const bars = [...this.state.bars];
    const index = barOptionSelected;
    const total = (bars[index] += button);
    this.handleProgressBarConditions(total);
    if (total < 0) {
      bars[index] = 0;
    } else if (total > limit) {
      bars[index] = limit;
      console.log("limit is reached");
    } else if (total > 100 && total < limit) {
      this.setState({ barAdditionalClass: true });
    } else if (total < 100) {
      this.setState({ barAdditionalClass: false });
    }
    this.setState({ bars });
  };
  handleSelectChange = event => {
    this.setState({
      barOptionSelected: event.target.value
    });
  };
  render() {
    const barsCount = _.range(0, this.state.bars.length);
    const { limit, barAdditionalClass } = this.state;
    //console.log("additional", barAdditionalClass);
    return (
      <div>
        <h1>Progress Bars Demos {limit}</h1>
        {this.state.bars.map((bar, index) => (
          <IndividualBar
            additionalClass={barAdditionalClass}
            key={index}
            bar={bar}
          />
        ))}

        <select onClick={this.handleSelectChange}>
          {barsCount.map((count, index) => (
            <option key={index} value={count}>
              Progress bar{count + 1}
            </option>
          ))}
        </select>
        {this.state.buttons.map(button => (
          <CountChangeButton
            key={button}
            button={button}
            onChangeProgressBar={() => this.handleProgressBar(button)}
          />
        ))}
      </div>
    );
  }
}
export default ProgressBars;
