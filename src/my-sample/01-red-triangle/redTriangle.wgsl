// 顶点着色器
@vertex
fn vs(
    @builtin(vertex_index) VertexIndex: u32
) -> @builtin(position) vec4<f32> {
    let pos = array<vec2<f32>, 3>(
        vec2(0.0, 0.5),
        vec2(-0.5, -0.5),
        vec2(0.5, -0.5),
    );
    return vec4<f32>(pos[VertexIndex], 0.0, 1.0);
}

// 片段着色器
@fragment
fn fs() -> @location(0) vec4<f32> {
    return vec4<f32>(1.0, 0.0, 0.0, 1.0);
}
