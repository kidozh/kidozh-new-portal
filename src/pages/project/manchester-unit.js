import * as React from "react"
import { useState } from "react"


import Layout from "../../components/layout"
import Seo from "../../components/seo"
import { Link, graphql } from "gatsby"
import CSCLogo from "../../images/project/china-scholarship-logo.jpg"
import { Line } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { fft, util } from 'fft-js'

import SaturatedFrequency from "../../images/project/msu/accuracy-score-tendency-with-spectrum-modified.svg"
import EquivalentAccuracySurface from "../../images/project/msu/equivalent-accuracy-surface-HQ-colorbar-remake-1.svg"
import QuiverGraphEquivalentAccuracy from "../../images/project/msu/quiver_graph_equivalent_accuracy_surface_wb_full.svg"

import "../../styles/msu.css"
import { Alert } from "flowbite-react"

const TppPage = () => (
  <Layout>
    <section className="bg-sky-800 dark:bg-green-600">
          <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-3">
            <h4 class="text-xl font-medium text-sky-50 dark:text-green-100 text-center">
              <Link to="/project/manchester-unit-zh">查看中文界面</Link>
              </h4>
          </div>
        </section>
    <section className="bg-gray-50 dark:bg-slate-900 dark:bg-hexagons-bg-dark bg-hexagons-bg-light">
      <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-32">
        <h4 class="text-2xl font-regular text-sky-700 dark:text-indigo-400 text-center font-inter">The basic signal unit representing events in machining condition</h4>
        <h1 className="text-7xl md:text-8xl mt-2 text-center font-bold font-[Inter] text-slate-900 dark:text-white">Minimum Sufficient Unit</h1>
        <p className="mt-16 text-xl mb-0 font-bold font-roboto text-gray-600 max-w-none dark:text-gray-300 text-center">
          <Link to="#">Jiduo Zhang</Link><sup>1*</sup>, &nbsp;
          <a className="hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-150 ease-in-out" href="https://research.manchester.ac.uk/en/persons/robert.heinemann">Robert Heinemann</a><sup>1</sup>, &nbsp;
          <a className="hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-150 ease-in-out" href="https://research.manchester.ac.uk/en/persons/ottojan.bakker">Otto Jan Bakker</a><sup>1</sup>, &nbsp;
          <a className="hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-150 ease-in-out" href="#">Siqi Li</a><sup>2</sup>, &nbsp;
          <a className="hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-150 ease-in-out" href="#">Xiaoyu Xiao</a><sup>3</sup>, &nbsp;
          <a className="hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-150 ease-in-out" href="#">Yixian Ding</a><sup>4</sup>

        </p>

        <p className="font-bold text-sm font-roboto text-gray-400 max-w-none dark:text-gray-300 mt-8 text-center">
          <sup>1</sup> Department of Mechanical and Aerospace Engineering, The University of Manchester <br />
          <sup>2</sup> Department of Mathematics, The University of Manchester<br />
          <sup>3</sup> Department of Electrical and Electronic Engineering, The University of Manchester <br />
          <sup>4</sup> School of Mechanical, Electronic and Control Engineering, Beijing Jiaotong University <br />

        </p>

        <div className="mt-12 flex-1 justify-items-center">
          <div className="flex justify-center">
            <Link className="text-white bg-sky-700 shrink-0
            hover:bg-sky-800 focus:outline-hidden font-montserrat
            focus:ring-4 focus:ring-sky-300 
            font-light rounded-full text-normal px-5 py-2.5 
            text-center mr-4 mb-2 dark:bg-sky-600
              dark:hover:bg-sky-700 dark:focus:ring-sky-800" to="https://doi.org/10.1016/j.ymssp.2025.112499">MSSP</Link>

            <a className="text-white bg-slate-700 shrink-0
              hover:bg-slate-800 focus:outline-hidden 
              focus:ring-4 focus:ring-sky-300 font-montserrat
              font-light rounded-full text-normal px-5 py-2.5 
              text-center mr-2 mb-2 dark:bg-slate-100 dark:text-black
                dark:hover:bg-slate-200 dark:focus:ring-slate-200" href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4973757" data-tooltip-target="tooltip-default" type="button">Preprint<sup>*</sup></a>

            <div id="tooltip-default" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-2xs opacity-0 tooltip dark:bg-gray-700">
              Preprint version of the paper is available on SSRN. The final version is published on MSSP.
              <div class="tooltip-arrow" data-popper-arrow></div>
            </div>

          </div>
          <div className="flex justify-center mt-4">
            <p className="text-gray-400 dark:text-gray-600 text-sm font-inter">*: The final results is based on the paper published on Mechanical Systems and Signal Processing.</p>
          </div>

        </div>
      </div>

    </section>

    <HarmonicComponentAnalysis />
    <ModelResponsePage />

    <section className="bg-sky-100 dark:bg-sky-900">
      <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-8 lg:flex align-middle">
        <div className="flex-1 justify-center align-middle">
          <p className="text-4xl p-8 font-normal font-montserrat text-sky-900 dark:text-blue-200 max-w-none">
            Jiduo would like to acknowledge the continuing contribution to this research by&nbsp;
            <a href="https://www.csc.edu.cn/" className="hover:text-blue-700
            transition-all duration-150 ease-in-out hover:underline font-bold
            dark:hover:text-blue-200 ">China scholarship council</a>.
          </p>
        </div>

        <div className="lg:shrink-0" >
          <div className="p-6 flex-1 justify-item-center">
            <img className="max-w-full flex justify-center 
            h-48 md:h-36 rounded-2xl dark:bg-slate-200" src={CSCLogo} alt="Logo of China scholarship council" />
          </div>

        </div>


      </div>

    </section>

    <section className="bg-gray-100 dark:bg-gray-700">
      <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-8">
        <p className="text-2xl mt-2 font-normal text-gray-500 dark:text-gray-200 max-w-none  font-roboto">
          If you have any questions or suggestions, please feel free to&nbsp;
          <Link to="/contact" className="text-blue-500 dark:text-blue-200 hover:text-blue-700
           transition-all duration-150 ease-in-out hover:underline
           dark:hover:text-blue-200">contact us</Link>.
        </p>
      </div>

    </section>


  </Layout>
)

