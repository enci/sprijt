#include "load_json_node.hpp"
#include "node_graph.hpp"

#include <fstream>
#include <imgui.h>
#include <nlohmann/json.hpp>

REGISTER_NODE(load_json_node)

void load_json_node::execute(node_graph& /*graph*/) {
    if (m_path.empty()) {
        set_output(0, std::monostate{});
        return;
    }

    std::ifstream file(m_path);
    if (!file.is_open()) {
        set_output(0, std::monostate{});
        return;
    }

    try {
        nlohmann::json j = nlohmann::json::parse(file);
        set_output(0, std::move(j));
    } catch (const nlohmann::json::parse_error&) {
        set_output(0, std::monostate{});
    }
}

void load_json_node::draw_properties() {
    ImGui::TextUnformatted("Load JSON");
    ImGui::Separator();

    char buf[512];
    snprintf(buf, sizeof(buf), "%s", m_path.c_str());
    if (ImGui::InputText("Path", buf, sizeof(buf))) {
        m_path = buf;
        mark_dirty();
    }

    // Show a preview of the loaded JSON
    const auto& val = output_value(0);
    if (auto* j = std::get_if<nlohmann::json>(&val)) {
        std::string preview = j->dump(2);
        if (preview.size() > 512) {
            preview.resize(509);
            preview += "...";
        }
        ImGui::TextWrapped("%s", preview.c_str());
    }
}
