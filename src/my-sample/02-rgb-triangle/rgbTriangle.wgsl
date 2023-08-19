// 顶点着色器输出结构
struct VertexShaderOutput {
    // 顶点
    @builtin(position) Position: vec4f,
    // 顶点颜色
    @location(0) color: vec4f,
}

// 顶点着色器
@vertex
fn vs(
    @builtin(vertex_index) VertexIndex: u32,
) -> VertexShaderOutput {
    // [data]
    var posArr = array<vec2<f32>, 3>(
        vec2(0.0, 0.5),
        vec2(-0.5, -0.5),
        vec2(0.5, -0.5),
    );
    var colorArr = array<vec4<f32>, 3>(
        vec4f(1.0, 0.0, 0.0, 1.0),
        vec4f(0.0, 1.0, 0.0, 1.0),
        vec4f(0.0, 0.0, 1.0, 1.0),
    );

    // [output]
    var output: VertexShaderOutput;
    output.Position = vec4(posArr[VertexIndex], 0.0, 1.0);
    output.color = colorArr[VertexIndex];
    return output;
}

// 片段着色器
@fragment
fn fs(fsInput: VertexShaderOutput) -> @location(0) vec4<f32> {
    return fsInput.color;
}