class HarmonicComponentAnalysis extends React.Component {

  timeChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Signal in time domain',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time (s)'
        },
        type: 'linear',
      },
      y: {
        title: {
          display: true,
          text: 'Thrust (N)'
        },
        type: 'linear',
      },
    }
  };

  insufficientFrequencyTimeChartOptions = {
    responsive: true,
    aspectRatio: 1,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Signal in time domain',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time (s)'
        },
        type: 'linear',
      },
      y: {
        title: {
          display: true,
          text: 'Thrust (N)'
        },
        type: 'linear',
      },
    }
  };


  freqChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Frequency spectrum',
      },
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            mode: 'vertical',
            xMin: 66.66,
            xMax: 66.66,
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 6, // 2px
            label: {
              enabled: true,
            },
          },
        },
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Frequency (Hz)'
        },
        type: 'linear',
      },
      y: {
        title: {
          display: true,
          text: 'Amplitude'
        },
        type: 'linear',
      },
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      spindleRate: 4000,
      signalFrequency: 2000,
      signalDuration: 0.128,
      signal: [],
      signalChartState: {
        data: {
          datasets: [
            {
              label: "Thrust",
              data: [],
              fill: false,
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgba(255, 99, 132, 0.2)',
            },
          ]
        },
      },
      frequencyChartState: {
        data: {
          datasets: [
            {
              label: "Thrust",
              data: [],
              fill: false,
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgba(255, 99, 132, 0.2)',
            },
          ]
        },
      },
      aliasingFrequencyChartState: {
        data: {
          datasets: [
            {
              label: "Thrust",
              data: [],
              fill: false,
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgba(255, 99, 132, 0.2)',
            },
          ]
        },
      },
      aliasingFrequencyChartState1: {
        data: {
          datasets: [
            {
              label: "Thrust",
              data: [],
              fill: false,
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgba(255, 99, 132, 0.2)',
            },
          ]
        },
      },
      aliasingFrequencyChartState2: {
        data: {
          datasets: [
            {
              label: "Thrust",
              data: [],
              fill: false,
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgba(255, 99, 132, 0.2)',
            },
          ]
        },
      },
      binFrequencyChartState1: {
        data: {
          datasets: [
            {
              label: "Thrust",
              data: [],
              fill: false,
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgba(255, 99, 132, 0.2)',
            },
          ]
        },
      },
      binFrequencyChartState2: {
        data: {
          datasets: [
            {
              label: "Thrust",
              data: [],
              fill: false,
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgba(255, 99, 132, 0.2)',
            },
          ]
        },
      },
      binFrequencyChartState3: {
        data: {
          datasets: [
            {
              label: "Thrust",
              data: [],
              fill: false,
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgba(255, 99, 132, 0.2)',
            },
          ]
        },
      },


    };
    // this.generateSignal = this.generateSignal.bind(this);
    this.getValueByTime = this.getValueByTime.bind(this);
    this.setSpindleRate = this.setSpindleRate.bind(this);
    this.setSignalFrequency = this.setSignalFrequency.bind(this);
    this.setSignalDuration = this.setSignalDuration.bind(this);
    this.setSignal = this.setSignal.bind(this);
    this.setSignalChartState = this.setSignalChartState.bind(this);
    this.setAliasFrequencyChartState = this.setAliasFrequencyChartState.bind(this);
    this.setAliasFrequencyChartState1 = this.setAliasFrequencyChartState1.bind(this);
    this.setAliasFrequencyChartState2 = this.setAliasFrequencyChartState2.bind(this);
    this.generateSignalAsRequired = this.generateSignalAsRequired.bind(this);

  }

  setSignalChartState = (value) => {
    this.setState({ signalChartState: value });
  }

  setFrequencyChartState = (value) => {
    this.setState({ frequencyChartState: value });

  }

  setAliasFrequencyChartState = (value) => {
    this.setState({ aliasingFrequencyChartState: value });
  }

  setAliasFrequencyChartState1 = (value) => {
    this.setState({ aliasingFrequencyChartState1: value });
  }

  setAliasFrequencyChartState2 = (value) => {
    this.setState({ aliasingFrequencyChartState2: value });
  }

  setBinFrequencyChartState1 = (value) => {
    this.setState({ binFrequencyChartState1: value });
  }

  setBinFrequencyChartState2 = (value) => {
    this.setState({ binFrequencyChartState2: value });
  }

  setBinFrequencyChartState3 = (value) => {
    this.setState({ binFrequencyChartState3: value });
  }

  setSpindleRate = (value) => {
    if (value > 1) {
      this.setState({ spindleRate: value });
      this.generateSignalAsRequired()
    }


  }

  setSignalFrequency = (value) => {
    if (value > 1) {
      this.setState({ signalFrequency: value });
      this.generateSignalAsRequired()
    }

  }

  setSignalDuration = (value) => {
    if (value > 0.0001) {
      this.setState({ signalDuration: value });
      this.generateSignalAsRequired()
    }


  }

  setSignal = (signal) => {
    this.setState({ signal: signal });
  }

  getValueByTime(time, spindle_rate, mean_value, first_harmonic_amplitude, harmonic_decaying_factor) {
    //console.log("Time: " + spindle_rate + " " + time)
    const pi = 3.14159265358979323846;


    //return mean_value + first_harmonic_amplitude * (Math.random()-0.5) * 0.1 + first_harmonic_amplitude * Math.sin(2 * pi * spindle_rate * 1000 * time + Math.random()) 

    return mean_value + first_harmonic_amplitude * Math.sin(2 * pi * spindle_rate * time)
      + first_harmonic_amplitude * harmonic_decaying_factor * (Math.random() - Math.random() + 1.5) * Math.sin(2 * pi * spindle_rate * 2 * time)
      + first_harmonic_amplitude * harmonic_decaying_factor * (Math.random() - 0.5 + 0.8) * Math.sin(2 * pi * spindle_rate * 4 * time)
      + (Math.random() - 0.5) * first_harmonic_amplitude * 2
      + first_harmonic_amplitude * 0.2 * Math.sin(2 * pi * spindle_rate / 4 * time)
      + first_harmonic_amplitude * 0.5 * harmonic_decaying_factor * Math.sin(2 * pi * spindle_rate / 2 * time)
  }

  generateSignalAsRequired = () => {
    this.generateSignal(this.state.spindleRate, this.state.signalFrequency, this.state.signalDuration)
  }

  componentDidMount() {
    console.log("Component mounted")
    console.log(this.state.spindleRate)
    console.log(this.state.signalFrequency)
    console.log(this.state.signalDuration)
    this.generateSignalAsRequired();
    //this.generateSignal(this.state.spindleRate, this.state.signalFrequency, this.state.signalDuration)
  }

  generateSignal(spindleRpm, signalFrequency, signalDuration) {
    console.log("Signal Freq in generation " + signalFrequency)

    let signal = []

    let totalSamples = signalDuration * signalFrequency
    const spindleRate = spindleRpm / 60
    let time = 0
    const mean_value = Math.random() * 500
    const first_harmonic_amplitude = mean_value / 50
    const harmonic_decaying_factor = 0.4
    for (let i = 0; i < totalSamples; i++) {
      console.log("Signal Freq in generation " + signalFrequency + " Time " + time)
      signal.push([time, this.getValueByTime(time, spindleRpm / 60, mean_value, first_harmonic_amplitude, harmonic_decaying_factor)])
      time += 1 / signalFrequency
    }
    this.setSignal(signal)

    var signal_chart_state = {
      data: {
        // labels: this.state.signal.map((value) => value[0]),
        datasets: [
          {
            label: "Thrust",
            data: signal.map((value) => {
              return { x: value[0], y: value[1] };
            }),
            fill: false,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
          },
        ]
      },
    };

    // conduct fourier transform
    const rawSignal = signal.map((value) => value[1] - mean_value)
    const phasors = fft(rawSignal)
    const frequencies = util.fftFreq(phasors, signalFrequency)
    const magnitudes = util.fftMag(phasors)

    var frequency_chart_state = {
      data: {
        datasets: [
          {
            label: "Thrust",
            data: frequencies.map(function (f, ix) {
              return { x: f, y: magnitudes[ix] / (totalSamples) };
            }),
            fill: false,
            backgroundColor: '#3949AB',
            borderColor: '#3949AB',
          },
        ]
      },
    };

    this.setSeparateFrequencyChartState(signal);
    this.setSeperateBinFrequencyChartState(signal, mean_value, signalFrequency);


    this.setSignalChartState(signal_chart_state);
    this.setFrequencyChartState(frequency_chart_state);


    return signal_chart_state
  }

  setSeparateFrequencyChartState(signal) {

    var insufficient_freq_chart_state = {
      data: {
        // labels: this.state.signal.map((value) => value[0]),
        datasets: [
          {
            label: (this.state.signalFrequency / 10).toFixed(0) + " (Hz)",
            data: signal.filter((e, i) => i % 10 == 10 - 1).map((value) => {
              return { x: value[0], y: value[1] };
            }),
            fill: false,
            backgroundColor: 'rgb(211, 47, 47)',
            borderColor: 'rgba(211, 47, 47, 0.2)',
          },
          // {
          //   label: (this.state.signalFrequency/10).toFixed(0)+" (Hz)",
          //   data: signal.filter((e,i) => i% 10 == 10 - 1).map((value) => {
          //     return { x: value[0], y: value[1] };
          //   }),
          //   fill: false,
          //   backgroundColor: 'rgb(255, 160, 0)',
          //   borderColor: 'rgba(255, 160, 0, 0.2)',
          // },
          // {
          //   label: (this.state.signalFrequency/2).toFixed(0)+" (Hz)",
          //   data: signal.filter((e,i) => i% 2 == 2 - 1).map((value) => {
          //     return { x: value[0], y: value[1] };
          //   }),
          //   fill: false,
          //   backgroundColor: 'rgb(56, 142, 60)',
          //   borderColor: 'rgba(56, 142, 60, 0.2)',
          // },
        ]
      },
    };
    this.setAliasFrequencyChartState(insufficient_freq_chart_state);

    var insufficient_freq_chart_state1 = {
      data: {
        // labels: this.state.signal.map((value) => value[0]),
        datasets: [
          {
            label: (this.state.signalFrequency / 5).toFixed(0) + " (Hz)",
            data: signal.filter((e, i) => i % 5 == 5 - 1).map((value) => {
              return { x: value[0], y: value[1] };
            }),
            fill: false,
            backgroundColor: 'rgb(255, 160, 0)',
            borderColor: 'rgba(255, 160, 0, 0.2)',
          },
        ]
      },
    };
    this.setAliasFrequencyChartState1(insufficient_freq_chart_state1);

    var insufficient_freq_chart_state2 = {
      data: {
        // labels: this.state.signal.map((value) => value[0]),
        datasets: [
          {
            label: (this.state.signalFrequency / 2).toFixed(0) + " (Hz)",
            data: signal.filter((e, i) => i % 2 == 2 - 1).map((value) => {
              return { x: value[0], y: value[1] };
            }),
            fill: false,
            backgroundColor: 'rgb(56, 142, 60)',
            borderColor: 'rgba(56, 142, 60, 0.2)',
          },


        ]
      },
    };

    this.setAliasFrequencyChartState2(insufficient_freq_chart_state2);


  }

  setSeperateBinFrequencyChartState(signal, mean_value, signalFrequency) {
    const sampling_duration_list = [0.016, 0.032, 0.064];
    const color_list = ['rgb(211, 47, 47)', '#FFC107', '#4CAF50'];
    for (let i = 0; i < sampling_duration_list.length; i++) {
      const totalSamples = Math.floor(sampling_duration_list[i] * this.state.signalFrequency)
      const resampling_signal = signal.slice(0, totalSamples)


      const rawSignal = resampling_signal.map((value) => value[1] - mean_value)
      const phasors = fft(rawSignal)
      const frequencies = util.fftFreq(phasors, signalFrequency)
      const magnitudes = util.fftMag(phasors)


      var frequency_chart_state = {
        data: {
          datasets: [
            {
              label: sampling_duration_list[i] + " (s)",
              data: frequencies.map(function (f, ix) {
                return { x: f, y: magnitudes[ix] / (totalSamples) };
              }),
              fill: false,
              backgroundColor: color_list[i],
              borderColor: color_list[i],
            },
          ]
        },
      };

      if (i == 0) {
        this.setBinFrequencyChartState1(frequency_chart_state);
      } else if (i == 1) {
        this.setBinFrequencyChartState2(frequency_chart_state);
      } else {
        this.setBinFrequencyChartState3(frequency_chart_state);
      }
    }


  }



  render() {
    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend
    );
    return (
      <div>
        <section className="bg-gray-50 dark:bg-slate-800">
          <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-4 lg:flex">
            <div className="flex-1 p-6 justify-center">
              <h1 className="text-4xl font-montserrat mt-2 font-bold text-cyan-700 dark:text-cyan-200 text-center">Playground</h1>
              <p className="text-l font-mono mt-4 font-medium text-slate-500 dark:text-gray-400 max-w-none text-center">Tinker With a <b>Signal Processing</b> Right Here in Your Browser. You can't break it, we promise.</p>
            </div>
          </div>
        </section>
        <section className="bg-gray-50 dark:bg-slate-800">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-8 lg:flex">
              <div className="flex-1 bg-slate-100 dark:bg-slate-900 p-6 rounded-xl">
                <div className="w-full mb-6">
                  <h1 className="text-2xl mb-2 font-medium text-sky-700 dark:text-sky-200 text-center font-montserrat">Basic information</h1>
                </div>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  <div>
                    <label for="spindle_rate" class="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">Spindle rate (RPM)</label>
                    <input type="number" id="spindle_rate" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={this.state.spindleRate} onChange={(e) => this.setSpindleRate(e.target.value)} required />
                  </div>
                  <div>
                    <h1 className="text-sm mb-2 font-bold text-slate-700 dark:text-slate-200">Harmonics fundamental frequency</h1>
                    <p className="text-sm mt-2 font-normal text-slate-500 dark:text-gray-400 max-w-none">
                      <b className="font-medium font-mono text-4xl text-cyan-700 dark:text-cyan-100">{(this.state.spindleRate / 60).toFixed(2)}</b> Hz </p>
                  </div>

                </div>

                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  <div>
                    <label for="sampling_frequency" class="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">Sampling Frequency (Hz)</label>
                    <input type="number" id="sampling_frequency" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={this.state.signalFrequency} onChange={(e) => this.setSignalFrequency(e.target.value)} required />
                  </div>
                  <div>
                    <label for="sampling_duration" class="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">Sampling Duration (s)</label>
                    <input type="number" id="sampling_duration" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={this.state.signalDuration} onChange={(e) => this.setSignalDuration(e.target.value)} required />
                  </div>
                </div>

                <div className="grid gap-6 mb-6">
                  {!Number.isInteger(this.state.signalDuration * this.state.signalFrequency) && <Alert className="w-full bg-red-100 text-red-500 font-inter" color="failure">The total samples (Product of frequency and duration, <b>{(this.state.signalDuration * this.state.signalFrequency).toFixed(2)}</b>) is not an integer. Please adjust the sampling frequency or duration.</Alert>}
                </div>

                <div className="grid gap-6 mb-6">
                  <input type="button" value="Generate New Signal Sample" className="bg-sky-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-800 font-inter" onClick={() => this.generateSignal(this.state.spindleRate, this.state.signalFrequency, this.state.signalDuration)} />
                </div>

                <div className="grid gap-6 mb-0">
                  <p className="font-mont font-medium text-xs text-gray-400 dark:text-gray-500">*: This sample only represents typical thrust signal in drilling of CFRP/Al stacks.</p>
                </div>


              </div>
              <div className="flex-1" >
                <div className="max-w-full justify-item-center">
                  <div id="signal-chart" className="max-w-full min-h-96 flex justify-center">
                    <Line options={this.timeChartOptions} data={this.state.signalChartState.data} />
                  </div>
                </div>

              </div>

            </div>
          </form>

        </section>
        <section className="bg-gray-50 dark:bg-slate-800">
          <h1 className="text-2xl font-medium text-sky-700 dark:text-sky-200 text-center font-montserrat">Signal in frequency domain</h1>
          <p className="text-l font-mono mt-4 font-medium text-slate-500 dark:text-gray-400 max-w-none text-center">The detrend signal is transformed into frequency domain using Fast Fourier Transform (FFT) algorithm.</p>
          <div className="grid w-full mx-auto max-w-(--breakpoint-xl) px-0 py-8 md:grid-cols-2">

            <div className="md:flex-1 max-w-full">
              <div className="max-w-full justify-item-center">
                <div id="signal-chart" className="max-w-full min-h-96 flex justify-center">
                  <Line options={this.freqChartOptions} data={this.state.frequencyChartState.data} />
                </div>
              </div>
              <div className="flex-1 p-6 justify-center">

              </div>
            </div>

            <div className="basic-xl grid w-full mx-auto max-w-(--breakpoint-xl) px-6 py-16 md:grid-cols-2 md:gap-6">
              <div className="mb-6 align-start">
                <h1 className="text-2xl font-bold text-sky-700 dark:text-slate-200 font-montserrat">Harmonic</h1>
                <p className="text-normal font-roboto mt-2 font-regular text-slate-500 dark:text-gray-400">Strike by the tool engagement frequency, the signal exhibits a significant harmonic structures, as shown in the peaks at <b>{(this.state.spindleRate / 60).toFixed()}</b>, <b>{(2 * this.state.spindleRate / 60).toFixed()}</b>, <b>{(4 * this.state.spindleRate / 60).toFixed()}</b> Hz.
                </p>
              </div>

              <div className="mb-6 align-start">
                <h1 className="text-2xl font-bold text-sky-700 dark:text-slate-200 font-montserrat">Attenuation</h1>
                <p className="text-normal font-roboto mt-2 font-regular text-slate-500 dark:text-gray-400">Due to damping property of mechanical structure, the amplitude of harmonics decays notably along with the multiples of frequency.</p>
              </div>

              <div className="mb-6 align-start">
                <h1 className="text-2xl font-bold text-sky-700 dark:text-slate-200 font-montserrat">Consistent</h1>
                <p className="text-normal font-roboto mt-2 font-regular text-slate-500 dark:text-gray-400">The frequency components in thrust and torque is relatively stable, thereby enabling a robust recognition despite the condition change.</p>
              </div>

              <div className="mb-6 align-start">
                <h1 className="text-2xl font-bold text-sky-700 dark:text-slate-200 font-montserrat">4x</h1>
                <p className="text-normal font-roboto mt-2 font-regular text-slate-500 dark:text-gray-400">Up to four times the harmonics components are highly informative in the frequency domain.</p>
              </div>

            </div>

          </div>

        </section>

        <section className="bg-gray-100 dark:bg-slate-700">
          <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-0 lg:flex">
            <div className="flex-6 p-6">
              <h1 className="text-2xl mt-2 font-medium text-cyan-700 dark:text-cyan-300 text-center font-mont">Minimum Sufficient Signal Condition</h1>
              <p className="text-xl mt-2 font-light font-mono text-slate-500 dark:text-gray-400 max-w-none text-center">
                Boundary condition derived from harmonic structure according to Shannon-Nyquist theorem</p>
            </div>
          </div>
          <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-4">
            <div className="p-6">
              <h1 className="text-2xl mt-0 font-bold text-sky-700 dark:text-sky-200 font-mont">Frequency</h1>
              <p className="text-xl mt-2 font-regular font-inter text-slate-500 dark:text-gray-400"><b className="font-heavy text-slate-700 dark:text-gray-200">Anti-aliasing</b> To protect the informative information from aliasing artifacts, according to Shannon-Nyquist sampling theorem, the sampling frequency should surpass twice the frequency of informative components in signal.</p>

              <p className="text-xl mt-4 font-regular font-inter text-slate-500 dark:text-gray-400">In the following charts, when the sampling frequency is below <b className="text-slate-700 dark:text-gray-200">{(2 * this.state.spindleRate / 60).toFixed()}</b> Hz (twice the harmonics frequency, {(this.state.spindleRate / 60).toFixed()} Hz), because of the severe aliasing artifacts, nearly all harmonics features are lost.</p>
            </div>
            <div className="grid md:grid-cols-3">
              <div className="p-6 flex-1 justify-item-center min-h-96">
                <Line options={this.insufficientFrequencyTimeChartOptions} data={this.state.aliasingFrequencyChartState.data} />
              </div>
              <div className="p-6 flex-1 justify-item-center min-h-96">
                <Line options={this.insufficientFrequencyTimeChartOptions} data={this.state.aliasingFrequencyChartState1.data} />
              </div>
              <div className="p-6 flex-1 justify-item-center min-h-96">
                <Line options={this.insufficientFrequencyTimeChartOptions} data={this.state.aliasingFrequencyChartState2.data} />
              </div>
            </div>
          </div>

          <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-4">
            <div className="w-full">
              <h1 className="text-2xl mt-0 font-bold text-sky-700 dark:text-sky-300 font-mont">Duration</h1>
              <p className="text-xl mt-2 font-regular font-inter text-slate-500 dark:text-gray-400"><b className="font-heavy text-slate-700 dark:text-gray-200">Bin resolution</b> To protect the informative information from cross-talking in frequency spectrum, it is neccessary to keep the harmonic components separated and distinguishable.</p>

              <p className="text-xl mt-4 font-regular font-inter text-slate-500 dark:text-gray-400"><b className="font-heavy font-roboto text-slate-700 dark:text-gray-200">Time domain</b> To cover the harmonic components of the lowest frequency, the sampling duration must exceed its period ({(60 / this.state.spindleRate).toFixed(3)} s in accordance to {(this.state.spindleRate / 60).toFixed()} Hz).</p>

              <p className="text-xl mt-4 font-regular font-inter text-slate-500 dark:text-gray-400"><b className="font-heavy font-roboto text-slate-700 dark:text-gray-200">Frequency domain</b> In the following charts, when the sampling duration is below <b className="text-slate-700 dark:text-gray-200">{(60 / this.state.spindleRate * 2).toFixed(3)}</b> s (twice reciprocal of harmonics frequency, {(this.state.spindleRate / 60).toFixed()} Hz), the bin resolution could not satisfy the recognition requirements to distinguish harmonic peaks according to Rayleigh Criterion. Even in this condition, since only one point lies between the harmonic peaks, the peaks structure is less significant and may impede model from recognising the events.</p>
            </div>
            <div className="grid md:grid-cols-3">
              <div className="p-6 flex-1 justify-item-center min-h-96">
                <Line options={this.freqChartOptions} data={this.state.binFrequencyChartState1.data} />
              </div>
              <div className="p-6 flex-1 justify-item-center min-h-96">
                <Line options={this.freqChartOptions} data={this.state.binFrequencyChartState2.data} />
              </div>
              <div className="p-6 flex-1 justify-item-center min-h-96">
                <Line options={this.freqChartOptions} data={this.state.binFrequencyChartState3.data} />
              </div>
            </div>
          </div>

          <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-4">
            <div className="w-full">
              <h1 className="text-2xl mt-0 font-bold text-sky-700 dark:text-sky-300 font-mont">Phase</h1>

              <p className="text-xl mt-4 font-regular font-inter text-slate-500 dark:text-gray-400"><b className="font-heavy font-roboto text-slate-700 dark:text-gray-200">Stationary</b> In stationary signal, as long as at least one period is covered, the differences in phase have no influence on the appearance of signal.</p>

              <p className="text-xl mt-4 font-regular font-inter text-slate-500 dark:text-gray-400"><b className="font-heavy font-roboto text-slate-700 dark:text-gray-200">Conclusion</b> Phase will not have an impact on signal's representation of and deep learning model recognise the events.</p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-slate-800">
          <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-8">
            <h1 className="text-2xl font-medium text-sky-700 dark:text-sky-200 font-roboto">Summary</h1>
            <ul className="list-disc list-inside text-lg mt-4 font-roboto text-slate-500 dark:text-gray-200">
              <li>In frequency domain, both thrust and torque signal exhibit decaying harmonic structures with fundamental frequency of spindle rate in drilling process while the spectrum of y-axis acceleration and AE are less structural.</li>
              <li>The first four order harmonics and mean value of signal play a dominant role in signal’s representation and model’s classification for process incidence.</li>
              <li>To prevent harmonic components from aliasing, the sampling frequency should surpass the eight times the spindle rate.</li>
              <li>To resolve bin frequency to prevent harmonic components from being indistinguishable, the sample duration should be longer than twice the reciprocal of spindle rate, which is the minimum sufficient duration for signal.</li>


            </ul>

          </div>
        </section>

      </div>

    );
  }

}

