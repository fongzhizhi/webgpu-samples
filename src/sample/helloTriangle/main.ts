import { makeSample, SampleInit } from '../../components/SampleLayout';

import triangleVertWGSL from '../../shaders/triangle.vert.wgsl';
import redFragWGSL from '../../shaders/red.frag.wgsl';

const init: SampleInit = async ({ canvas, pageState }) => {
  // [init]
  if (!pageState.active) return;

  // [data]
  /**webgpu上下文 */
  const context = canvas.getContext('webgpu') as GPUCanvasContext;
  /**适配器 */
  const adapter = await navigator.gpu.requestAdapter();
  /**设备 */
  const device = await adapter.requestDevice();
  /**系统最佳画布格式 */
  const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
  // 配置
  context.configure({
    device,
    format: presentationFormat,
    alphaMode: 'opaque',
  });
  /**渲染管道 */
  const pipeline = device.createRenderPipeline({
    layout: 'auto',
    /**顶点着色器 */
    vertex: {
      module: device.createShaderModule({
        code: triangleVertWGSL,
      }),
      entryPoint: 'main',
    },
    /**片段着色器 */
    fragment: {
      module: device.createShaderModule({
        code: redFragWGSL,
      }),
      entryPoint: 'main',
      targets: [
        {
          format: presentationFormat,
        },
      ],
    },
    /**原始状态 */
    primitive: {
      /**拓扑结构 */
      topology: 'triangle-list',
    },
  });

  // [render] 动画帧渲染
  requestAnimationFrame(render);

  /**渲染逻辑 */
  function render() {
    // [init]
    if (!pageState.active) return;

    // [data]
    /**命令编码器 */
    const commandEncoder = device.createCommandEncoder();
    /**纹理预览器 */
    const textureView = context.getCurrentTexture().createView();
    /**渲染管道表述器 */
    const renderPassDescriptor: GPURenderPassDescriptor = {
      colorAttachments: [
        {
          view: textureView,
          clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
          loadOp: 'clear',
          storeOp: 'store',
        },
      ],
    };
    /**渲染管道编码器 */
    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
   
    // [encoding] 对绘图逻辑进行编码
    passEncoder.setPipeline(pipeline);  // 设置渲染管道
    passEncoder.draw(3, 1, 0, 0); // 绘制逻辑
    passEncoder.end();  // 结束编码

    // [submit] 执行绘图编码逻辑
    device.queue.submit([commandEncoder.finish()]);
    requestAnimationFrame(render);
  }
};

const HelloTriangle: () => JSX.Element = () =>
  makeSample({
    name: 'Hello Triangle',
    description: 'Shows rendering a basic triangle.',
    init,
    sources: [
      {
        name: __filename.substring(__dirname.length + 1),
        contents: __SOURCE__,
      },
      {
        name: '../../shaders/triangle.vert.wgsl',
        contents: triangleVertWGSL,
        editable: true,
      },
      {
        name: '../../shaders/red.frag.wgsl',
        contents: redFragWGSL,
        editable: true,
      },
    ],
    filename: __filename,
});

export default HelloTriangle;
