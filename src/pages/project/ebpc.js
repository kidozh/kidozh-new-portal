import * as React from "react"


import Layout from "../../components/layout"
import Seo from "../../components/seo"
import { Link, graphql } from "gatsby"
import CIRPICMELogo from "../../images/project/tpp/cirp-icme-logo.webp"
import CSCLogo from "../../images/project/china-scholarship-logo.jpg"

import ExponentialBackoffDemo from "../../components/ExponentialBackoffDemo"
import BitDepthDemo from "../../components/BitDepthDemo"
import ProducerConsumerDemo from "../../components/ProducerConsumerDemo"
import ConnectivityMap from "../../components/ConnectivityMap"

const TppPage = () => {
  const pcRefA = React.useRef(null)
  const pcRefB = React.useRef(null)
  const [globalStartId, setGlobalStartId] = React.useState(0)
  const [globalStopId, setGlobalStopId] = React.useState(0)
  // shared external produce controller for frame-aligned ticks
  const sharedControllerRef = React.useRef(null)
  if (!sharedControllerRef.current) {
    // simple pub/sub controller with start/stop via RAF
    const subs = new Set()
    let rafId = null
    let runningController = false
    let interval = 500
    const tick = () => {
      subs.forEach((s) => { try { s() } catch (e) {} })
      if (runningController) rafId = window.requestAnimationFrame(() => setTimeout(tick, interval))
    }
    sharedControllerRef.current = {
      subscribe: (fn) => subs.add(fn),
      unsubscribe: (fn) => subs.delete(fn),
      start: (ms = 500) => {
        interval = ms
        if (runningController) return
        runningController = true
        rafId = window.requestAnimationFrame(() => setTimeout(tick, interval))
      },
      stop: () => {
        runningController = false
        if (rafId) { window.cancelAnimationFrame(rafId); rafId = null }
      },
      tick: () => { subs.forEach((s) => { try { s() } catch (e) {} }) }
    }
  }

  const startAll = () => {
    // If both child refs expose start(), call them in the same requestAnimationFrame
    const a = pcRefA.current && pcRefA.current.start
    const b = pcRefB.current && pcRefB.current.start
    if (a || b) {
      // start the shared controller first so that external ticks drive both producers
      const ms = 500
      sharedControllerRef.current.start(ms)
      if (typeof window !== 'undefined' && window.requestAnimationFrame) {
        window.requestAnimationFrame(() => {
          try { a && a() } catch (e) { /* ignore */ }
          try { b && b() } catch (e) { /* ignore */ }
        })
        return
      }
      try { a && a() } catch (e) {}
      try { b && b() } catch (e) {}
      return
    }
    // fallback: bump counter to notify children that listen to globalStartId
    setGlobalStartId((s) => s + 1)
  }
  const stopAll = () => {
    const a = pcRefA.current && pcRefA.current.stop
    const b = pcRefB.current && pcRefB.current.stop
    // stop shared controller first
    sharedControllerRef.current.stop()
    if (a || b) {
      if (typeof window !== 'undefined' && window.requestAnimationFrame) {
        window.requestAnimationFrame(() => {
          try { a && a() } catch (e) {}
          try { b && b() } catch (e) {}
        })
        return
      }
      try { a && a() } catch (e) {}
      try { b && b() } catch (e) {}
      return
    }
    setGlobalStopId((s) => s + 1)
  }

  // aggregate per-city average latency (ms) from the table data
  const latencyData = [
    { city: 'London (UK)', avg: 8.7155 },
    { city: 'Frankfurt (DE)', avg: 19.9665 },
    { city: 'Hong Kong (CN)', avg: 203.4077 },
    { city: 'Johannesburg (ZA)', avg: 176.4508 },
    { city: 'Boston (US)', avg: 85.8510 },
    { city: 'Sydney (AU)', avg: 290.1947 },
  ]
  const maxLatency = Math.max(...latencyData.map((d) => d.avg))
  // connectivity points (lon/lat and 'total' weight) from user-provided data
  const connectivityData = [
    { city: 'Manchester', country: 'United Kingdom', lon: -2.233333, lat: 53.466667, total: 0.072540816 },
    { city: 'Manchester', country: 'United Kingdom', lon: -2.233333, lat: 53.466667, total: 0.073260934 },
    { city: 'London', country: 'United Kingdom', lon: -0.1275, lat: 51.5072, total: 0.081294395 },
    { city: 'Saint-Ghislain', country: 'Belgium', lon: 3.816667, lat: 50.45, total: 0.086977237 },
    { city: 'Frankfurt am Main', country: 'Germany', lon: 8.682222, lat: 50.110556, total: 0.094171566 },
    { city: 'Zürich', country: 'Switzerland', lon: 8.541111, lat: 47.374444, total: 0.098617197 },
    { city: 'Eemshaven', country: 'Netherlands', lon: 6.831111, lat: 53.448333, total: 0.112108961 },
    { city: 'Saint-Ghislain', country: 'Belgium', lon: 3.816667, lat: 50.45, total: 0.113438645 },
    { city: 'Warsaw', country: 'Poland', lon: 21.010833, lat: 52.23, total: 0.129099566 },
    { city: 'Montreal', country: 'Canada', lon: -73.554167, lat: 45.508889, total: 0.165897553 },
    { city: 'Ashburn', country: 'United States', lon: -77.471111, lat: 39.03, total: 0.181601105 },
    { city: 'Moncks Corner', country: 'United States', lon: -80, lat: 33.2, total: 0.186080395 },
    { city: 'Warsaw', country: 'Poland', lon: 21.010833, lat: 52.23, total: 0.195250026 },
    { city: 'Salt Lake City', country: 'United States', lon: -111.883333, lat: 40.75, total: 0.210651053 },
    { city: 'Las Vegas', country: 'United States', lon: -115.1447, lat: 36.1692, total: 0.215828947 },
    { city: 'Dalles', country: 'United States', lon: -121.1828, lat: 45.6011, total: 0.226093263 },
    { city: 'Osasco', country: 'Brazil', lon: -46.791944, lat: -23.532778, total: 0.309826382 },
    { city: 'Zhanghua', country: 'China', lon: 120.533333, lat: 24.066667, total: 0.313292461 },
    { city: 'Mumbai', country: 'India', lon: 72.8775, lat: 19.076111, total: 0.317267303 },
    { city: 'Singapore', country: 'Singapore', lon: 103.833333, lat: 1.283333, total: 0.322318421 },
    { city: 'Seoul', country: 'South Korea', lon: 126.99, lat: 37.56, total: 0.335438158 },
    { city: 'Hong Kong', country: 'China', lon: 114.2, lat: 22.3, total: 0.342026408 },
    { city: 'Jakarta', country: 'Indonesia', lon: 106.8275, lat: -6.175, total: 0.345206789 },
    { city: 'Sydney', country: 'Australia', lon: 151.211111, lat: -33.859972, total: 0.349120408 },
  ]
  const maxTotal = Math.max(...connectivityData.map((d) => d.total))

  return (
    <Layout>
    <section className="bg-gray-50 dark:bg-slate-600">
      <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-32">
  <h1 class="text-8xl md:text-12xl font-mont text-center font-bold text-orange-400 dark:text-white ebpc-animated ebpc-title">EBPC</h1>
        <h4 class="text-2xl mt-2 font-medium text-slate-700 dark:text-white text-center">Real Time Cloud Computing Framework for Tool Condition Monitoring</h4>
        

        <p className="mt-16 mb-0 font-bold text-gray-400 max-w-none dark:text-gray-300 text-center">
          <Link to="#">Jiduo Zhang</Link><sup>1*</sup>, &nbsp;
          <Link className="hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-150 ease-in-out" to="https://research.manchester.ac.uk/en/persons/robert.heinemann">Robert Heinemann</Link><sup>1</sup> and&nbsp;
          <Link className="hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-150 ease-in-out" to="https://research.manchester.ac.uk/en/persons/ottojan.bakker">Otto Jan Bakker</Link><sup>1</sup>
        </p>
        <p className="font-bold text-gray-400 max-w-none dark:text-gray-300 mt-0 text-center"><sup>1</sup> Department of Mechanical and Aerospace Engineering, The University of Manchester</p>

        <div className="mt-12 flex-1 justify-items-center">
          <div className="flex justify-center">
            <Link className="text-white bg-orange-700 shrink-0
            hover:bg-orange-800 focus:outline-hidden 
            focus:ring-4 focus:ring-orange-300 
            font-medium rounded-full text-normal px-5 py-2.5 
            text-center mr-2 mb-2 dark:bg-blue-600
              dark:hover:bg-blue-700 dark:focus:ring-blue-800" to="https://link.springer.com/article/10.1007/s10845-025-02657-7">Read our paper</Link>
            {/* <Link className="px-5 py-2.5 
             text-blue-700 dark:text-blue-100
            text-center mr-2 mb-2" 
            to="https://github.com/kidozh/tpp-cnn-network-for-incidence-identification">View data</Link> */}
          </div>

        </div>
      </div>

    </section>

    <section className="bg-gray-100 dark:bg-slate-700">
      <div className="w-full mx-auto max-w-6xl max-w-(--breakpoint-l) px-6 py-8">
        <h1 className="text-2xl font-montserrat font-bold text-gray-800 dark:text-white max-w-none">
          Highlights of our framework:
        </h1>
      </div>
      <div className="w-full mx-auto max-w-6xl max-w-(--breakpoint-xl) px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden
      hover:bg-linear-to-r hover:from-orange-200 hover:to-red-200
      hover:scale-105 dark:hover:bg-linear-to-r dark:hover:from-cyan-500 dark:hover:to-blue-500
      group hover:transition-all duration-500 ease-in-out p-6">
          <h2 className="text-2xl font-montserrat font-bold text-gray-800 dark:text-white">Exponential Backoff Traffic Control</h2>
          <hr className="h-1 my-8 w-32 group-hover:w-full mt-2 mb-4 bg-orange-500 border-orange-500 group-hover:transition-all ease-in-out duration-800
            border-2 dark:bg-indigo-500 dark:border-indigo-500
             dark:group-hover:bg-slate-100 dark:group-hover:border-slate-100
              group-hover:bg-red-600 group-hover:border-red-600" />
          <p className="mt-4 font-light text-normal text-gray-700
            dark:text-gray-200 border-b-orange-700">
              Progressive traffic control mechanism to adaptively adjust data transmission rates based on network conditions, ensuring efficient and reliable communication between edge devices and the cloud.
            </p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden
      hover:bg-linear-to-r hover:from-orange-200 hover:to-red-200
      hover:scale-105 dark:hover:bg-linear-to-r dark:hover:from-cyan-500 dark:hover:to-blue-500
      group hover:transition-all duration-500 ease-in-out p-6">
          <h2 className="text-2xl font-montserrat font-bold text-gray-800 dark:text-white">Data minimisation</h2>
          <hr className="h-1 my-8 w-32 group-hover:w-full mt-2 mb-4 bg-orange-500 border-orange-500 group-hover:transition-all ease-in-out duration-800
            border-2 dark:bg-indigo-500 dark:border-indigo-500
             dark:group-hover:bg-slate-100 dark:group-hover:border-slate-100
              group-hover:bg-red-600 group-hover:border-red-600" />
          <p className="mt-4  font-light text-normal text-gray-700
            dark:text-gray-200 border-b-orange-700">
              The compression from the aspect of data shape<sup>[1]</sup>, dimension and bit depth is applied to reduce the data size for transmission, while retaining the essential information for accurate tool condition monitoring.

            </p>
            <p className="mt-4  font-light text-normal text-gray-700
            dark:text-gray-200 border-b-orange-700"><small>[1]: <Link to="/project/manchester-unit" className="text-orange-400 dark:text-indigo-500">Minimum Sufficient Unit Theory</Link></small></p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden
      hover:bg-linear-to-r hover:from-orange-200 hover:to-red-200
      hover:scale-105 dark:hover:bg-linear-to-r dark:hover:from-cyan-500 dark:hover:to-blue-500
      group hover:transition-all duration-500 ease-in-out p-6">
          <h2 className="text-2xl font-montserrat font-bold text-gray-800 dark:text-white">Producer-Consumer Task Scheduling</h2>
          <hr className="h-1 my-8 w-32 group-hover:w-full mt-2 mb-4 bg-orange-500 border-orange-500 group-hover:transition-all ease-in-out duration-800
            border-2 dark:bg-indigo-500 dark:border-indigo-500
             dark:group-hover:bg-slate-100 dark:group-hover:border-slate-100
              group-hover:bg-red-600 group-hover:border-red-600" />
          <p className="mt-4  font-light text-normal text-gray-700
            dark:text-gray-200 border-b-orange-700">
              Efficient task scheduling mechanism that manages resource allocation effectively, ensuring timely processing of data and responsiveness of the tool condition monitoring system for all clients.
            </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden
      hover:bg-linear-to-r hover:from-orange-200 hover:to-red-200
      hover:scale-105 dark:hover:bg-linear-to-r dark:hover:from-cyan-500 dark:hover:to-blue-500
      group hover:transition-all duration-500 ease-in-out p-6">
          <h2 className="text-2xl font-montserrat font-bold text-gray-800 dark:text-white">Dynamic Task Prioritisation</h2>
          <hr className="h-1 my-8 w-32 group-hover:w-full mt-2 mb-4 bg-orange-500 border-orange-500 group-hover:transition-all ease-in-out duration-800
            border-2 dark:bg-indigo-500 dark:border-indigo-500
             dark:group-hover:bg-slate-100 dark:group-hover:border-slate-100
              group-hover:bg-red-600 group-hover:border-red-600" />
          <p className="mt-4  font-light text-normal text-gray-700
            dark:text-gray-200 border-b-orange-700">
              Self-adaptive prioritization mechanism that dynamically adjusts task priorities based on real-time system conditions and requirements, ensuring critical tasks are processed promptly for effective tool condition monitoring.
            </p>
        </div>
        
      </div>
    </section>

    <section className="bg-gray-50 dark:bg-slate-800">
      <div className="w-full mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-2xl font-montserrat font-bold text-gray-800 dark:text-white mb-6">Exponential backoff In Client — interactive demo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ExponentialBackoffDemo />
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">How it works</h3>
            <p className="mt-3 text-gray-700 dark:text-gray-200 text-sm">
              This interactive demo runs a continuous sender that measures simulated network round-trip times (RTT) and adapts the send interval in real time. A "Network success" slider controls the probability that a request succeeds; when a request fails the sender immediately doubles the send interval (exponential backoff). When a request succeeds the demo uses the observed RTT to adapt the interval: if the observed RTT is more than twice the current send interval the interval is doubled; if the observed RTT is less than half the current send interval the interval is halved. Small random jitter is added to adjustments to avoid synchronized retries.
            </p>
            <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm"><strong>Parameters:</strong> baseDelay = 100ms, adaptive rules (failure → ×2; success → double if RTT &gt; 2×interval, halve if RTT &lt; interval/2), jitter up to 10% of the interval, cap = 20000ms. Use the controls to change simulated RTT and success rate and press Start to run the demo.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-slate-100 dark:bg-slate-700">
      <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-16">
        <h1 className="text-4xl font-montserrat text-center font-bold mt-2 text-orange-700 dark:text-blue-200 max-w-none">
          Data compression
        </h1>
        
        <div className="w-full mx-auto max-w-6xl px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BitDepthDemo />
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white ">How it works</h3>
              <p className="mt-3 text-gray-700 dark:text-gray-200 text-sm">
                This interactive demo allows you to explore the effects of bit depth reduction on signal quality. The slider lets you adjust the bit depth from 1 to 8 bits per channel, allowing you to see how reducing the bit depth affects the signal's appearance. This is particularly useful for understanding how data compression can be achieved by reducing the number of bits used to represent each feature in the signal.
              </p>
              <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm"><strong>Note:</strong> Reducing bit depth can lead to a loss of precision information and may introduce visual artifacts, especially at very low bit depths. When the quantized noise exceeds the SNR of features in the original signal, features can become interferred, leading to a degradation in perceived quality.</p>
            </div>

          </div>
          
        </div>
        <p className="text-2xl mt-4 text-center font-medium text-slate-500 dark:text-slate-200 max-w-none">
          <small>Check the <Link to="/project/manchester-unit" className="text-orange-500 dark:text-blue-200 hover:text-orange-700
           transition-all duration-150 ease-in-out underline
           dark:hover:text-blue-200">Minimum Sufficient Unit Theory</Link> for the compression from the aspect of data shape. </small>
        </p>
        {/* Data size table removed per request */}
      </div>
    </section>

    <section className="bg-white dark:bg-slate-800">
      <div className="w-full mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-2xl font-montserrat font-bold text-gray-800 dark:text-white mb-6">Producer / Consumer — interactive demo (comparison)</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">Compare the two demos side-by-side. The right-hand demo is configured with concurrency = 1 to simulate a traditional architecture that awaits the completion of each task before starting the next. Observe the average latency of both condition and the traditional methods can not handle the situation as latency keep surged and the system are overwhelmed by the requests.</p>
        <div className="mb-4 mt-2 flex gap-3">
          <button onClick={startAll} className="text-white bg-orange-600 hover:bg-orange-700 font-medium rounded-full px-4 py-2">Start all</button>
          <button onClick={stopAll} className="text-orange-700 bg-orange-100 hover:bg-orange-200 font-medium rounded-full px-4 py-2">Stop all</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProducerConsumerDemo ref={pcRefA} title="Concurrency = 4 (default)" initialConcurrency={4} initialProduceInterval={500} initialProcessTime={800} initialBufferSize={20} initialMode={'bounded'} globalStartId={globalStartId} globalStopId={globalStopId} externalProduceController={sharedControllerRef.current} />
          <ProducerConsumerDemo ref={pcRefB} title="Concurrency = 1 (Traditional architecture)" initialConcurrency={1} initialProduceInterval={500} initialProcessTime={800} initialBufferSize={20} initialMode={'bounded'} globalStartId={globalStartId} globalStopId={globalStopId} externalProduceController={sharedControllerRef.current} />
        </div>
        
      </div>
    </section>

    <section className="bg-gray-50 dark:bg-slate-800">
      <div className="w-full mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-2xl font-montserrat font-bold text-gray-800 dark:text-white mb-6">Deploy worldwide for Tool Condition Monitoring with minimal delay</h2>
        <div className="flex justify-center">
          <div className="w-full max-w-3xl p-6 bg-white dark:bg-slate-800 rounded-lg shadow">
            
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Connectivity points (weighted)</h4>
              <div className="w-full">
                <ConnectivityMap data={connectivityData} width={800} height={320} pointScale={12} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-gray-100 dark:bg-slate-700">
      <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-16">
        <h1 className="text-4xl font-montserrat text-center font-bold mt-2 text-orange-700 dark:text-blue-200 max-w-none">
          Conclusions
        </h1>
        
        <div className="w-full mx-auto max-w-6xl px-6 py-8">
          <ul className="list-disc list-inside text-lg font-normal text-gray-700 dark:text-gray-200">
                  <li>We proposed a novel cloud computing framework EBPC for real-time tool condition monitoring, which incorporates exponential backoff-based traffic control, data minimisation, producer-consumer task scheduling, and dynamic task prioritisation.</li>
                  <li>Our framework effectively addresses challenges such as network congestion, data overload, and resource contention, ensuring efficient and reliable tool condition monitoring.</li>
                  <li>Experimental results demonstrate that EBPC outperforms traditional architectures in terms of latency, throughput, and resource utilisation, making it a promising solution for real-time tool condition monitoring in manufacturing environments.</li>
            </ul>
          
        </div>
      </div>
    </section>



    <section className="bg-orange-100 dark:bg-blue-900">
      <div className="w-full mx-auto max-w-(--breakpoint-xl) px-6 py-8 lg:flex align-middle">
        <div className="flex-1 justify-center align-middle">
          <p className="text-4xl p-8 font-normal text-orange-900 dark:text-blue-200 max-w-none">
            Jiduo would like to acknowledge the continuing contribution to this research by&nbsp;
            <Link to="https://www.csc.edu.cn/" className="hover:text-orange-700
            transition-all duration-150 ease-in-out hover:underline font-bold
            dark:hover:text-blue-200">China scholarship council</Link>.
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
        <p className="text-2xl mt-2 font-normal text-gray-500 dark:text-gray-200 max-w-none">
          If you have any questions or suggestions, please feel free to&nbsp;
          <Link to="/contact" className="text-blue-500 dark:text-blue-200 hover:text-blue-700
           transition-all duration-150 ease-in-out underline
           dark:hover:text-blue-200">contact us</Link>.
        </p>
      </div>


    
    </section>

  </Layout>
  )
}


/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="In-process unified prediction for process incidence and tool wear based on a deep learning approach" />

export default TppPage

export const query = graphql`
  query HybridPredictionPageQuery($language: String!) {
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