const ModelResponsePage = () => (
  <section className="bg-gray-100 dark:bg-slate-700">
    <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-4">
      <div className="flex-1 p-6 justify-center">
        <h1 className="text-4xl font-montserrat mt-2 font-bold text-cyan-700 dark:text-cyan-200 text-center">Model Response</h1>
        <p className="text-xl font-mono mt-4 font-light text-slate-500 dark:text-gray-400 max-w-none text-center">The classification accuracy performance of ResNet in identifying process incidence under different combination of sampling condition.</p>
      </div>
    </div>
    <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-4">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="p-6 shadow-lg rounded-lg bg-white dark:bg-slate-900">
          <img src={SaturatedFrequency} alt="Model Response" className="w-full h-auto rounded-lg" />
          <h1 className="text-xl mt-4 font-medium text-cyan-700 dark:text-cyan-200 font-montserrat">Saturated</h1>
          <p className="text-sm font-inter mt-2 font-medium text-slate-500 dark:text-gray-400 max-w-none">With the increase in sample frequency, the classification accuracy firstly increases and gets saturated once it exceeds the threshold, called saturated frequency, despite the change in sample duration.</p>

        </div>

        <div className="p-6 shadow-lg rounded-lg bg-white dark:bg-slate-900">
          <img src={EquivalentAccuracySurface} alt="Model Response" className="w-full h-auto rounded-lg" />
          <h1 className="text-xl mt-4 font-medium text-cyan-700 dark:text-cyan-200 font-montserrat">CEA theorem</h1>
          <p className="text-sm font-inter mt-2 font-medium text-slate-500 dark:text-gray-400 max-w-none">Because of the same native accuracy, the accuracy response regarding sample duration when it exceeding the MSD follows the continuous equivalent accuracy equation.</p>

        </div>

        <div className="p-6 shadow-lg rounded-lg bg-white dark:bg-slate-900">
          <img src={QuiverGraphEquivalentAccuracy} alt="Model Response" className="w-full h-auto rounded-lg" />
          <h1 className="text-xl mt-4 font-medium text-cyan-700 dark:text-cyan-200 font-montserrat">Homologous</h1>
          <p className="text-sm font-inter mt-2 font-medium text-slate-500 dark:text-gray-400 max-w-none">Any consecutive signal segment fulfilling the minimum sufficient condition for frequency and duration, also the minimum sufficient unit, is homologous to represent process incidence with the same native accuracy regardless of initial phase and location in the signal.</p>

        </div>
      </div>
    </div>
    <section className="bg-gray-100 dark:bg-slate-700">
      <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-8">
        <h1 className="text-2xl font-medium text-slate-700 dark:text-slate-200 font-roboto">Additional Conclusions</h1>
        <ul className="list-disc list-inside text-lg mt-4 font-roboto text-slate-500 dark:text-gray-200">
          <li>To ensure sample diversity in the training process, the frequency of the master from which training data is generated should surpass twice the sample frequency.</li>
          <li>To train deep learning model to identify process incidence with lossless accuracy, the sampling frequency in the signal acquisition procedure should exceed sixteen times the spindle rate.</li>
        </ul>

      </div>
    </section>
  </section>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Minimum Sufficient Signal Condition of Identifying Process Incidence in Stacked Drilling Through Deep Learning" />

export default TppPage

export const query = graphql`
  query ManchesterUnitPageQuery($language: String!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`