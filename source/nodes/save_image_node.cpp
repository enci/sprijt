#include "save_image_node.hpp"
#include "node_graph.hpp"

#include <imgui.h>
#include "stb_image_write.h"

REGISTER_NODE(save_image_node)

void save_image_node::execute(node_graph& graph) {
    if (m_path.empty()) return;

    const auto* img = graph.get_input_as<sprijt::image>(id(), 0);
    if (!img || !*img) return;

    stbi_write_png(m_path.c_str(),
        img->width(), img->height(), img->channels(),
        img->pixels(), static_cast<int>(img->stride()));
}

void save_image_node::draw_properties() {
    ImGui::TextUnformatted("Save Image");
    ImGui::Separator();

    char buf[512];
    snprintf(buf, sizeof(buf), "%s", m_path.c_str());
    if (ImGui::InputText("Path", buf, sizeof(buf))) {
        m_path = buf;
        mark_dirty();
    }

    // Show what's coming in
    const auto& val = output_value(0);
    // This node has no outputs, so show the input status instead
    ImGui::TextDisabled("(Evaluate to save)");
}
