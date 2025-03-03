import * as React from "react"
import { useState } from "react"


import Layout from "../../components/layout"
import Seo from "../../components/seo"
import { Link } from "gatsby"
import CSCLogo from "../../images/project/china-scholarship-logo.jpg"
// import Chart from "react-apexcharts";

import "../../styles/msu.css"
import { Alert } from "flowbite-react"

const TppPage = () => (
  <Layout>
    <section className="bg-gray-50 dark:bg-slate-900 dark:bg-hexagons-bg-dark bg-hexagons-bg-light">
      <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-32">
        <h4 class="text-2xl font-medium text-sky-700 dark:text-indigo-400 text-center font-[roboto]">The basic signal unit representing events in machining condition</h4>
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
              dark:hover:bg-sky-700 dark:focus:ring-sky-800" to="#">MSSP</Link>

            <a className="text-white bg-slate-700 shrink-0
              hover:bg-slate-800 focus:outline-hidden 
              focus:ring-4 focus:ring-sky-300 font-montserrat
              font-light rounded-full text-normal px-5 py-2.5 
              text-center mr-2 mb-2 dark:bg-slate-100 dark:text-black
                dark:hover:bg-slate-200 dark:focus:ring-slate-200" href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4973757" data-tooltip-target="tooltip-default" type="button">Preprint<sup>*</sup></a>

            <div id="tooltip-default" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-2xs opacity-0 tooltip dark:bg-gray-700">
              Tooltip content
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
    {/* <section className="bg-gray-50 dark:bg-slate-800">
      <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-16 lg:flex">
        <div className="flex-1 p-6">
          <h1 className="text-2xl mt-2 font-bold text-cyan-700 dark:text-cyan-200">Minimum Sufficient Frequency</h1>
          <p className="text-xl mt-2 font-normal text-slate-500 dark:text-gray-400 max-w-none">
            <b className="font-bold text-slate-700 dark:text-gray-100">Four times the spindle frequency.</b>.\ </p>
        </div>
        <div className="lg:shrink-0" >
          <div className="p-6 flex-1 justify-item-center">
            <img className="max-w-full flex justify-center border-r-8 rounded-2xl dark:shadow-xl dark:bg-slate-200" src={TppImage} alt="TPP model" />
          </div>
          
        </div>
        
      </div>
    </section> */}

    <section className="bg-blue-100 dark:bg-blue-900">
      <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-8 lg:flex align-middle">
        <div className="flex-1 justify-center align-middle">
          <p className="text-4xl p-8 font-normal font-montserrat text-blue-900 dark:text-blue-200 max-w-none">
            Jiduo would like to acknowledge the continuing contribution to this research by&nbsp;
            <Link to="https://www.csc.edu.cn/" className="hover:text-blue-700
            transition-all duration-150 ease-in-out hover:underline font-bold
            dark:hover:text-blue-200 ">China scholarship council</Link>.
          </p>
        </div>

        <div className="lg:shrink-0" >
          <div className="p-6 flex-1 justify-item-center">
            <img className="max-w-full flex justify-center 
            h-48 md:h-36
            border-r-8 rounded-2xl dark:shadow-xl dark:bg-slate-200" src={CSCLogo} alt="Logo of China scholarship council" />
          </div>

        </div>


      </div>

    </section>

    <section className="bg-gray-100 dark:bg-gray-700">
      <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-8">
        <p className="text-2xl mt-2 font-normal text-gray-500 dark:text-gray-200 max-w-none  font-roboto">
          If you have any questions or suggestions, please feel free to&nbsp;
          <Link to="/contact" className="text-blue-500 dark:text-blue-200 hover:text-blue-700
           transition-all duration-150 ease-in-out underline
           dark:hover:text-blue-200">contact us</Link>.
        </p>
      </div>

    </section>


  </Layout>
)

