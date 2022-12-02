let pads = [
    {
        bank: {
            true: {
                keyPad: 'Q',
                audioName: "Chord 1",
                audioLink: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
            },
            false: {
                key: 2,
                keyPad: 'Q',
                audioName: "Heater 1",
                audioLink: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
            }
        }
    },
    {
        bank: {
            true: {
                keyPad: 'W',
                audioName: "Chord 2",
                audioLink: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
            },
            false: {
                keyPad: 'W',
                audioName: "Heater 2",
                audioLink: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
            }
        }
    },
    {
        bank: {
            true: {
                keyPad: 'E',
                audioName: "Chord 3",
                audioLink: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
            },
            false: {
                keyPad: 'E',
                audioName: "Heater 3",
                audioLink: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
            }
        }
    },
    {
        bank: {
            true: {
                keyPad: 'A',
                audioName: "Shaker",
                audioLink: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
            },
            false: {
                keyPad: 'A',
                audioName: "Heater 4",
                audioLink: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
            }
        }
    },
    {
        bank: {
            true: {
                keyPad: 'S',
                audioName: "Open HH",
                audioLink: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
            },
            false: {
                keyPad: 'S',
                audioName: "Clap",
                audioLink: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
            }
        }
    },
    {
        bank: {
            true: {
                keyPad: 'D',
                audioName: "Closed HH",
                audioLink: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
            },
            false: {
                keyPad: 'D',
                audioName: "Open-HH",
                audioLink: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
            }
        }
    },
    {
        bank: {
            true: {
                keyPad: 'Z',
                audioName: "Punchy Kick",
                audioLink: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
            },
            false: {
                keyPad: 'Z',
                audioName: "Kick-n'-Hat",
                audioLink: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
            }
        }
    },
    {
        bank: {
            true: {
                keyPad: 'X',
                audioName: "Side Stick",
                audioLink: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
            },
            false: {
                keyPad: 'X',
                audioName: "Kick",
                audioLink: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
            }
        }
    },
    {
        bank: {
            true: {
                keyPad: 'C',
                audioName: "Snare",
                audioLink: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
            },
            false: {
                keyPad: 'C',
                audioName: "Closed-HH",
                audioLink: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
            }
        }
    },
];


class Machine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            power: true,
            bank: false,
            powerDisplay: "On",
            volume: 50
        };
        this.bankControl = this.bankControl.bind(this);
        this.powerControl = this.powerControl.bind(this);
        this.volumeHandle = this.volumeHandle.bind(this);
    }

    powerControl() {
        this.setState({
            power: !this.state.power
        })

        if (this.state.power) {
            this.setState({
                powerDisplay: "Off"
            })
            document.getElementById('power').style.flexDirection = "row";
            document.getElementById('on-off').style.backgroundColor = "grey";
            power = false;
        } else {
            document.getElementById('power').style.flexDirection = "row-reverse";
            document.getElementById('on-off').style.backgroundColor = "red";
            this.setState({
                powerDisplay: "On"
            });
            power = true;
        }
        turnOnOff();
    }

    bankControl() {
        this.setState({
            bank: !this.state.bank
        })

        if (this.state.bank) {
            document.getElementById('bank').style.flexDirection = "row";
        } else {
            document.getElementById('bank').style.flexDirection = "row-reverse";
        }
    }

    volumeHandle(event) {
        let volumeDisplay = event.target.value;
        this.setState({
            volume: volumeDisplay
        });
        let volume = volumeDisplay / 100;
        document.getElementById("display").innerHTML = "Volume: " + volumeDisplay;
        setTimeout(() => { document.getElementById("display").innerHTML = "" }, 2000)

        for (let audio of audios) {
            audio.volume = volume;
        }
    }

    render() {
        let drumpads = pads.map(padKey => {
            return (
                <Drumpad key={padKey.bank[this.state.bank].audioName} padKey={padKey.bank[this.state.bank].keyPad} source={padKey.bank[this.state.bank].audioLink} audioName={padKey.bank[this.state.bank].audioName} />
            )
        })

        return (
            <div id="drum-machine">
                <div id="logo">
                    <i className="fa-brands fa-free-code-camp"></i>
                    <h3>FCC</h3>
                </div>
                <div id="panel-control">
                    <div id="drumpads">
                        {drumpads}
                    </div>
                    <div id="controller">
                        <div className="onOff">
                            <div id="on-off"></div>
                            <p>{this.state.powerDisplay}</p>
                        </div>
                        <h3>Power</h3>
                        <button onClick={this.powerControl} className="switch" id="power">
                            <div ></div>
                        </button>
                        <p id="display"></p>
                        <input type="range" id="volume" value={this.state.volume} onChange={this.volumeHandle} />
                        <h3>Bank</h3>
                        <button onClick={this.bankControl} className="switch" id="bank">
                            <div></div>
                        </button>
                    </div>
                </div>
            </div>
        )
    }

};

function Drumpad(props) {
    return (
        <a className="drum-pad" id={props.audioName}>
            {props.padKey}
            <div className="hide" id={"audioName" + props.padKey}>{props.audioName}</div>
            <audio id={props.padKey} className="clip" src={props.source}></audio>
        </a>
    )
};


class App extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {

        return (
            <div id="container" tabIndex="0" >
                <Machine />
            </div>
        )
    }
};



ReactDOM.render(<App />, document.getElementById('root'));

let power = true;
let audios = document.getElementsByClassName("clip");

for (let audio of audios) {
    audio.volume = 0.5;
}

function turnOnOff() {
    document.getElementById("container").focus();
    if (power) {
        document.getElementById("drumpads").addEventListener("click", (event) => {
            document.getElementById(event.target.textContent[0]).play();
            let audioName = document.getElementById("audioName" + event.target.textContent[0]).textContent;
            document.getElementById("display").innerHTML = audioName;
        });
    } else {
        document.getElementById("display").innerHTML = "";
        document.getElementById("drumpads").addEventListener("click", (event) => {

            document.getElementById(event.target.textContent[0]).pause();
            document.getElementById("display").innerHTML = "";
        });
    }

}

turnOnOff()

document.querySelector('div').addEventListener("keypress", (event) => {
    let id = document.getElementById("audioName" + event.code[3]).textContent;
    let button = document.getElementById(id);
    button.click()
});