import * as React from "react"
import { useState } from "react"


import Layout from "../../components/layout"
import Seo from "../../components/seo"
import { Link } from "gatsby"
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
                  <Link to="/project/manchester-unit">English version available.</Link>
                  </h4>
              </div>
            </section>
    <section className="bg-gray-50 dark:bg-slate-900 dark:bg-hexagons-bg-dark bg-hexagons-bg-light">
      <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-32">
        <h4 class="text-2xl font-regular text-sky-700 dark:text-indigo-400 text-center font-inter">表达工况事件的最基础信号结构</h4>
        <h1 className="text-7xl md:text-8xl mt-2 text-center font-bold font-[Inter] text-slate-900 dark:text-white">最小充要单位</h1>
        <p className="mt-16 text-xl mb-0 font-bold font-roboto text-gray-600 max-w-none dark:text-gray-300 text-center">
          <Link to="#">张纪铎</Link><sup>1*</sup>, &nbsp;
          <a className="hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-150 ease-in-out" href="https://research.manchester.ac.uk/en/persons/robert.heinemann">Robert Heinemann</a><sup>1</sup>, &nbsp;
          <a className="hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-150 ease-in-out" href="https://research.manchester.ac.uk/en/persons/ottojan.bakker">Otto Jan Bakker</a><sup>1</sup>, &nbsp;
          <a className="hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-150 ease-in-out" href="#">李思琦</a><sup>2</sup>, &nbsp;
          <a className="hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-150 ease-in-out" href="#">肖啸宇</a><sup>3</sup>, &nbsp;
          <a className="hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-150 ease-in-out" href="#">丁以贤</a><sup>4</sup>

        </p>

        <p className="font-bold text-sm font-roboto text-gray-400 max-w-none dark:text-gray-300 mt-8 text-center">
          <sup>1</sup> 曼彻斯特大学机械与航天学院 <br />
          <sup>2</sup> 曼彻斯特大学数学院<br />
          <sup>3</sup> 曼彻斯特大学电子电气工程学院 <br />
          <sup>4</sup> 北京交通大学机械与电子控制工程学院 <br />

        </p>

        <div className="mt-12 flex-1 justify-items-center">
          <div className="flex justify-center">
            <Link className="text-white bg-sky-700 shrink-0
            hover:bg-sky-800 focus:outline-hidden font-montserrat
            focus:ring-4 focus:ring-sky-300 
            font-light rounded-full text-normal px-5 py-2.5 
            text-center mr-4 mb-2 dark:bg-sky-600
              dark:hover:bg-sky-700 dark:focus:ring-sky-800" to="https://doi.org/10.1016/j.ymssp.2025.112499">机械系统及信号处理</Link>

            <a className="text-white bg-slate-700 shrink-0
              hover:bg-slate-800 focus:outline-hidden 
              focus:ring-4 focus:ring-sky-300 font-montserrat
              font-light rounded-full text-normal px-5 py-2.5 
              text-center mr-2 mb-2 dark:bg-slate-100 dark:text-black
                dark:hover:bg-slate-200 dark:focus:ring-slate-200" href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4973757" data-tooltip-target="tooltip-default" type="button">预印本<sup>*</sup></a>

            <div id="tooltip-default" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-2xs opacity-0 tooltip dark:bg-gray-700">
              Preprint version of the paper is available on SSRN. The final version is published on MSSP.
              <div class="tooltip-arrow" data-popper-arrow></div>
            </div>

          </div>
          <div className="flex justify-center mt-4">
            <p className="text-gray-400 dark:text-gray-600 text-sm font-inter">*: 最终结果请以发表在《机械系统及信号处理》的文章为准</p>
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
            纪铎谨在此表达对于
            <a href="https://www.csc.edu.cn/" className="hover:text-blue-700
            transition-all duration-150 ease-in-out hover:underline font-bold
            dark:hover:text-blue-200 ">国家留学基金委</a>对本工作长久以来的支持与资助的感激之情。
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
          如果您有任何问题，请在
          <Link to="/contact" className="text-blue-500 dark:text-blue-200 hover:text-blue-700
           transition-all duration-150 ease-in-out hover:underline
           dark:hover:text-blue-200">联系我们</Link>获得进一步信息.
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
        text: '时域信号',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: '时间 (秒)'
        },
        type: 'linear',
      },
      y: {
        title: {
          display: true,
          text: '推力 (牛顿)'
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
        text: '时域信号',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: '时间 (秒)'
        },
        type: 'linear',
      },
      y: {
        title: {
          display: true,
          text: '推力 (牛顿)'
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
        text: '频域频谱',
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
          text: '频率 (赫兹)'
        },
        type: 'linear',
      },
      y: {
        title: {
          display: true,
          text: '幅度 (牛顿)'
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
              label: "推力",
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
              label: "推力",
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
              label: "推力",
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
              label: "推力",
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
              label: "推力",
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
              label: "推力",
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
              label: "推力",
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
              label: "推力",
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
            label: "推力",
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
            label: "推力",
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
              <h1 className="text-4xl font-montserrat mt-2 font-bold text-cyan-700 dark:text-cyan-200 text-center">游乐园</h1>
              <p className="text-l font-mono mt-4 font-medium text-slate-500 dark:text-gray-400 max-w-none text-center">在您的浏览器里直接运行<b>加工信号的处理</b>，放心，这不会搞砸任何事情。</p>
            </div>
          </div>
        </section>
        <section className="bg-gray-50 dark:bg-slate-800">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-8 lg:flex">
              <div className="flex-1 bg-slate-100 dark:bg-slate-900 p-6 rounded-xl">
                <div className="w-full mb-6">
                  <h1 className="text-2xl mb-2 font-medium text-sky-700 dark:text-sky-200 text-center font-montserrat">信号的信息</h1>
                </div>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  <div>
                    <label for="spindle_rate" class="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">主轴转速 (RPM)</label>
                    <input type="number" id="spindle_rate" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={this.state.spindleRate} onChange={(e) => this.setSpindleRate(e.target.value)} required />
                  </div>
                  <div>
                    <h1 className="text-sm mb-2 font-bold text-slate-700 dark:text-slate-200">谐波基频</h1>
                    <p className="text-sm mt-2 font-normal text-slate-500 dark:text-gray-400 max-w-none">
                      <b className="font-medium font-mono text-4xl text-cyan-700 dark:text-cyan-100">{(this.state.spindleRate / 60).toFixed(2)}</b> Hz </p>
                  </div>

                </div>

                <div className="grid gap-6 mb-6 md:grid-cols-2">
                  <div>
                    <label for="sampling_frequency" class="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">采样频率 (赫兹)</label>
                    <input type="number" id="sampling_frequency" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={this.state.signalFrequency} onChange={(e) => this.setSignalFrequency(e.target.value)} required />
                  </div>
                  <div>
                    <label for="sampling_duration" class="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-200">采样时长 (秒)</label>
                    <input type="number" id="sampling_duration" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={this.state.signalDuration} onChange={(e) => this.setSignalDuration(e.target.value)} required />
                  </div>
                </div>

                <div className="grid gap-6 mb-6">
                  {!Number.isInteger(this.state.signalDuration * this.state.signalFrequency) && <Alert className="w-full bg-red-100 text-red-500 font-inter" color="failure">样本数量，即频率和时长的乘积 <b>{(this.state.signalDuration * this.state.signalFrequency).toFixed(2)}</b>) 并不是整数，您需要重新调节这两个参数。</Alert>}
                </div>

                <div className="grid gap-6 mb-6">
                  <input type="button" value="生成一个典型的随机信号" className="bg-sky-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-800 font-inter" onClick={() => this.generateSignal(this.state.spindleRate, this.state.signalFrequency, this.state.signalDuration)} />
                </div>

                <div className="grid gap-6 mb-0">
                  <p className="font-mont font-medium text-xs text-gray-400 dark:text-gray-500">*: 该样本仅代表复合材料和铝叠层的钻孔时典型推力信号。</p>
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
          <h1 className="text-2xl font-medium text-sky-700 dark:text-sky-200 text-center font-montserrat">频域下的信号</h1>
          <p className="text-l font-mono mt-4 font-medium text-slate-500 dark:text-gray-400 max-w-none text-center">使用快速傅立叶变换 (FFT) 算法将去趋势信号转换为频域信号。</p>
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
                <h1 className="text-2xl font-bold text-sky-700 dark:text-slate-200 font-montserrat">谐波结构</h1>
                <p className="text-normal font-roboto mt-2 font-regular text-slate-500 dark:text-gray-400">在工具啮合频率的激励下，信号表现出明显的谐波结构，如在<b>{(this.state.spindleRate / 60).toFixed()}</b>, <b>{(2 * this.state.spindleRate / 60).toFixed()}</b>, <b>{(4 * this.state.spindleRate / 60).toFixed()}</b>赫兹所示的尖峰幅度那样。
                </p>
              </div>

              <div className="mb-6 align-start">
                <h1 className="text-2xl font-bold text-sky-700 dark:text-slate-200 font-montserrat">幅度衰减</h1>
                <p className="text-normal font-roboto mt-2 font-regular text-slate-500 dark:text-gray-400">由于机械结构的阻尼特性，谐波的振幅会随着频率的倍数显著下降。</p>
              </div>

              <div className="mb-6 align-start">
                <h1 className="text-2xl font-bold text-sky-700 dark:text-slate-200 font-montserrat">持续</h1>
                <p className="text-normal font-roboto mt-2 font-regular text-slate-500 dark:text-gray-400">推力和扭矩的频率成分相对稳定，因此即使条件发生变化，其基本频率组成成分基本保持稳定。</p>
              </div>

              <div className="mb-6 align-start">
                <h1 className="text-2xl font-bold text-sky-700 dark:text-slate-200 font-montserrat">4x</h1>
                <p className="text-normal font-roboto mt-2 font-regular text-slate-500 dark:text-gray-400">4倍谐波频率仍然携带者一定的表达工况的信息。</p>
              </div>

            </div>

          </div>

        </section>

        <section className="bg-gray-100 dark:bg-slate-700">
          <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-0 lg:flex">
            <div className="flex-6 p-6">
              <h1 className="text-2xl mt-2 font-medium text-cyan-700 dark:text-cyan-300 text-center font-mont">最小采样条件</h1>
              <p className="text-xl mt-2 font-light font-mono text-slate-500 dark:text-gray-400 max-w-none text-center">
                根据香农-奈奎斯特定理从谐波结构推导出的采样边界条件</p>
            </div>
          </div>
          <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-4">
            <div className="p-6">
              <h1 className="text-2xl mt-0 font-bold text-sky-700 dark:text-sky-200 font-mont">频率</h1>
              <p className="text-xl mt-2 font-regular font-inter text-slate-500 dark:text-gray-400"><b className="font-heavy text-slate-700 dark:text-gray-200">抗混叠</b>  根据香农-奈奎斯特（Shannon-Nyquist）采样定理，采样频率应超过信号中信息成分频率的两倍，以保护信息不被混叠伪影干扰。</p>

              <p className="text-xl mt-4 font-regular font-inter text-slate-500 dark:text-gray-400">当采样频率低于<b className="text-slate-700 dark:text-gray-200">{(2 * this.state.spindleRate / 60).toFixed()}</b> 赫兹，也就是两倍谐波基础频率，{(this.state.spindleRate / 60).toFixed()}赫兹之时，由于严重的混叠伪象，所有的谐波信息全军覆没。</p>
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
              <h1 className="text-2xl mt-0 font-bold text-sky-700 dark:text-sky-300 font-mont">时长</h1>
              <p className="text-xl mt-2 font-regular font-inter text-slate-500 dark:text-gray-400"><b className="font-heavy text-slate-700 dark:text-gray-200">频率分辨率</b> 为了保护信息不因由于频率分辨度不足所引发的串扰，信号的频率分辨率需要得以保证。</p>

              <p className="text-xl mt-4 font-regular font-inter text-slate-500 dark:text-gray-400"><b className="font-heavy font-roboto text-slate-700 dark:text-gray-200">从时域上来说</b> 为了保证最低频频率特征得以保留，采样时长必须超过({(60 / this.state.spindleRate).toFixed(3)}秒，这也是{(this.state.spindleRate / 60).toFixed()}赫兹)的波长.</p>

              <p className="text-xl mt-4 font-regular font-inter text-slate-500 dark:text-gray-400"><b className="font-heavy font-roboto text-slate-700 dark:text-gray-200">从频域上来说</b> 当采样时长低于<b className="text-slate-700 dark:text-gray-200">{(60 / this.state.spindleRate * 2).toFixed(3)}</b>秒，即 (对应{(this.state.spindleRate / 60).toFixed()}赫兹), 根据瑞利判据，在频谱图中，两个相邻谐波频率的尖峰并不能的以区分。就算是这种情况下，由于基频上的幅度仍然远高于第二频率，就算中间差了一个点，这种尖峰的信息仍然有可能无法表达，这也会引发信号的失真和信息的丢失。</p>
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
              <h1 className="text-2xl mt-0 font-bold text-sky-700 dark:text-sky-300 font-mont">相位</h1>

              <p className="text-xl mt-4 font-regular font-inter text-slate-500 dark:text-gray-400"><b className="font-heavy font-roboto text-slate-700 dark:text-gray-200">平稳信号</b> 在平稳信号中，只要至少覆盖一个周期，初始相位并不会影响信号的特征。</p>

              <p className="text-xl mt-4 font-regular font-inter text-slate-500 dark:text-gray-400"><b className="font-heavy font-roboto text-slate-700 dark:text-gray-200">我们的相位实验</b>也说明了相位不会影响信号对事件的表示和深度学习模型对事件的识别。</p>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 dark:bg-slate-800">
          <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-8">
            <h1 className="text-2xl font-medium text-sky-700 dark:text-sky-200 font-roboto">小结</h1>
            <ul className="list-disc list-inside text-lg mt-4 font-roboto text-slate-500 dark:text-gray-200">
              <li>在频域中，推力和扭矩信号都呈现出以钻孔过程中的主轴转速为基频的衰减谐波结构，而 y 轴加速度和 AE 的频谱结构则没有这一特征。</li>
              <li>信号的前四阶谐波和平均值在信号表示工况信息上起着主导作用。</li>
              <li>为防止谐波成分出现混叠，采样频率应超过主轴速率的八倍。</li>
              <li>为了保证频率分辨率以防止谐波成分无法分辨，采样持续时间应长于主轴转速倒数的两倍，这是信号的最短持续时间。</li>


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
        <h1 className="text-4xl font-montserrat mt-2 font-bold text-cyan-700 dark:text-cyan-200 text-center">深度学习模型响应</h1>
        <p className="text-xl font-mono mt-4 font-light text-slate-500 dark:text-gray-400 max-w-none text-center">三大主要性质</p>
      </div>
    </div>
    <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-4">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="p-6 shadow-lg rounded-lg bg-white dark:bg-slate-900">
          <img src={SaturatedFrequency} alt="Model Response" className="w-full h-auto rounded-lg" />
          <h1 className="text-xl mt-4 font-medium text-cyan-700 dark:text-cyan-200 font-montserrat">分类准确率的饱和</h1>
          <p className="text-sm font-inter mt-2 font-medium text-slate-500 dark:text-gray-400 max-w-none">随着采样频率的增加，分类准确率首先会提高，一旦超过阈值（称为饱和频率，也对应着前面的最小采样频率），分类准确率就会达到饱和，即使采样持续时间发生变化。</p>

        </div>

        <div className="p-6 shadow-lg rounded-lg bg-white dark:bg-slate-900">
          <img src={EquivalentAccuracySurface} alt="Model Response" className="w-full h-auto rounded-lg" />
          <h1 className="text-xl mt-4 font-medium text-cyan-700 dark:text-cyan-200 font-montserrat">连续等效精度方程</h1>
          <p className="text-sm font-inter mt-2 font-medium text-slate-500 dark:text-gray-400 max-w-none">由于具有相同的原生精度，因此当采样时长超过最小采样时长时，有关采样持续时间的精度响应遵循连续等效精度方程（一个凹的超几何方程）。</p>

        </div>

        <div className="p-6 shadow-lg rounded-lg bg-white dark:bg-slate-900">
          <img src={QuiverGraphEquivalentAccuracy} alt="Model Response" className="w-full h-auto rounded-lg" />
          <h1 className="text-xl mt-4 font-medium text-cyan-700 dark:text-cyan-200 font-montserrat">同源性</h1>
          <p className="text-sm font-inter mt-2 font-medium text-slate-500 dark:text-gray-400 max-w-none">任何满足频率和持续时间最小充分条件（即最小充要单元）的连续信号段都是同源的，都能以相同的本机精度表示过程发生率，而与初始相位和信号中的位置无关。</p>

        </div>
      </div>
    </div>
    <section className="bg-gray-100 dark:bg-slate-700">
      <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-8">
        <h1 className="text-2xl font-medium text-slate-700 dark:text-slate-200 font-roboto">其他的结论</h1>
        <ul className="list-disc list-inside text-lg mt-4 font-roboto text-slate-500 dark:text-gray-200">
          <li>为确保训练过程中样本能够通过二次采样生成以提升最大可生成样本数量，生成训练数据的主样本频率应超过样本频率的两倍。</li>
          <li>要训练深度学习模型以无损准确地识别过程事件，信号采集程序中的采样频率应超过主轴速率的 16 倍。</li>
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
export const Head = () => <Seo title="深度学习识别工况信号的最小充要条件" />

export default TppPage