class HarmonicComponentAnalysis extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      spindleRate: 4000,
      signalFrequency: 1000,
      signalDuration: 0.128,
      signal: Array(0),
      signalChartState: this.generateSignal(4000, 1000, 0.128)
    };
    // this.generateSignal = this.generateSignal.bind(this);
    this.getValueByTime = this.getValueByTime.bind(this);
    this.setSpindleRate = this.setSpindleRate.bind(this);
    this.setSignalFrequency = this.setSignalFrequency.bind(this);
    this.setSignalDuration = this.setSignalDuration.bind(this);
    this.setSignal = this.setSignal.bind(this);
    this.setSignalChartState = this.setSignalChartState.bind(this);
    
  }

  setSignalChartState = (value) => {
    this.setState({ signalChartState: value });
    
  }

  setSpindleRate = (value) => {
    this.setState({ spindleRate: value });
    this.generateSignalAsRequired()
  }

  setSignalFrequency = (value) => {
    this.setState({ signalFrequency: value });
    this.generateSignalAsRequired()
  }

  setSignalDuration = (value) => {
    this.setState({ signalDuration: value });
    this.generateSignalAsRequired()
  }

  setSignal = (signal) => {
    this.setState({ signal: signal });
  }

  getValueByTime(time, spindle_rate, mean_value, first_harmonic_amplitude, harmonic_decaying_factor) {

    return mean_value + first_harmonic_amplitude * Math.sin(2 * Math.PI * spindle_rate * time) + first_harmonic_amplitude * harmonic_decaying_factor * Math.sin(2 * Math.PI * spindle_rate * 2 * time) + first_harmonic_amplitude * harmonic_decaying_factor * harmonic_decaying_factor * Math.sin(2 * Math.PI * spindle_rate * 4 * time) + (Math.random()-0.5) * first_harmonic_amplitude * harmonic_decaying_factor * 0.4
  }

  generateSignalAsRequired = () => {
    this.generateSignal(this.state.spindleRate, this.state.signalFrequency, this.state.signalDuration)
  }

  generateSignal(spindleRpm, signalFrequency,  signalDuration) {
    
    let signal = []

    let totalSamples = signalDuration * signalFrequency
    const spindleRate = spindleRpm / 60
    let time = 0
    const mean_value = Math.random() * 500
    const first_harmonic_amplitude = 10
    const harmonic_decaying_factor = 0.2
    for (let i = 0; i < totalSamples; i++) {
      signal.push([time, this.getValueByTime(time / signalFrequency, spindleRpm / 60, mean_value, first_harmonic_amplitude, harmonic_decaying_factor)])
      time += 1 / signalFrequency
    }
    this.setSignal(signal)

    var signal_chart_state = {
      options: {
        chart: {
          id: "line",
          width: '100%',
          toolbar: {
            show: false
          },
          title: 'Signal in time domain',
        },
        xaxis: {
          tyoe: 'numeric',
          labels: {
            show: true,
            formatter: function (val) {
              return (val).toFixed(2);
            },
          }
        },
        dataLabels: {
          enabled: false
        },
        yaxis: {
          labels: {
            formatter: function (val) {
              return (val).toFixed(0);
            },
          },
          title: "Thrust (N)"
        },
        stroke: {
          curve: 'smooth'
        },
        
      },
      series: [
        {
          name: "Thrust",
          data: signal
        },
      ]
    };

    this.setSignalChartState(signal_chart_state);

    return signal_chart_state
  }

  

  render() {
    return (
      <div>
        <section className="bg-gray-50 dark:bg-slate-800">
          <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-16 lg:flex">
            <div className="flex-1 p-6 justify-center">
              <h1 className="text-4xl font-montserrat mt-2 font-bold text-cyan-700 dark:text-cyan-200 text-center">Playground</h1>
              <p className="text-l font-mono mt-4 font-medium text-slate-500 dark:text-gray-400 max-w-none text-center">Let's get it started. You can't break it, we promise.</p>
            </div>
          </div>
        </section>
        <section className="bg-gray-50 dark:bg-slate-800">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-16 lg:flex">
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
                      <b className="font-medium font-mono text-4xl text-cyan-700 dark:text-cyan-100">{(this.state.spindleRate/60).toFixed(2)}</b> Hz </p>
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
                  { !Number.isInteger(this.state.signalDuration * this.state.signalFrequency) && <Alert className="w-full bg-red-100 text-red-500 font-inter" color="failure">The total samples (Product of frequency and duration, <b>{(this.state.signalDuration * this.state.signalFrequency).toFixed(2)}</b>) is not an integer. Please adjust the sampling frequency or duration.</Alert>}
                </div>

                <div className="grid gap-6 mb-6">
                  {/* <input type="submit" value="Generate Signal" className="bg-sky-700 text-white font-bold py-2 px-4 rounded-lg" onClick={() => this.generateSignal(this.state.spindleRate, this.state.signalFrequency, this.state.signalDuration)} /> */}
                  <input type="button" value="Generate New Signal Sample" className="bg-sky-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-800" onClick={() => this.generateSignal(this.state.spindleRate, this.state.signalFrequency, this.state.signalDuration)} />
                </div>
  
      
              </div>
              <div className="flex-1" >
                <div className="max-w-full justify-item-center">
                  <div id="signal-chart" className="max-w-full flex justify-center">
                    {/* {typeof window !== 'undefined' && <Chart options={this.state.signalChartState.options} series={this.state.signalChartState.series} type="line" height={350} />} */}
                  </div>
                </div>
  
              </div>
  
            </div>
          </form>
  
        </section>
      </div>
  
    );
  }

}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Minimum Sufficient Signal Condition of Identifying Process Incidence in Stacked Drilling Through Deep Learning" />

export default TppPage