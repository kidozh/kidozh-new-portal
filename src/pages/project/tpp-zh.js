import * as React from "react"


import Layout from "../../components/layout"
import Seo from "../../components/seo"
import { Link } from "gatsby"
import TppImage from "../../images/project/tpp/tpp.svg"
import TppCNNImage from "../../images/project/tpp/tpp_cnn.svg"
import CIRPICMELogo from "../../images/project/tpp/cirp-icme-logo.webp"
import CSCLogo from "../../images/project/china-scholarship-logo.jpg"

const TppPage = () => (
  <Layout>
    <section className="bg-blue-800 dark:bg-green-600">
      <div className="w-full mx-auto max-w-screen-xl px-6 py-3">
        <h4 class="text-xl font-medium text-white dark:text-white text-center">
          <Link to="/project/tpp">English version available.</Link>
          </h4>
      </div>
    </section>
    <section className="bg-gray-50 dark:bg-slate-600">
      <div className="w-full mx-auto max-w-screen-xl px-6 py-32">
        <h4 class="text-2xl font-medium text-cyan-700 dark:text-green-100 text-center">消除深度学习模型处理信号的输入障碍</h4>
        <h1 className="text-7xl md:text-8xl mt-2 text-center font-bold text-slate-900 dark:text-white">时间金字塔池化模型</h1>
        <p className="mt-16 mb-0 font-bold text-gray-400 max-w-none dark:text-gray-300 text-center">
          <Link to="#">Jiduo Zhang</Link><sup>1*</sup>, &nbsp;
          <Link className="hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-150 ease-in-out" to="https://research.manchester.ac.uk/en/persons/robert.heinemann">Robert Heinemann</Link><sup>1</sup>, &nbsp;
          <Link className="hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-150 ease-in-out" to="https://research.manchester.ac.uk/en/persons/ottojan.bakker">Otto Jan Bakker</Link><sup>1</sup>, &nbsp;
          <Link className="hover:text-purple-600 dark:hover:text-purple-400 transition-all duration-150 ease-in-out" to="https://www.researchgate.net/profile/Menghui-Zhu">Menghui Zhu</Link><sup>1</sup></p>
        <p className="font-bold text-gray-400 max-w-none dark:text-gray-300 mt-0 text-center"><sup>1</sup> 曼彻斯特大学工学院</p>

        <div className="mt-12 flex-1 justify-items-center">
          <div className="flex justify-center">
            <Link className="text-white bg-blue-700 shrink-0
            hover:bg-blue-800 focus:outline-none 
            focus:ring-4 focus:ring-blue-300 
            font-medium rounded-full text-normal px-5 py-2.5 
            text-center mr-2 mb-2 dark:bg-blue-600
              dark:hover:bg-blue-700 dark:focus:ring-blue-800" to="https://doi.org/10.1016/j.procir.2024.08.406">查看我们的会议论文</Link>
            <Link className="px-5 py-2.5 
             text-blue-700 dark:text-blue-100
            text-center mr-2 mb-2" 
            to="https://github.com/kidozh/tpp-cnn-network-for-incidence-identification">查看源代码</Link>
          </div>
          
        </div>
      </div>
        
    </section>
    <section className="bg-gray-50 dark:bg-slate-800">
      <div className="w-full mx-auto max-w-screen-xl px-6 py-16 lg:flex">
        {/* should place a TPP model here */}
        <div className="flex-1 p-6">
          <h1 className="text-2xl mt-2 font-bold text-cyan-700 dark:text-cyan-200">分而池之</h1>
          <p className="text-xl mt-2 font-normal text-slate-500 dark:text-gray-400 max-w-none">
            <b className="font-bold text-slate-700 dark:text-gray-100">恒定形状的输出</b> &nbsp;
            正如图片所示，我们使用了三个池编号（1、2和4），这产生了由一个形状为（N，L，C），两个(N, L/2, C)， 三个(N, L/4, C)的向量组成的输出，
            然后在这些向量上进行最大池化操作，将结果的最大值集中到一个形状为（N，(1+2+4)*C）的一维向量中，这为任何长度的输入产生了一个恒定形状的输出。
            </p>
        </div>
        <div className="lg:shrink-0" >
          <div className="p-6 flex-1 justify-item-center">
            <img className="max-w-full flex justify-center border-r-8 rounded-2xl dark:shadow-xl dark:bg-slate-200" src={TppImage} alt="时间金字塔池化模型" />
          </div>
          
        </div>
        
      </div>
    </section>
    <section className="bg-gray-50 dark:bg-slate-800">
      <div className="w-full mx-auto max-w-screen-xl px-6 pt-16">
        <div className="flex-1 p-6">
          <h1 className="text-2xl mt-2 font-bold text-cyan-700 dark:text-cyan-200">天生一对</h1>
          <p className="text-xl mt-2 font-normal text-slate-500 dark:text-gray-400 max-w-none">
          <b className="font-bold text-slate-700 dark:text-gray-100">在很小的模型下实现极快的处理速度</b>&nbsp;
            通过使用卷积神经网络（CNN），金字塔池化卷积神经网络可以识别信号的细微和宏观结构，共享权重，从而实现最小的参数以识别工况。
            其可较好的部署于嵌入式设备及其集成系统。
          </p>
        </div>
        
        

        


      </div>
      <div className="w-full mx-auto max-w-screen-xl px-6 pb-16" >
          <div className="p-6 flex-1 justify-item-center">
            <img className="max-w-full flex justify-center border-r-8 p-6 rounded-2xl 
            dark:shadow-xl dark:bg-slate-200" src={TppCNNImage} alt="金字塔池化卷积神经网络" />
          </div>
          
        </div>
    </section>
    <section className="bg-gray-50 dark:bg-slate-800">
      <div className="w-full mx-auto max-w-screen-xl px-6 py-16 grid md:grid-cols-4">
        <div className="flex justify-center">
          <div className="p-6 mb-16 md:mb-0 bg-slate-700
          bg-gradient-to-r from-slate-700 to-slate-900
          dark:bg-gradient-to-r dark:from-slate-500 dark:to-slate-600
          align-middle 
          w-32 h-32 ">
            <h1 className="text-2xl mt-2 font-bold text-center align-middle text-gray-100 ">TPP<br/>CNN</h1>
          </div>
        </div>
        

        <div className="">
          <h6 className="font-bold text-normal text-gray-500 dark:text-gray-400">准确度</h6>
          <h1 className="text-4xl mt-2 text-gray-900 dark:text-gray-100">
            <span className="text-bold text-8xl">99</span>%</h1>
          <p className="font-bold text-normal text-gray-500 dark:text-gray-400">对于切削工况的识别</p>
        </div>

        <div className="">
        <h6 className="font-bold text-normal text-gray-500 dark:text-gray-400">允许的输入时间</h6>
          <h1 className="text-4xl mt-2 text-gray-900 dark:text-gray-100"><span className="text-bold text-8xl">∞</span></h1>
          <p className="font-bold text-normal text-gray-500 dark:text-gray-400">
            允许任意尺寸的输入<sup>2</sup></p>
        </div>

        <div className="">
          <h6 className="font-bold text-normal text-gray-500 dark:text-gray-400">运算率</h6>
          <h1 className="text-4xl mt-2 text-gray-900 dark:text-gray-100"><span className="text-bold text-8xl">50</span></h1>
          <p className="font-bold text-normal text-gray-500 dark:text-gray-400">
            一秒内可以实现至多50次运算<sup>3</sup></p>
        </div>
      </div>
      
      <div className="w-full mx-auto max-w-screen-xl px-6 py-8">
        <p className="text-xl mt-2 font-normal text-slate-500 dark:text-gray-400 max-w-none">
          <b className="font-bold text-slate-700 dark:text-gray-100">一劳永逸</b>&nbsp;
            与传统模型相比，该方法能够准确识别不同频率和持续时间组合的工况事件，一旦训练良好，即可节省重建、重新训练和重新测试模型的时间。
        </p>

        <p className="text-xl mt-2 font-normal text-slate-500 dark:text-gray-400 max-w-none">
          <b className="font-bold text-slate-700 dark:text-gray-100">广谱高效</b>&nbsp;
            与传统模型相比，该方法能够准确识别不同频率和持续时间组合的工况事件。
            
        </p>

        <p className="text-sm mt-16 font-normal text-slate-500 dark:text-gray-400 max-w-none">
          <sup>2</sup>: 受硬件和软件环境的限制，过大的输入会生成巨大的特征图，从而耗尽计算资源。
        </p>
        <p className="text-sm font-normal text-slate-500 dark:text-gray-400 max-w-none">
          <sup>3</sup>:  该测试在NVIDIA RTX 3080的CUDA 11环境下进行，采样持续时间为0.1s，频率为1KHz。
          
        </p>

      </div>
    </section>

    <section className="bg-gray-100 dark:bg-slate-700">
      <div className="w-full mx-auto max-w-screen-xl px-6 py-16">
        <p className="text-2xl mt-2 text-gray-500 dark:text-gray-300 max-w-none">
          由于该方法可以应用于任何信号处理任务，因此其可以在广泛的应用中实现深度学习方法的高精度和即时监控。此外，我们希望这种方法可以成为制造业中通用工具状态监测问题的潜在解决方案。
        </p>
      </div>
    </section>

    <section className="bg-slate-200 dark:bg-slate-600"> 
      <div className="w-full mx-auto max-w-screen-xl px-6 py-16 lg:flex">
      <div className="lg:shrink-0" >
          <div className="flex-1 justify-item-center">
            <img className="max-w-full flex justify-center border-r-8 rounded-2xl dark:shadow-xl dark:bg-slate-200" src={CIRPICMELogo} alt="CIRP ICME Logo" />
          </div>
          
        </div>
        <div className="flex-1 p-6">
          <h1 className="text-2xl
          text-gray-500 dark:text-gray-200">
            此工作题为 "基于时间金字塔池化和卷积神经网络的切削工况识别"已被
            <Link className="text-gray-500 dark:text-gray-200
            ease-in-out hover:text-green-700 dark:hover:text-green-400
            hover:underline transition-all duration-300"
             to="https://cirpicme.org/">
              17届CIRP智能制造工程计算会议</Link>
            <b className="text-bold text-gray-900 dark:text-gray-100">接收</b>。
            
          </h1>
        </div>
        
      </div>
    </section>

    <section className="bg-blue-100 dark:bg-blue-900">
      <div className="w-full mx-auto max-w-screen-xl px-6 py-8 lg:flex align-middle">
        <div className="flex-1 justify-center align-middle">
          <p className="text-4xl p-8 font-normal text-blue-900 dark:text-blue-200 max-w-none">
            纪铎谨在此感谢
            <Link to="https://www.csc.edu.cn/" className="hover:text-blue-700
            transition-all duration-150 ease-in-out hover:underline font-bold
            dark:hover:text-blue-200">国家留学基金委</Link>对于本项目的持续资助。
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
      <div className="w-full mx-auto max-w-screen-xl px-6 py-8">
        <p className="text-2xl mt-2 font-normal text-gray-500 dark:text-gray-200 max-w-none">
          如果您对于我们的工作有任何问题或建议，请随时&nbsp;
           <Link to="/contact" className="text-blue-500 dark:text-blue-200 hover:text-blue-700
           transition-all duration-150 ease-in-out underline
           dark:hover:text-blue-200">联系我</Link>.
        </p>  
      </div>

    </section>

  </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="使用金字塔池化的卷积神经网络识别叠层材料的加工工况" />

export default TppPage