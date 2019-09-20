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
      barAdditionalClass: [],
      isLoading: true
    };
  }
  async componentDidMount() {
    const apiEndpointUrl = config.apiEndpoint;

    try {
      const res = await axios.get(apiEndpointUrl);

      let barAdditionalClass = [];
      for (let index = 0; index < res.data.bars.length; index++) {
        if (
          res.data.bars[index] > 100 &&
          res.data.bars[index] < res.data.limit
        ) {
          barAdditionalClass.push(true);
        } else if (res.data.bars[index] < 100) {
          barAdditionalClass.push(false);
        }
      }

      this.setState({
        bars: res.data.bars,
        buttons: res.data.buttons,
        limit: res.data.limit,
        barAdditionalClass: barAdditionalClass,
        isLoading: false
      });
    } catch (error) {
      console.log(error);
      this.setState({ isLoading: false });
    }
  }
  handleProgressBar = button => {
    const { limit, barOptionSelected } = this.state;

    const bars = [...this.state.bars];
    const barAdditionalClass = [...this.state.barAdditionalClass];
    const index = barOptionSelected;
    const total = (bars[index] += button);
    if (total < 0) {
      bars[index] = 0;
    } else if (total > limit) {
      bars[index] = limit;
    }
    if (total > 100 && total < limit) {
      barAdditionalClass[index] = true;
    } else if (total < 100) {
      barAdditionalClass[index] = false;
    }
    this.setState({ bars, barAdditionalClass });
  };
  handleSelectChange = event => {
    this.setState({
      barOptionSelected: event.target.value
    });
  };
  render() {
    const barsCount = _.range(0, this.state.bars.length);
    const { barAdditionalClass, bars } = this.state;
    return (
      <div>
        {bars.length ? (
          <div className="holder">
            <h1>Progress Bars</h1>
            {bars.map((bar, index) => (
              <IndividualBar
                additionalClass={barAdditionalClass[index]}
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
            {this.state.buttons.map(value => (
              <CountChangeButton
                key={value}
                button={value}
                onChangeProgressBar={() => this.handleProgressBar(value)}
              />
            ))}
          </div>
        ) : (
          "Loading..."
        )}
      </div>
    );
  }
}
export default ProgressBars;
