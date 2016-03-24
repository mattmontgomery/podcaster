import React, { PropTypes } from 'react';

const App = React.createClass({
    propTypes: {
        children: PropTypes.node.isRequired
    },
    render() {
        const { children } = this.props;
        return (
            <div className="podcaster-app">
                {this.props.children}
            </div>
        );
    }
});

export default App;
