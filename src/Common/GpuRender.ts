/**GPU渲染器 */
export class GpuRender {
    /**渲染上下文 */
    readonly context: GPUCanvasContext;
    /**设备 */
    device: GPUDevice;
    /**系统最佳格式 */
    presentationFormat: GPUTextureFormat;

    constructor(canvas: HTMLCanvasElement) {
        this.context = canvas.getContext('webgpu') as GPUCanvasContext;
    }

    /**初始化 */
    async init(): Promise<boolean> {
        if(!navigator.gpu) {
            return false;
        }
        /**适配器 */
        const adapter = await navigator.gpu.requestAdapter();
        /**设备 */
        const device = await adapter.requestDevice();
        if(!device) {
            return false;
        }
        /**系统最佳画布格式 */
        const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
        // 配置
        this.context.configure({
            device,
            format: presentationFormat,
            alphaMode: 'opaque',
        });
        this.device = device;
        this.presentationFormat = presentationFormat;
        return true;
    }
}