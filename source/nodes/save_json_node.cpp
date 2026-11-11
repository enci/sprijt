#include "save_json_node.hpp"
#include "node_graph.hpp"

#include <fstream>
#include <imgui.h>
#include <nlohmann/json.hpp>

REGISTER_NODE(save_json_node)

void save_json_node::execute(node_graph& graph) {
    if (m_path.empty()) return;

    const auto* j = graph.get_input_as<nlohmann::json>(id(), 0);
    if (!j) return;

    std::ofstream file(m_path);
    if (!file.is_open()) return;

    file << j->dump(m_indent);
}

void save_json_node::draw_properties() {
    ImGui::TextUnformatted("Save JSON");
    ImGui::Separator();

    char buf[512];
    snprintf(buf, sizeof(buf), "%s", m_path.c_str());
    if (ImGui::InputText("Path", buf, sizeof(buf))) {
        m_path = buf;
        mark_dirty();
    }

    if (ImGui::SliderInt("Indent", &m_indent, 0, 4)) {
        mark_dirty();
    }

    ImGui::TextDisabled("(Evaluate to save)");
}
