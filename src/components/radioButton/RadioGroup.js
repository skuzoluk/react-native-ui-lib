import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {BaseComponent} from '../../commons';
import View from '../view';

export const RadioGroupContext = React.createContext({value: undefined, onValueChange: undefined});

/**
 * Wrap a group of Radio Buttons to automatically control their selection
 */
class RadioGroup extends BaseComponent {
  static displayName = 'RadioGroup';

  static propTypes = {
    /**
     * The value of the selected radio button
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    /**
     * Invoked once when value changes, by selecting one of the radio buttons in the group
     */
    onValueChange: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({value: nextProps.value});
    }
  }
  
  getContextProviderValue() {
    const {value} = this.state;
    return {value, onValueChange: this.onValueChange};
  }

  onValueChange = value => {
    this.setState({value});
    _.invoke(this.props, 'onValueChange', value);
  };

  render() {
    return (
      <View {...this.props}>
        <RadioGroupContext.Provider value={this.getContextProviderValue()}>{this.props.children}</RadioGroupContext.Provider>
      </View>
    );
  }
}

export default RadioGroup;
