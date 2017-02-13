import React, { Component, PropTypes } from 'react';
import './components.css';

const pad = (number, digits = 2) => {
    return ('00' + number).substr(-digits);
}

const parseTime = (millis) => {
    const seconds = Math.floor(millis / 1000) || 0;
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor(seconds / 60) - (hours * 60);
    const secs = seconds - (hours * 3600) - (mins * 60);
    return {
        hours: pad(hours, 1),
        mins: pad(mins),
        secs: pad(secs)
    };
};

const parseDigits = (digits) => {
    const paddedDigits = ('00000' + digits).substr(-5);
    return {
        hours: paddedDigits.substr(0, 1),
        mins: paddedDigits.substr(1, 2),
        secs: paddedDigits.substr(3, 2),
    };
};

class Display extends Component {
    static propTypes = {
        time: PropTypes.number,
        digits: PropTypes.string,
    };

    render() {
        // Display from the "top" of the second: 24s = 24.9s
        // It looks better at the start and end (when reaching zero).
        const time = this.props.time + 900;
        const { hours, mins, secs } = this.props.digits
            ? parseDigits(this.props.digits)
            : parseTime(time);

        return <div>
            <div className="displayGroup"><h1>{hours}h</h1></div>
            <div className="displayGroup"><h1>{mins}m</h1></div>
            <div className="displayGroup"><h1>{secs}s</h1></div>
        </div>;
    }
}

export default Display;